import PropTypes from 'prop-types';
import React from 'react';
import apiClient from 'panoptes-client';
import Box from 'grommet/components/Box';
import { Thumbnail } from 'zooniverse-react-components';
import getSubjectLocations from '../lib/get-subject-locations';
import { config } from '../config';

class FavoritesContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
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
      apiClient.type('collections')
        .get({ project_ids: config.projectId, favorite: true, sort: 'display_name' })
        .then((collections) => {
          collections[0].get('subjects', { page_size: 3 })
            .then(subjects => this.setState({ favorites: subjects }));
        });
    }
  }

  render() {
    return (
      <Box>
        <h2>Your Favorites</h2>
        <Box direction="row">
          {(this.state.favorites.length > 0)
            && (
              <div>
                {this.state.favorites.map((recent) => {
                  const locations = getSubjectLocations(recent);
                  let type = '';
                  let format = '';
                  let src = '';
                  if (locations.image) {
                    type = 'image';
                    [format, src] = locations.image;
                  } else if (locations.video) {
                    type = 'video';
                    [format, src] = locations.video;
                  }
                  return (
                    <Thumbnail
                      key={recent.id}
                      alt={`Subject ${recent.links.subject}`}
                      src={src}
                      type={type}
                      format={format}
                      height={250}
                      width={200}
                    />
                  );
                })}
              </div>
            )
          }
        </Box>
      </Box>
    );
  }
}

FavoritesContainer.propTypes = {
  user: PropTypes.shape({
    get: PropTypes.func,
  }),
};

FavoritesContainer.defaultProps = {
  user: null,
};

export default FavoritesContainer;
