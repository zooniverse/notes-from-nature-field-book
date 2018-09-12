import PropTypes from 'prop-types';
import React from 'react';
import Box from 'grommet/components/Box';
import { Thumbnail } from 'zooniverse-react-components';
import getSubjectLocations from '../lib/get-subject-locations';
import { config } from '../config';

class RecentsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      recents: [],
    };
  }

  componentDidMount() {
    this.fetchRecents();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.fetchRecents();
    }
  }

  fetchRecents() {
    const { user } = this.props;

    if (user && user.get) {
      user.get('recents', { project_id: config.projectId, sort: '-created_at', page_size: 3 })
        .then(recents => this.setState({ recents }));
    }
  }

  render() {
    return (
      <Box>
        <h2>Your Recent Classifications</h2>
        <Box direction="row">
          {(this.state.recents.length > 0)
            && (
              <div>
                {this.state.recents.map((recent) => {
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

RecentsContainer.propTypes = {
  user: PropTypes.shape({
    get: PropTypes.func,
  }),
};

RecentsContainer.defaultProps = {
  user: null,
};

export default RecentsContainer;
