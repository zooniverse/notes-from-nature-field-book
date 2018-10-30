import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import statsClient from 'panoptes-client/lib/stats-client';
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

import { config } from '../config';
import Title from '../components/Title';

class HistogramContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      collective: false,
      statData: null
    };

    this.toggleCollective = this.toggleCollective.bind(this);
  }

  componentDidMount() {
    this.fetchStats();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.fetchStats();
    }
  }

  fetchStats(collective = false) {
    const { user } = this.props;

    if (user) {
      statsClient
        .query({
          period: 'day',
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
          this.setState({ collective, statData });
        })
        .catch(() => {
          if (console) {
            console.warn('Failed to fetch stats');
          }
        });
    }
  }

  toggleCollective() {
    const { collective } = this.state;
    this.fetchStats(!collective);
  }

  render() {
    const now = moment.utc();

    const weekOfData = {
      labels: [],
      series: [0, 0, 0, 0, 0, 0, 0]
    };
    [6, 5, 4, 3, 2, 1, 0].forEach(num => {
      weekOfData.labels.push(
        moment(now)
          .subtract(num, 'days')
          .format('dd')
      );
    });
    if (this.state.statData) {
      const filteredData = this.state.statData.filter(data =>
        moment.utc(data.label).isSameOrAfter(moment(now).subtract(6, 'days'))
      );
      weekOfData.labels.forEach((dayLabel, index) => {
        filteredData.forEach(data => {
          if (dayLabel === moment.utc(data.label).format('dd')) {
            weekOfData.series[index] = data.value;
          }
        });
      });
    }

    const increment = Math.ceil(Math.max(...weekOfData.series) / 4);

    const axisY = [0, 1, 2, 3, 4].map(index => ({
      index,
      label: `${index * increment}`
    }));

    const axisX = weekOfData.labels.map((label, index) => ({ index, label }));

    let personalClass = 'button';
    let collectiveClass = 'button';

    if (this.state.collective) {
      collectiveClass += ' button__active';
    } else {
      personalClass += ' button__active';
    }

    return (
      <Box colorIndex="light-1" pad="medium">
        <Title>Histogram</Title>
        <Chart>
          <Axis count={5} labels={axisY} vertical />
          <Chart vertical>
            <MarkerLabel
              count={weekOfData.series.length}
              index={weekOfData.series.length - 1}
              label={
                <Value
                  value={weekOfData.series[weekOfData.series.length - 1]}
                />
              }
            />
            <Base />
            <Layers>
              <Grid rows={5} columns={3} />
              <Bar
                activeIndex={weekOfData.series.length - 1}
                colorIndex="graph-2"
                max={increment * 4}
                values={weekOfData.series.map(value => value)}
              />
              <Marker
                colorIndex="graph-2"
                count={weekOfData.series.length}
                index={weekOfData.series.length - 1}
                vertical
              />
            </Layers>
            <Axis count={7} labels={axisX} />
          </Chart>
        </Chart>
        <Box direction="row" justify="center">
          <Button className={personalClass} onClick={this.toggleCollective}>
            Personal
          </Button>
          <Button className={collectiveClass} onClick={this.toggleCollective}>
            Collective
          </Button>
        </Box>
      </Box>
    );
  }
}

HistogramContainer.propTypes = {
  user: PropTypes.shape({
    get: PropTypes.func
  })
};

HistogramContainer.defaultProps = {
  user: null
};

export default HistogramContainer;
