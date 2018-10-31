import PropTypes from 'prop-types';
import React from 'react';
import statsClient from 'panoptes-client/lib/stats-client';
import Box from 'grommet/components/Box';

import { config } from '../config';
import Histogram from '../components/Histogram';
import UserStats from '../components/UserStats';

class StatsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      collective: false,
      collectiveStatsByDay: null,
      preferences: null,
      userStatsByDay: null,
      userStatsByMonth: null
    };

    this.toggleCollective = this.toggleCollective.bind(this);
  }

  componentDidMount() {
    this.fetchPreferences();
    this.fetchStats(false, 'day');
    this.fetchStats(false, 'month');
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.fetchPreferences();
      this.fetchStats(false, 'day');
      this.fetchStats(false, 'month');
    }
  }

  fetchPreferences() {
    const { user } = this.props;

    if (user && user.get) {
      user
        .get('project_preferences', { project_id: config.projectId })
        .then(([preferences]) => this.setState({ preferences }));
    }
  }

  fetchStats(collective = false, period = 'day') {
    const { user } = this.props;

    if (user) {
      statsClient
        .query({
          period,
          projectID: config.projectId,
          type: 'classification',
          userID: collective ? '' : user.id
        })
        .then(data =>
          data.map(statObject => ({
            label: statObject.key_as_string,
            value: statObject.doc_count
          }))
        )
        .then(statData => {
          if (!collective) {
            if (period === 'day') {
              this.setState({ userStatsByDay: statData });
            } else {
              this.setState({ userStatsByMonth: statData });
            }
          } else {
            this.setState({ collective, collectiveStatsByDay: statData });
          }
        })
        .catch(() => {
          if (console) {
            console.warn('Failed to fetch stats');
          }
        });
    }
  }

  toggleCollective() {
    const { collective, collectiveStatsByDay } = this.state;
    if (!collective && !collectiveStatsByDay) {
      this.fetchStats(true);
    } else {
      this.setState({ collective: !collective });
    }
  }

  render() {
    return (
      <Box basis="1/3" justify="between">
        <UserStats
          activityCount={
            this.state.preferences ? this.state.preferences.activity_count : 0
          }
          userStatsByDay={this.state.userStatsByDay}
          userStatsByMonth={this.state.userStatsByMonth}
        />
        <Histogram
          collective={this.state.collective}
          collectiveStatsByDay={this.state.collectiveStatsByDay}
          toggleCollective={this.toggleCollective}
          userStatsByDay={this.state.userStatsByDay}
        />
      </Box>
    );
  }
}

StatsContainer.propTypes = {
  user: PropTypes.shape({
    get: PropTypes.func
  })
};

StatsContainer.defaultProps = {
  user: null
};

export default StatsContainer;
