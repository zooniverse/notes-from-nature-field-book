import PropTypes from 'prop-types';
import React from 'react';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import { Paginator } from 'zooniverse-react-components';

import { config } from '../config';
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
    const { favoriteCollection, linkedSubjects } = this.props;

    if (favoriteCollection && linkedSubjects.length) {
      const query = {
        page,
        page_size: 3
      };

      favoriteCollection
        .get('subjects', query)
        .then((favoriteSubjects) => {
          if (favoriteSubjects.length) {
            this.setState({
              favoriteSubjects,
              meta: favoriteSubjects[0].getMeta()
            });
          } else {
            this.setState({
              favoriteSubjects: null,
              meta: null
            });
          }
        })
        .catch(() => {
          if (console) {
            console.warn('Failed to fetch favorites.');
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
    let firstPage;
    let lastPage;
    if (this.state.meta) {
      firstPage = Math.max(1, this.state.meta.page);
      lastPage = Math.min(this.state.meta.page_count, firstPage + 9);
    }

    const { project } = this.props;

    return (
      <Box pad="medium">
        <Title>
          <Anchor
            className="title-anchor"
            href={`${config.zooniverse}/projects/${
              project ? project.slug : ''
            }/favorites`}
          >
            Your Favorites
          </Anchor>
        </Title>
        <Box direction="row" flex justify="around">
          {this.state.favoriteSubjects &&
            this.state.favoriteSubjects.map((favorite) => (
              <SubjectCard key={favorite.id} subject={favorite} />
            ))}
        </Box>
        {this.state.meta && this.state.meta.page_count > 1 && (
          <Paginator
            itemCount
            page={this.state.meta.page}
            pageCount={lastPage}
            onPageChange={this.onPageChange}
            totalItems={`TOTAL ${this.state.meta.page_count.toLocaleString()}`}
          />
        )}
      </Box>
    );
  }
}

FavoritesContainer.defaultProps = {
  favoriteCollection: null,
  linkedSubjects: [],
  project: {
    slug: ''
  }
};

FavoritesContainer.propTypes = {
  favoriteCollection: PropTypes.shape({
    get: PropTypes.func,
    id: PropTypes.string
  }),
  linkedSubjects: PropTypes.arrayOf(PropTypes.string),
  project: PropTypes.shape({
    slug: PropTypes.string
  })
};

export default FavoritesContainer;
