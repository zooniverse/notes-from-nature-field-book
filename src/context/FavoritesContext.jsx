import PropTypes from 'prop-types';
import React, { Component } from 'react';
import apiClient from 'panoptes-client/lib/api-client';

export const FavoritesContext = React.createContext();

export class FavoritesProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: null,
      initialised: false
    };

    this.addSubjectTo = this.addSubjectTo.bind(this);
    this.removeSubjectFrom = this.removeSubjectFrom.bind(this);
  }

  componentDidMount() {
    if (!this.state.initialised && this.props.project && this.props.user) {
      this.fetchFavorites();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.project !== this.props.project ||
      prevProps.user !== this.props.user
    ) {
      if (this.props.project && this.props.user) {
        this.fetchFavorites();
      }
    }
  }

  fetchFavorites() {
    apiClient
      .type('collections')
      .get({
        owner: this.props.user.login,
        project_ids: this.props.project.id,
        favorite: true
      })
      .then(([collections]) => {
        if (collections && collections.links.subjects) {
          this.setState({ initialised: true, favorites: collections });
        }
      });
  }

  addSubjectTo(subjectId) {
    if (this.state.favorites) {
      this.state.favorites.addLink('subjects', [subjectId.toString()]);
    } else {
      this.createFavorites().then(() => {
        this.state.favorites.addLink('subjects', [subjectId.toString()]);
      });
    }
  }

  removeSubjectFrom(subjectId) {
    this.state.favorites.removeLink('subjects', [subjectId.toString()]);
  }

  createFavorites() {
    return new Promise((resolve, reject) => {
      const display_name = `Favorites ${this.props.project.slug}`;
      const project = this.props.project.id;
      const subjects = [];
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
        .then(newFavorites => {
          this.setState({ favorites: newFavorites });
          resolve();
        });
    });
  }

  render() {
    return (
      <FavoritesContext.Provider
        value={{
          addSubjectTo: this.addSubjectTo,
          favorites: this.state.favorites,
          initialised: this.state.initialised,
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
    id: PropTypes.string
  }).isRequired,
  user: PropTypes.shape({
    login: PropTypes.string
  }).isRequired
};
