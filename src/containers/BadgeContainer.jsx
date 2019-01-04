import PropTypes from 'prop-types';
import React from 'react';
// import apiClient from 'panoptes-client';
// import superagent from 'superagent';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';

// import { config } from '../config';
import badgeIconLegend, {
  decade,
  levels,
  time,
  workflow
} from '../badges/badge-icon-legend';

// import mockData from '../mock-badge-data';

class BadgeContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      tab: 0
    };
  }

  componentDidMount() {
    this.fetchBadges();
  }

  componentDidUpdate(prevProps) {
    const { explorer } = this.props;
    if (prevProps.explorer !== explorer) {
      this.fetchBadges();
    }
  }

  fetchBadges() {
    console.log('Caesar requests paused.');

    // const { explorer } = this.props;
    // if (explorer && explorer.id) {
    //   const requestUrl = `${config.caesar}/projects/${
    //     config.projectId
    //   }/users/${explorer.id}/user_reductions`;

    //   superagent
    //     .get(requestUrl)
    //     .set('Accept', 'application/json')
    //     .set('Content-Type', 'application/json')
    //     .set('Authorization', apiClient.headers.Authorization)
    //     .query()
    //     .then(response => {
    //       if (response.ok && response.body) {
    //         this.setState({ data: response.body });
    //         console.log('badge data = ', response.body);
    //       } else {
    //         console.warn('Failed to fetch badge data.');
    //       }
    //     })
    //     .catch(() => console.warn('Failed to fetch badge data.'));
    // }
  }

  toggleTab(tab) {
    this.setState({ tab });
  }

  render() {
    const { data, tab } = this.state;
    const { userStatsByMonth } = this.props;

    const caesarIcons = [];
    const statsIcons = [];
    const allBadges = [...levels, ...decade, ...time, ...workflow];

    if (data && data.length) {
      data.forEach(badgeData => {
        const { reducer_key, subgroup } = badgeData;
        const groupLevels = Object.keys(badgeIconLegend[reducer_key][subgroup]);
        groupLevels.forEach(groupLevel => {
          if (badgeData.data.classifications >= groupLevel) {
            caesarIcons.push(
              badgeIconLegend[reducer_key][subgroup][groupLevel]
            );
          }
        });
      });
    } else if (userStatsByMonth.length) {
      let totalClassifications = 0;
      userStatsByMonth.forEach(stat => {
        totalClassifications += stat.value;
      });
      Object.keys(badgeIconLegend.levels).forEach(level => {
        if (totalClassifications >= level) {
          statsIcons.push(badgeIconLegend.levels[level]);
        }
      });
    }

    const earnedBadges = statsIcons.concat(caesarIcons);
    const remainingBadges = allBadges.filter(
      badge => earnedBadges.indexOf(badge) < 0
    );

    return (
      <Box colorIndex="light-1" full="horizontal" pad="medium">
        <Tabs
          activeIndex={tab}
          justify="start"
          onActive={tabIndex => this.toggleTab(tabIndex)}
        >
          <Tab title="Your Badges">
            <Box direction="row" wrap>
              {earnedBadges.map(badgeIcon => (
                <Box key={badgeIcon} pad="medium">
                  <Image size="small" src={badgeIcon} />
                </Box>
              ))}
            </Box>
          </Tab>
          <Tab title="Remaining Badges">
            <Box direction="row" wrap>
              {remainingBadges.map(badgeIcon => (
                <Box key={badgeIcon} pad="medium">
                  <Image
                    size="small"
                    src={badgeIcon}
                    style={{ filter: 'grayscale(100%)', opacity: '0.3' }}
                  />
                </Box>
              ))}
            </Box>
          </Tab>
        </Tabs>
      </Box>
    );
  }
}

BadgeContainer.propTypes = {
  explorer: PropTypes.shape({
    id: PropTypes.string
  }),
  userStatsByMonth: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.number
    })
  )
};

BadgeContainer.defaultProps = {
  explorer: null,
  userStatsByMonth: []
};

export default BadgeContainer;
