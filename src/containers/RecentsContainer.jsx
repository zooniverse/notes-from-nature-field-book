import PropTypes from 'prop-types';
import React from 'react';
import Box from 'grommet/components/Box';
import { config } from '../config';
import Title from '../components/Title';
import SubjectCard from '../components/SubjectCard';

class RecentsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      recents: []
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
      user
        .get('recents', {
          project_id: config.projectId,
          sort: '-created_at',
          page: this.state.page,
          page_size: 3
        })
        .then(recents => {
          this.setState({ recents });
          console.log('meta = ', recents[0].getMeta());
        });
    }
  }

  render() {
    return (
      <Box>
        <Title>Your Recent Classifications</Title>
        <Box direction="row">
          {this.state.recents.length > 0 &&
            this.state.recents.map(recent => (
              <SubjectCard key={recent.id} subject={recent} />
            ))}
        </Box>
      </Box>
    );
  }
}

RecentsContainer.propTypes = {
  user: PropTypes.shape({
    get: PropTypes.func
  })
};

RecentsContainer.defaultProps = {
  user: null
};

export default RecentsContainer;
