import PropTypes from 'prop-types';
import React, { Component } from 'react';
import statsClient from 'panoptes-client/lib/stats-client';

export const StatsContext = React.createContext();

export class StatsProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collectiveStatsByDay: new Map(),
      userStatsByDay: new Map(),
      userStatsByMonth: new Map()
    };

    this.fetchCollectiveStats = this.fetchCollectiveStats.bind(this);
  }

  componentDidMount() {
    const { projects, explorer } = this.props;
    if (projects && explorer) {
      this.fetchUserStats();
    }
  }

  componentDidUpdate(prevProps) {
    const { projects, explorer } = this.props;
    if (prevProps.projects !== projects || prevProps.explorer !== explorer) {
      this.fetchUserStats();
    }
  }

  fetchUserStats() {
    const { explorer, projects } = this.props;
    if (explorer && explorer.id && projects && projects.length) {
      projects.forEach(project => {
        statsClient
          .query({
            period: 'day',
            projectID: project.id,
            type: 'classification',
            userID: explorer.id
          })
          .then(statData => {
            const { userStatsByDay } = this.state;
            userStatsByDay.set(project.id, statData);
            this.setState({ userStatsByDay });
          })
          .catch(() => {
            if (console) {
              console.warn(
                `Failed to fetch user daily stats for project #${project.id}, ${
                  project.display_name
                }.`
              );
            }
          });
        statsClient
          .query({
            period: 'month',
            projectID: project.id,
            type: 'classification',
            userID: explorer.id
          })
          .then(statData => {
            const { userStatsByMonth } = this.state;
            userStatsByMonth.set(project.id, statData);
            this.setState({ userStatsByMonth });
          })
          .catch(() => {
            if (console) {
              console.warn(
                `Failed to fetch user monthly stats for project #${
                  project.id
                }, ${project.display_name}.`
              );
            }
          });
      });
    }
  }

  fetchCollectiveStats() {
    const { explorer, projects } = this.props;
    if (explorer && explorer.id && projects && projects.length) {
      projects.forEach(project => {
        statsClient
          .query({
            period: 'day',
            projectID: project.id,
            type: 'classification'
          })
          .then(statData => {
            const { collectiveStatsByDay } = this.state;
            collectiveStatsByDay.set(project.id, statData);
            this.setState({ collectiveStatsByDay });
          })
          .catch(() => {
            if (console) {
              console.warn(
                `Failed to fetch collective stats for project #${project.id}, ${
                  project.display_name
                }.`
              );
            }
          });
      });
    }
  }

  convertStats(stats) {
    const convertedStats = [...stats.values()]
      .flat()
      .map(item => ({
        label: item.key_as_string,
        value: item.doc_count
      }))
      .reduce((accum, item) => {
        if (accum.length && accum.some(day => day.label === item.label)) {
          const [existingDay] = accum.filter(day => day.label === item.label);
          const existingDayIndex = accum.indexOf(existingDay);
          const newValue = existingDay.value + item.value;
          const newDay = Object.assign({}, existingDay, { value: newValue });
          accum[existingDayIndex] = newDay;
          return accum;
        }
        accum.push(item);
        return accum;
      }, []);
    return convertedStats;
  }

  render() {
    const {
      collectiveStatsByDay,
      userStatsByDay,
      userStatsByMonth
    } = this.state;

    const convertedCollectiveStatsByDay = this.convertStats(
      collectiveStatsByDay
    );
    const convertedUserStatsByDay = this.convertStats(userStatsByDay);
    const convertedUserStatsByMonth = this.convertStats(userStatsByMonth);

    return (
      <StatsContext.Provider
        value={{
          collectiveStatsByDay: convertedCollectiveStatsByDay,
          userStatsByDay: convertedUserStatsByDay,
          userStatsByMonth: convertedUserStatsByMonth,
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
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      slug: PropTypes.string
    })
  )
};

StatsProvider.defaultProps = {
  explorer: null,
  projects: null
};
