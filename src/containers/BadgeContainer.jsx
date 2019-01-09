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
import { caesarBadges, statsBadges } from '../badges/all-badges';

// import mockData from '../mock-badge-data';

class BadgeContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      caesarData: [],
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
    //         this.setState({ caesarData: response.body });
    //         console.log('Caesar data = ', response.body);
    //       } else {
    //         console.warn('Failed to fetch Caesar data.');
    //       }
    //     })
    //     .catch(() => console.warn('Failed to fetch Caesar data.'));
    // }
  }

  toggleTab(tab) {
    this.setState({ tab });
  }

  render() {
    const { caesarData, tab } = this.state;
    const { userStatsByMonth } = this.props;

    const earnedBadges = [];
    const remainingBadges = [];

    let totalClassifications = 0;
    if (userStatsByMonth && userStatsByMonth.length) {
      userStatsByMonth.forEach(stat => {
        totalClassifications += stat.value;
      });
    }
    statsBadges.forEach(badge => {
      if (totalClassifications >= badge.level) {
        earnedBadges.push(badge);
      } else {
        const remainingBadge = Object.assign({}, badge, {
          classifications: totalClassifications
        });
        remainingBadges.push(remainingBadge);
      }
    });

    caesarBadges.forEach(badge => {
      if (caesarData && caesarData.length) {
        caesarData.forEach(badgeData => {
          const { reducer_key, subgroup } = badgeData;
          if (badge.reducerKey === reducer_key && badge.subgroup === subgroup) {
            if (badgeData.data.classifications >= badge.level) {
              earnedBadges.push(badge);
            } else {
              const remainingBadge = Object.assign({}, badge, {
                classifications: badgeData.data.classifications
              });
              remainingBadges.push(remainingBadge);
            }
          } else {
            const remainingBadge = Object.assign({}, badge, {
              classifications: 0
            });
            remainingBadges.push(remainingBadge);
          }
        });
      } else {
        const remainingBadge = Object.assign({}, badge, {
          classifications: 0
        });
        remainingBadges.push(remainingBadge);
      }
    });

    return (
      <Box colorIndex="light-1" basis="full" pad="medium">
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
