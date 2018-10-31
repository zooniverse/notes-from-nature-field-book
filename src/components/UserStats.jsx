import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import Box from 'grommet/components/Box';
import Label from 'grommet/components/Label';
import Value from 'grommet/components/Value';

import Title from './Title';

export default function UserStats({
  activityCount,
  userStatsByDay,
  userStatsByMonth
}) {
  let maxDay = { label: '', value: 0 };
  if (userStatsByDay) {
    maxDay = userStatsByDay.reduce(
      (max, stat) => (stat.value > max.value ? stat : max),
      maxDay
    );
  }

  let maxMonth = { label: '', value: 0 };
  if (userStatsByMonth) {
    maxMonth = userStatsByMonth.reduce(
      (max, stat) => (stat.value > max.value ? stat : max),
      maxMonth
    );
  }

  return (
    <Box
      colorIndex="light-1"
      flex="grow"
      margin={{ bottom: 'medium' }}
      pad="medium"
    >
      <Title>Your Notes from Nature Stats</Title>
      <Box direction="row">
        <Box basis="1/2" justify="center" separator="right">
          <Value align="start" colorIndex="accent-2" value={activityCount} />
          <Label margin="none">Total Classifications</Label>
        </Box>
        <Box basis="1/2" justify="center" margin={{ left: 'medium' }}>
          <Value
            align="start"
            colorIndex="accent-1"
            size="small"
            value={maxDay.value}
          />
          <Label size="small">
            Highest day: {moment.utc(maxDay.label).format('dd, l')}
          </Label>
          <Value
            align="start"
            colorIndex="accent-1"
            size="small"
            value={maxMonth.value}
          />
          <Label size="small">
            Highest month: {moment.utc(maxDay.label).format('MMMM, YYYY')}
          </Label>
        </Box>
      </Box>
    </Box>
  );
}

UserStats.propTypes = {
  activityCount: PropTypes.number,
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

UserStats.defaultProps = {
  activityCount: 0,
  userStatsByDay: [],
  userStatsByMonth: []
};
