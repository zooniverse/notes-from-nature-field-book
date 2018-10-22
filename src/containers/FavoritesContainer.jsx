import PropTypes from 'prop-types';
import React from 'react';
import Box from 'grommet/components/Box';
import apiClient from 'panoptes-client';
import { config } from '../config';
import SubjectCard from '../components/SubjectCard';
import Title from '../components/Title';

class FavoritesContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: []
    };
  }

  componentDidMount() {
    this.fetchFavorites();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.fetchFavorites();
    }
  }

  fetchFavorites() {
    const { user } = this.props;

    if (user) {
      apiClient
        .type('collections')
        .get({
          project_ids: config.projectId,
          favorite: true,
          sort: 'display_name'
        })
        .then(collections => {
          collections[0]
            .get('subjects', { page_size: 3 })
            .then(subjects => this.setState({ favorites: subjects }));
        });
    }
  }

  render() {
    return (
      <Box>
        <Title>Your Favorites</Title>
        <Box direction="row">
          {this.state.favorites.length > 0 &&
            this.state.favorites.map(favorite => (
              <SubjectCard key={favorite.id} subject={favorite} />
            ))}
        </Box>
      </Box>
    );
  }
}

FavoritesContainer.propTypes = {
  user: PropTypes.shape({
    get: PropTypes.func
  })
};

FavoritesContainer.defaultProps = {
  user: null
};

export default FavoritesContainer;
