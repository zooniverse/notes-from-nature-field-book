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
        current_user_roles: 'owner,contributor,collaborator,viewer',
        project_ids: this.props.project.id,
        favorite: true,
        sort: 'display_name'
      })
      .then(([collections]) => {
        if (collections && collections.links.subjects) {
          this.setState({ initialised: true, favorites: collections });
        }
      });
  }

  render() {
    return (
      <FavoritesContext.Provider
        value={{
          initialised: this.state.initialised,
          favorites: this.state.favorites
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
    id: PropTypes.string
  }).isRequired
};
