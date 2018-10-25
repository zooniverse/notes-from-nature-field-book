import PropTypes from 'prop-types';
import React from 'react';
import Box from 'grommet/components/Box';
import apiClient from 'panoptes-client';
import { Paginator } from 'zooniverse-react-components';

import { config } from '../config';
import Title from '../components/Title';
import SubjectCard from '../components/SubjectCard';

class FavoritesContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
      meta: null
    };

    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {
    this.fetchFavorites();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.fetchFavorites();
    }
  }

  onPageChange(page) {
    this.fetchFavorites(page);
  }

  fetchFavorites(page = 1) {
    const { user } = this.props;
    const query = {
      page,
      page_size: 3
    };

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
            .get('subjects', query)
            .then(favorites =>
              this.setState({ favorites, meta: favorites[0].getMeta() })
            );
        });
    }
  }

  render() {
    return (
      <Box pad="medium">
        <Title>Your Favorites</Title>
        <Box direction="row" justify="around" responsive>
          {this.state.favorites.length > 0 &&
            this.state.favorites.map(favorite => (
              <SubjectCard key={favorite.id} subject={favorite} />
            ))}
        </Box>
        {this.state.meta &&
          this.state.meta.page_count > 1 && (
            <Paginator
              page={this.state.meta.page}
              pageCount={this.state.meta.page_count}
              onPageChange={this.onPageChange}
            />
          )}
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
