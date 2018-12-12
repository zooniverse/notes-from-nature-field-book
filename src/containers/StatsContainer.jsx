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
      userStatsByDay: null,
      userStatsByMonth: null
    };

    this.toggleCollective = this.toggleCollective.bind(this);
  }

  componentDidMount() {
    this.fetchStats(false, 'day');
    this.fetchStats(false, 'month');
  }

  componentDidUpdate(prevProps) {
    if (prevProps.explorer !== this.props.explorer) {
      this.fetchStats(false, 'day');
      this.fetchStats(false, 'month');
    }
  }

  fetchStats(collective = false, period = 'day') {
    const { explorer } = this.props;

    if (explorer) {
      statsClient
        .query({
          period,
          projectID: config.projectId,
          type: 'classification',
          userID: collective ? '' : explorer.id
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
            console.warn('Failed to fetch stats.');
          }
        });
    } else {
      this.setState({
        collective: false,
        collectiveStatsByDay: null,
        userStatsByDay: null,
        userStatsByMonth: null
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
  explorer: PropTypes.shape({
    id: PropTypes.string
  })
};

StatsContainer.defaultProps = {
  explorer: null
};

export default StatsContainer;
