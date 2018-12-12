import PropTypes from 'prop-types';
import React from 'react';
import Box from 'grommet/components/Box';
import { Paginator } from 'zooniverse-react-components';

import Title from '../components/Title';
import SubjectCard from '../components/SubjectCard';

class FavoritesContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteSubjects: null,
      meta: null
    };

    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {
    this.fetchFavoriteSubjects();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.favoriteCollection !== this.props.favoriteCollection) {
      this.fetchFavoriteSubjects();
    }
  }

  onPageChange(page) {
    this.fetchFavoriteSubjects(page);
  }

  fetchFavoriteSubjects(page = 1) {
    const { favoriteCollection, linkedSubjects, matchesUser } = this.props;

    if (matchesUser && favoriteCollection && linkedSubjects.length) {
      const query = {
        page,
        page_size: 3
      };

      favoriteCollection
        .get('subjects', query)
        .then(favoriteSubjects => {
          if (favoriteSubjects.length) {
            this.setState({
              favoriteSubjects,
              meta: favoriteSubjects[0].getMeta()
            });
          }
        })
        .catch(() => {
          if (console) {
            console.warn('Failed to fetch favorites');
          }
        });
    } else {
      this.setState({
        favoriteSubjects: null,
        meta: null
      });
    }
  }

  render() {
    return (
      <Box basis="1/2" pad="medium">
        <Title>Your Favorites</Title>
        <Box direction="row" justify="around" responsive>
          {this.state.favoriteSubjects &&
            this.state.favoriteSubjects.map(favorite => (
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
  favoriteCollection: PropTypes.shape({
    id: PropTypes.string
  }),
  linkedSubjects: PropTypes.arrayOf(PropTypes.string),
  matchesUser: PropTypes.bool
};

FavoritesContainer.defaultProps = {
  favoriteCollection: null,
  linkedSubjects: [],
  matchesUser: false
};

export default FavoritesContainer;
