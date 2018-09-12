import PropTypes from 'prop-types';
import React from 'react';
import Box from 'grommet/components/Box';
import { config } from '../config';

class UserStatsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      preferences: null,
    };
  }

  componentDidMount() {
    this.fetchPreferences();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.fetchPreferences();
    }
  }

  fetchPreferences() {
    const { user } = this.props;

    if (user && user.get) {
      user.get('project_preferences', { project_id: config.projectId })
        .then(([preferences]) => this.setState({ preferences }));
    }
  }

  render() {
    return (
      <Box colorIndex="light-1" margin={{ bottom: 'medium' }} pad="medium">
        <h2>Your Stats</h2>
        <h1>{this.state.preferences? this.state.preferences.activity_count : '0'}</h1>
        <h3>Total Classifications</h3>
      </Box>
    );
  }
}

UserStatsContainer.propTypes = {
  user: PropTypes.shape({
    get: PropTypes.func,
  }),
};

UserStatsContainer.defaultProps = {
  user: null,
};

export default UserStatsContainer;
