import PropTypes from 'prop-types';
import React from 'react';
import apiClient from 'panoptes-client';
import superagent from 'superagent';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';

import { config } from '../config';
import badgeIconLegend, {
  decade,
  time,
  workflow
} from '../badges/badge-icon-legend';
import locationMatch from '../lib/location-match';
import Title from '../components/Title';

import mockData from '../mock-badge-data';

class BadgeContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      showAllBadges: false
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
    const showAllBadges = locationMatch(/\W?badges=(\w+)/);
    if (showAllBadges === 'all') {
      this.setState({ showAllBadges: true });
    } else {
      const { explorer } = this.props;
      if (explorer && explorer.id) {
        this.setState({ data: mockData });

        const requestUrl = `${config.caesar}/projects/${
          config.projectId
        }/users/${explorer.id}/user_reductions`;

        superagent
          .get(requestUrl)
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('Authorization', apiClient.headers.Authorization)
          .query()
          .then(response => {
            if (response.ok && response.body) {
              console.log('badge data = ', response.body);
            } else {
              console.warn('Failed to fetch badge data.');
            }
          })
          .catch(() => console.warn('Failed to fetch badge data.'));
      }
    }
  }

  render() {
    const { data, showAllBadges } = this.state;
    let badgeIcons = [];

    if (showAllBadges) {
      badgeIcons = [...decade, ...time, ...workflow];
    } else if (data && data.length) {
      data.forEach(badgeData => {
        const { reducer_key, subgroup } = badgeData;
        const levels = Object.keys(badgeIconLegend[reducer_key][subgroup]);
        levels.forEach(level => {
          if (badgeData.data.classifications >= level) {
            badgeIcons.push(badgeIconLegend[reducer_key][subgroup][level]);
          }
        });
      });
    }

    return (
      <Box colorIndex="light-1" full="horizontal" pad="medium">
        <Title>Your Badges</Title>
        <Box direction="row" wrap>
          {badgeIcons.map(badgeIcon => (
            <Box key={badgeIcon} pad="medium">
              <Image size="small" src={badgeIcon} />
            </Box>
          ))}
        </Box>
      </Box>
    );
  }
}

BadgeContainer.propTypes = {
  explorer: PropTypes.shape({
    id: PropTypes.string
  })
};

BadgeContainer.defaultProps = {
  explorer: null
};

export default BadgeContainer;
