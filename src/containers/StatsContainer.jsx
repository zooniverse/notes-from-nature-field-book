import PropTypes from 'prop-types';
import React from 'react';
import Box from 'grommet/components/Box';

import Histogram from '../components/Histogram';
import UserStats from '../components/UserStats';

class StatsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      collective: false
    };

    this.toggleCollective = this.toggleCollective.bind(this);
  }

  toggleCollective() {
    const { fetchCollectiveStats } = this.props;
    const { collective } = this.state;

    if (collective) {
      this.setState({ collective: false });
    } else {
      fetchCollectiveStats();
      this.setState({ collective: true });
    }
  }

  render() {
    const { collectiveStatsByDay, userStatsByDay, userStatsByMonth } =
      this.props;
    const { collective } = this.state;
    return (
      <Box justify="between" margin={{ bottom: 'medium' }}>
        <UserStats
          userStatsByDay={userStatsByDay}
          userStatsByMonth={userStatsByMonth}
        />
        <Histogram
          collective={collective}
          collectiveStatsByDay={collectiveStatsByDay}
          toggleCollective={this.toggleCollective}
          userStatsByDay={userStatsByDay}
        />
      </Box>
    );
  }
}

StatsContainer.propTypes = {
  collectiveStatsByDay: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.number
    })
  ),
  explorer: PropTypes.shape({
    id: PropTypes.string
  }),
  fetchCollectiveStats: PropTypes.func,
  userStatsByDay: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.number
    })
  ),
  userStatsByMonth: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.number
    })
  )
};

StatsContainer.defaultProps = {
  collectiveStatsByDay: null,
  explorer: null,
  fetchCollectiveStats: () => {},
  userStatsByDay: null,
  userStatsByMonth: null
};

export default StatsContainer;
