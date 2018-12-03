import PropTypes from 'prop-types';
import React, { Component } from 'react';
import apiClient from 'panoptes-client/lib/api-client';

export const FavoritesContext = React.createContext();

export class FavoritesProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteCollection: null,
      linkedSubjects: [],
      initialised: false
    };

    this.addSubjectTo = this.addSubjectTo.bind(this);
    this.removeSubjectFrom = this.removeSubjectFrom.bind(this);
  }

  componentDidMount() {
    const { project, explorer } = this.props;
    const { initialised } = this.state;
    if (!initialised && project && explorer) {
      this.fetchFavoriteCollection();
    }
  }

  componentDidUpdate(prevProps) {
    const { project, explorer } = this.props;
    if (prevProps.project !== project || prevProps.explorer !== explorer) {
      if (project && explorer) {
        this.fetchFavoriteCollection();
      }
    }
  }

  fetchFavoriteCollection() {
    const { project, explorer } = this.props;
    apiClient
      .type('collections')
      .get({
        owner: explorer.login,
        project_ids: project.id,
        favorite: true
      })
      .then(([collections]) => {
        if (collections) {
          this.setState({
            initialised: true,
            favoriteCollection: collections,
            linkedSubjects:
              collections.links && collections.links.subjects
                ? collections.links.subjects
                : []
          });
        }
      });
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
    return new Promise((resolve, reject) => {
      const display_name = `Favorites ${this.props.project.slug}`;
      const project = this.props.project.id;
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
    const { favoriteCollection, linkedSubjects, initialised } = this.state;
    return (
      <FavoritesContext.Provider
        value={{
          addSubjectTo: this.addSubjectTo,
          favoriteCollection,
          linkedSubjects,
          initialised,
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
  project: PropTypes.shape({
    id: PropTypes.string,
    slug: PropTypes.string
  }),
  explorer: PropTypes.shape({
    login: PropTypes.string
  })
};

FavoritesProvider.defaultProps = {
  project: null,
  explorer: null
};
