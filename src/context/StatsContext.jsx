import PropTypes from 'prop-types';
import React, { Component } from 'react';
import statsClient from 'panoptes-client/lib/stats-client';

import { config } from '../config';

export const StatsContext = React.createContext();

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
      if (project && explorer) {
        this.fetchUserStats();
      }
    }
  }

  fetchUserStats() {
    const { explorer } = this.props;

    statsClient
      .query({
        period: 'day',
        projectID: config.projectId,
        type: 'classification',
        userID: explorer.id
      })
      .then(data =>
        data.map(statObject => ({
          label: statObject.key_as_string,
          value: statObject.doc_count
        }))
      )
      .then(statData => {
        this.setState({ userStatsByDay: statData });
      })
      .catch(() => {
        if (console) {
          console.warn('Failed to fetch user daily stats.');
        }
      });
    statsClient
      .query({
        period: 'month',
        projectID: config.projectId,
        type: 'classification',
        userID: explorer.id
      })
      .then(data =>
        data.map(statObject => ({
          label: statObject.key_as_string,
          value: statObject.doc_count
        }))
      )
      .then(statData => {
        this.setState({ userStatsByMonth: statData });
      })
      .catch(() => {
        if (console) {
          console.warn('Failed to fetch user monthly stats.');
        }
      });
  }

  fetchCollectiveStats() {
    statsClient
      .query({
        period: 'day',
        projectID: config.projectId,
        type: 'classification'
      })
      .then(data =>
        data.map(statObject => ({
          label: statObject.key_as_string,
          value: statObject.doc_count
        }))
      )
      .then(statData => {
        this.setState({ collectiveStatsByDay: statData });
      })
      .catch(() => {
        if (console) {
          console.warn('Failed to fetch collective daily stats.');
        }
      });
  }

  render() {
    const {
      collectiveStatsByDay,
      userStatsByDay,
      userStatsByMonth
    } = this.state;
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
