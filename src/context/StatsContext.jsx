import oauth from 'panoptes-client/lib/oauth';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { config } from '../config';

export const StatsContext = React.createContext();

async function fetchStats(url) {
  const authToken = await oauth.checkBearerToken();
  const headers = {
    Authorization: `Bearer ${authToken.access_token}`
  };

  const response = await fetch(url, { headers });
  const { data } = await response.json();
  return data;
}

async function fetchAndFormatStats(url) {
  const data = await fetchStats(url);
  return data.map((statObject) => ({
    label: statObject.period,
    value: statObject.count
  }));
}

export class StatsProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collectiveStatsByDay: [],
      userStatsByDay: [],
      userStatsByMonth: []
    };

    this.fetchCollectiveStats = this.fetchCollectiveStats.bind(this);
  }

  componentDidMount() {
    const { project, explorer } = this.props;
    if (project && explorer) {
      this.fetchUserStats();
    }
  }

  componentDidUpdate(prevProps) {
    const { project, explorer } = this.props;
    if (prevProps.project !== project || prevProps.explorer !== explorer) {
      this.fetchUserStats();
    }
  }

  async fetchUserStats() {
    const { explorer, project } = this.props;

    if (project && explorer) {
      const [dailyStats, monthlyStats] = await Promise.all([
        fetchAndFormatStats(
          `${config.stats}/classifications/users/${explorer.id}?project_id=${project.id}&period=day`
        ),
        fetchAndFormatStats(
          `${config.stats}/classifications/users/${explorer.id}?project_id=${project.id}&period=month`
        )
      ]);

      this.setState({
        collectiveStatsByDay: [],
        userStatsByDay: dailyStats,
        userStatsByMonth: monthlyStats
      });
    } else {
      this.setState({
        collectiveStatsByDay: [],
        userStatsByDay: [],
        userStatsByMonth: []
      });
    }
  }

  async fetchCollectiveStats() {
    const stats = await fetchAndFormatStats(
      `${config.stats}/classifications?project_id=${config.projectId}&period=day`
    );

    this.setState({ collectiveStatsByDay: stats });
  }

  render() {
    const { collectiveStatsByDay, userStatsByDay, userStatsByMonth } =
      this.state;
    return (
      <StatsContext.Provider
        value={{
          collectiveStatsByDay,
          userStatsByDay,
          userStatsByMonth,
          fetchCollectiveStats: this.fetchCollectiveStats
        }}
      >
        {this.props.children}
      </StatsContext.Provider>
    );
  }
}

StatsProvider.propTypes = {
  children: PropTypes.element.isRequired,
  explorer: PropTypes.shape({
    id: PropTypes.string
  }),
  project: PropTypes.shape({
    id: PropTypes.string,
    slug: PropTypes.string
  })
};

StatsProvider.defaultProps = {
  explorer: null,
  project: null
};
