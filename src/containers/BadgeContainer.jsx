import PropTypes from 'prop-types';
import React from 'react';
// import apiClient from 'panoptes-client';
// import superagent from 'superagent';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';

// import { config } from '../config';
import badgeIconLegend, {
  decade,
  levels,
  time,
  workflow
} from '../badges/badge-icon-legend';
import locationMatch from '../lib/location-match';
import Title from '../components/Title';

// import mockData from '../mock-badge-data';

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
  }

  render() {
    const { data, showAllBadges } = this.state;
    const { userStatsByMonth } = this.props;

    let caesarIcons = [];
    let statsIcons = [];

    if (showAllBadges) {
      caesarIcons = [...decade, ...time, ...workflow];
      statsIcons = levels;
    } else if (data && data.length) {
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

    const badgeIcons = statsIcons.concat(caesarIcons);

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
