import PropTypes from 'prop-types';
import React from 'react';
// import apiClient from 'panoptes-client';
// import superagent from 'superagent';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Value from 'grommet/components/Value';

// import { config } from '../config';
import badgeIconLegend from '../badges/badge-icon-legend';

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

    const caesarBadges = [];
    const statsBadges = [];
    const remainingBadges = [];

    if (data && data.length) {
      data.forEach(badgeData => {
        const { reducer_key, subgroup } = badgeData;
        const groupLevels = Object.keys(badgeIconLegend[reducer_key][subgroup]);
        groupLevels.forEach(groupLevel => {
          if (badgeData.data.classifications >= groupLevel) {
            caesarBadges.push({
              classifications: badgeData.data.classifications,
              icon: badgeIconLegend[reducer_key][subgroup][groupLevel],
              level: groupLevel
            });
          } else {
            remainingBadges.push({
              classifications: badgeData.data.classifications,
              icon: badgeIconLegend[reducer_key][subgroup][groupLevel],
              level: groupLevel
            });
          }
        });
      });
    }

    if (userStatsByMonth && userStatsByMonth.length) {
      let totalClassifications = 0;
      userStatsByMonth.forEach(stat => {
        totalClassifications += stat.value;
      });
      Object.keys(badgeIconLegend.levels).forEach(level => {
        if (totalClassifications >= level) {
          statsBadges.push({
            classifications: totalClassifications,
            icon: badgeIconLegend.levels[level],
            level
          });
        } else {
          remainingBadges.push({
            classifications: totalClassifications,
            icon: badgeIconLegend.levels[level],
            level
          });
        }
      });
    }

    const earnedBadges = statsBadges.concat(caesarBadges);

    return (
      <Box colorIndex="light-1" full="horizontal" pad="medium">
        <Tabs
          activeIndex={tab}
          justify="start"
          onActive={tabIndex => this.toggleTab(tabIndex)}
        >
          <Tab title="Your Badges">
            <Box direction="row" wrap>
              {earnedBadges.map(badge => (
                <Box key={badge.icon} pad="medium">
                  <Image size="small" src={badge.icon} />
                </Box>
              ))}
            </Box>
          </Tab>
          <Tab title="Remaining Badges">
            <Box direction="row" wrap>
              {remainingBadges.map(badge => (
                <Box key={badge.icon} pad="medium">
                  <Image
                    size="small"
                    src={badge.icon}
                    style={{ filter: 'grayscale(100%)', opacity: '0.3' }}
                  />
                  <Value
                    value={(
                      badge.level - badge.classifications
                    ).toLocaleString()}
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
