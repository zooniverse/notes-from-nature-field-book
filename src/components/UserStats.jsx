import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import Box from 'grommet/components/Box';
import Label from 'grommet/components/Label';
import Value from 'grommet/components/Value';

import Title from './Title';

export default function UserStats({ userStatsByDay, userStatsByMonth }) {
  let totalClassifications = 0;
  let longestStreakLength = 0;
  let longestStreakEnd = '';
  let currentStreakLength = 0;
  let lastClassificationDay;

  let maxDay = { label: '', value: 0 };
  if (userStatsByDay) {
    userStatsByDay.forEach((stat) => {
      if (stat.value > maxDay.value) {
        maxDay = stat;
      }

      const dayDifference = moment
        .utc(stat.label)
        .diff(moment.utc(lastClassificationDay), 'days');

      if (dayDifference === 1) {
        currentStreakLength += 1;
        if (currentStreakLength >= longestStreakLength) {
          longestStreakLength = currentStreakLength;
          longestStreakEnd = stat.label;
        }
      } else {
        currentStreakLength = 0;
      }

      lastClassificationDay = stat.label;
    });

    maxDay = userStatsByDay.reduce(
      (max, stat) => (stat.value > max.value ? stat : max),
      maxDay
    );
  }

  let maxMonth = { label: '', value: 0 };
  if (userStatsByMonth) {
    userStatsByMonth.forEach((stat) => {
      if (stat.value > maxMonth.value) {
        maxMonth = stat;
      }
      totalClassifications += stat.value;
    });
  }

  return (
    <Box
      colorIndex="light-1"
      flex="grow"
      margin={{ bottom: 'medium' }}
      pad="medium"
    >
      <Title>Your Stats</Title>
      <Box direction="row">
        <Box basis="1/2" justify="center" separator="right">
          <Value
            align="start"
            colorIndex="accent-2"
            value={totalClassifications.toLocaleString()}
          />
          <Label margin="none">Total Classifications</Label>
        </Box>
        <Box basis="1/2" justify="center" margin={{ left: 'medium' }}>
          <Value
            align="start"
            colorIndex="accent-1"
            size="small"
            value={maxDay.value.toLocaleString()}
          />
          <Label size="small">
            Highest day: {moment.utc(maxDay.label).format('ddd, l')}
          </Label>
          <Value
            align="start"
            colorIndex="accent-1"
            size="small"
            value={maxMonth.value.toLocaleString()}
          />
          <Label size="small">
            Highest month: {moment.utc(maxDay.label).format('MMMM, YYYY')}
          </Label>
          <Value
            align="start"
            colorIndex="accent-1"
            size="small"
            value={longestStreakLength.toLocaleString()}
          />
          <Label className="tooltip" size="small">
            Longest daily streak
            <Label className="tooltip tooltiptext" size="small">
              Ending: {moment.utc(longestStreakEnd).format('ddd, l')}
            </Label>
          </Label>
        </Box>
      </Box>
    </Box>
  );
}

UserStats.propTypes = {
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
  userStatsByDay: null,
  userStatsByMonth: null
};
