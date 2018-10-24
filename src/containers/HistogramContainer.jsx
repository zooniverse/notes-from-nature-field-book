import PropTypes from 'prop-types';
import React from 'react';
import Box from 'grommet/components/Box';
import Chart, {
  Axis,
  Base,
  Bar,
  Grid,
  Layers,
  Marker,
  MarkerLabel
} from 'grommet/components/chart/Chart';
import Label from 'grommet/components/Label';
import Value from 'grommet/components/Value';
import Title from '../components/Title';

import SAMPLE_STATS from './sample-stats';

// TODOs:
// - dynamically create vertical axis labels
// - dynamically create horizontal axis labels
// - use statsClient

class HistogramContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      statData: null
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
        <Title>Histogram</Title>
        {this.state.statData &&
          this.state.statData.length > 0 && (
            <Chart>
              <Axis
                count={5}
                labels={[
                  { index: 1, label: '350' },
                  { index: 2, label: '700' },
                  { index: 3, label: '1,050' },
                  { index: 4, label: '1,400' }
                ]}
                vertical
              />
              <Chart vertical>
                <MarkerLabel
                  count={this.state.statData.length}
                  index={this.state.statData.length - 1}
                  label={
                    <Value
                      value={
                        this.state.statData[this.state.statData.length - 1]
                          .value
                      }
                    />
                  }
                />
                <Base height="small" width="medium" />
                <Layers>
                  <Grid rows={5} columns={3} />
                  <Bar
                    activeIndex={this.state.statData.length - 1}
                    colorIndex="graph-2"
                    max={1400}
                    values={this.state.statData.map(
                      statObject => statObject.value
                    )}
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
                  labels={[
                    { index: 0, label: 'F' },
                    { index: 1, label: 'S' },
                    { index: 2, label: 'S' },
                    { index: 3, label: 'M' },
                    { index: 4, label: 'T' },
                    { index: 5, label: 'W' },
                    { index: 6, label: 'T' }
                  ]}
                />
              </Chart>
            </Chart>
          )}
        <Label align="center">Collective</Label>
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
