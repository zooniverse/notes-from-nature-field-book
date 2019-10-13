import PropTypes from 'prop-types';
import React, { Component } from 'react';
import apiClient from 'panoptes-client/lib/api-client';

import { config } from '../config';

export const FavoritesContext = React.createContext();

export class FavoritesProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteCollection: null,
      linkedSubjects: []
    };

    this.addSubjectTo = this.addSubjectTo.bind(this);
    this.removeSubjectFrom = this.removeSubjectFrom.bind(this);
  }

  componentDidMount() {
    const { explorer, projects } = this.props;
    if (explorer && projects) {
      this.fetchFavoriteCollection();
    }
  }

  componentDidUpdate(prevProps) {
    const { explorer, projects } = this.props;
    if (prevProps.explorer !== explorer || prevProps.projects !== projects) {
      this.fetchFavoriteCollection();
    }
  }

  fetchFavoriteCollection() {
    const { explorer, projects } = this.props;
    if (explorer && projects && projects.length) {
      let project;
      if (projects && projects.length) {
        [project] = projects.filter(
          NfNproject => NfNproject.id === config.projectId
        );
      }
      apiClient
        .type('collections')
        .get({
          owner: explorer.login,
          project_ids: project.id,
          favorite: true
        })
        .then(collections => {
          if (collections.length) {
            const [collection] = collections;
            this.setState({
              favoriteCollection: collection,
              linkedSubjects:
                collection.links && collection.links.subjects
                  ? collection.links.subjects
                  : []
            });
          } else {
            this.setState({
              favoriteCollection: null,
              linkedSubjects: []
            });
            console.warn('Favorites empty.');
          }
        });
    } else {
      this.setState({ favoriteCollection: null, linkedSubjects: [] });
    }
  }

  addSubjectTo(subjectId) {
    const { favoriteCollection, linkedSubjects } = this.state;
    if (favoriteCollection) {
      favoriteCollection
        .addLink('subjects', [subjectId.toString()])
        .then(() => {
          this.setState({
            linkedSubjects: [...linkedSubjects, subjectId.toString()]
          });
        })
        .catch(() => console.warn('Failed to save favorite.'));
    } else {
      this.createFavorites([subjectId]);
    }
  }

  removeSubjectFrom(subjectId) {
    const { favoriteCollection, linkedSubjects } = this.state;
    favoriteCollection
      .removeLink('subjects', [subjectId.toString()])
      .then(() => {
        this.setState({
          linkedSubjects: linkedSubjects.filter(
            subject => subject !== subjectId.toString()
          )
        });
      })
      .catch(() => console.warn('Failed to remove favorite.'));
  }

  createFavorites(subjects = []) {
    const { projects } = this.props;
    let nFnProject = { slug: '' };
    if (projects && projects.length) {
      [nFnProject] = projects.filter(
        NfNproject => NfNproject.id === config.projectId
      );
    }
    return new Promise((resolve, reject) => {
      const display_name = `Favorites ${nFnProject.slug}`;
      const project = nFnProject.id;
      const favorite = true;

      const links = { project, subjects };
      const collection = { favorite, display_name, links };
      apiClient
        .type('collections')
        .create(collection)
        .save()
        .catch(err => {
          reject(err);
        })
        .then(([newFavoritesCollection]) => {
          this.setState({
            favoriteCollection: newFavoritesCollection,
            linkedSubjects: subjects
          });
          resolve();
        });
    });
  }

  render() {
    const { favoriteCollection, linkedSubjects } = this.state;
    return (
      <FavoritesContext.Provider
        value={{
          addSubjectTo: this.addSubjectTo,
          favoriteCollection,
          linkedSubjects,
          removeSubjectFrom: this.removeSubjectFrom
        }}
      >
        {this.props.children}
      </FavoritesContext.Provider>
    );
  }
}

FavoritesProvider.propTypes = {
  children: PropTypes.element.isRequired,
  explorer: PropTypes.shape({
    login: PropTypes.string
  }),
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      slug: PropTypes.string
    })
  )
};

FavoritesProvider.defaultProps = {
  explorer: null,
  projects: null
};
