import PropTypes from 'prop-types';
import React from 'react';
import Box from 'grommet/components/Box';
import Chart, {
  Axis, Base, Bar, Grid, Layers, Marker, MarkerLabel,
} from 'grommet/components/chart/Chart';
import Value from 'grommet/components/Value';

import SAMPLE_STATS from './sample-stats';

// TODOs:
// - dynamically create vertical axis labels
// - dynamically create horizontal axis labels
// - use statsClient

class HistogramContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      statData: null,
    };
  }

  componentDidMount() {
    this.fetchStats();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.fetchStats();
    }
  }

  fetchStats() {
    const { user } = this.props;

    if (user) {
      this.setState({ statData: SAMPLE_STATS });
    }
  }

  render() {
    return (
      <Box colorIndex="light-1" pad="medium">
        <h2>Histogram</h2>
        {this.state.statData && (this.state.statData.length > 0) && (
          <Chart>
            <Axis
              count={5}
              labels={[{ index: 1, label: '1,000' }, { index: 2, label: '2,000' }, { index: 3, label: '3,000' }, { index: 4, label: '4,000' }]}
              vertical
            />
            <Chart vertical>
              <MarkerLabel
                count={this.state.statData.length}
                index={this.state.statData.length - 1}
                label={<Value value={this.state.statData[this.state.statData.length - 1].value} />}
              />
              <Base height="small" width="medium" />
              <Layers>
                <Grid rows={5} columns={3} />
                <Bar
                  activeIndex={this.state.statData.length - 1}
                  colorIndex="graph-2"
                  max={4000}
                  values={this.state.statData.map(statObject => statObject.value)}
                />
                <Marker
                  colorIndex="graph-2"
                  count={this.state.statData.length}
                  index={this.state.statData.length - 1}
                  vertical
                />
              </Layers>
              <Axis
                count={7}
                labels={[{ index: 0, label: 'S' }, { index: 1, label: 'S' }, { index: 2, label: 'M' }, { index: 3, label: 'T' }, { index: 4, label: 'W' }, { index: 5, label: 'T' }, { index: 6, label: 'F' }]}
              />
            </Chart>
          </Chart>
        )}
        <h3>Collective</h3>
      </Box>
    );
  }
}

HistogramContainer.propTypes = {
  user: PropTypes.shape({
    get: PropTypes.func,
  }),
};

HistogramContainer.defaultProps = {
  user: null,
};

export default HistogramContainer;
