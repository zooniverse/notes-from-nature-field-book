import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Chart, {
  Axis,
  Base,
  Bar,
  Grid,
  Layers,
  Marker,
  MarkerLabel
} from 'grommet/components/chart/Chart';
import Value from 'grommet/components/Value';

import Title from './Title';

export default function Histogram({
  collective,
  collectiveStatsByDay,
  toggleCollective,
  userStatsByDay
}) {
  const statsData = collective ? collectiveStatsByDay : userStatsByDay;
  const now = moment();

  const weekOfData = {
    labels: [],
    series: [0, 0, 0, 0, 0, 0, 0]
  };
  [6, 5, 4, 3, 2, 1, 0].forEach(num => {
    weekOfData.labels.push(
      moment(now)
        .subtract(num, 'days')
        .format('ddd')
    );
  });
  if (statsData) {
    const filteredData = statsData.filter(data =>
      moment.utc(data.label).isSameOrAfter(moment(now).subtract(6, 'days'))
    );
    weekOfData.labels.forEach((dayLabel, index) => {
      filteredData.forEach(data => {
        if (dayLabel === moment.utc(data.label).format('ddd')) {
          weekOfData.series[index] = data.value;
        }
      });
    });
  }

  const max = Math.max(...weekOfData.series);
  const increment = Math.ceil(max / 4);
  const base = 10 ** (increment.toString().length - 1);
  const roundedIncrement = Math.round(increment / base) * base;

  const axisY = [0, 1, 2, 3, 4].map(index => ({
    index,
    label: `${(index * roundedIncrement).toLocaleString()}`
  }));

  const axisX = weekOfData.labels.map((label, index) => ({ index, label }));

  let personalClass = 'button';
  let collectiveClass = 'button';

  if (collective) {
    collectiveClass += ' button__active';
  } else {
    personalClass += ' button__active';
  }

  return (
    <Box colorIndex="light-1" pad="medium">
      <Title>Weekly Histogram</Title>
      <Chart>
        <Axis count={5} labels={axisY} vertical />
        <Chart vertical>
          <MarkerLabel
            colorIndex="accent-2"
            count={7}
            index={6}
            label={<Value value={weekOfData.series[6].toLocaleString()} />}
          />
          <Base />
          <Layers>
            <Grid rows={5} columns={3} />
            <Bar
              activeIndex={6}
              colorIndex="accent-2"
              max={roundedIncrement * 4}
              style={{ 'stroke-width': '8px' }}
              values={weekOfData.series.map(value => value)}
            />
            <Marker count={7} index={6} vertical />
          </Layers>
          <Axis count={7} labels={axisX} />
        </Chart>
      </Chart>
      <Box direction="row" justify="center">
        <Button className={personalClass} onClick={() => toggleCollective()}>
          Personal
        </Button>
        <Button className={collectiveClass} onClick={() => toggleCollective()}>
          Collective
        </Button>
      </Box>
    </Box>
  );
}

Histogram.propTypes = {
  collective: PropTypes.bool,
  collectiveStatsByDay: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.num
    })
  ),
  toggleCollective: PropTypes.func,
  userStatsByDay: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.num
    })
  )
};

Histogram.defaultProps = {
  collective: false,
  collectiveStatsByDay: null,
  toggleCollective: () => {},
  userStatsByDay: null
};
