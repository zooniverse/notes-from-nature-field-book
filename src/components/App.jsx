import React from 'react';
import * as GrommetApp from 'grommet/components/App';
import Box from 'grommet/components/Box';
import { ZooFooter, ZooHeader } from 'zooniverse-react-components';

import { withUser } from '../context/UserContext';
import AuthContainer from '../containers/AuthContainer';
import FavoritesContainer from '../containers/FavoritesContainer';
import HistogramContainer from '../containers/HistogramContainer';
import RecentsContainer from '../containers/RecentsContainer';
import UserHeading from './UserHeading';
import UserStatsContainer from '../containers/UserStatsContainer';

import Title from './Title'; // remove with Badge section

const UserHeadingWithUser = withUser(UserHeading);
const RecentsWithUser = withUser(RecentsContainer);
const FavoritesWithUser = withUser(FavoritesContainer);
const UserStatsWithUser = withUser(UserStatsContainer);
const HistogramWithUser = withUser(HistogramContainer);

const App = () => (
  <GrommetApp centered={false}>
    <ZooHeader authContainer={<AuthContainer />} />
    <Box className="main" pad="large" tag="main">
      <UserHeadingWithUser />
      <Box direction="row" full="horizontal" margin={{ bottom: 'medium' }}>
        <Box
          basis="2/3"
          colorIndex="light-1"
          margin={{ right: 'medium' }}
          pad="medium"
        >
          <RecentsWithUser />
          <hr className="main__hr" />
          <FavoritesWithUser />
        </Box>
        <Box basis="1/3" justify="between">
          <UserStatsWithUser />
          <HistogramWithUser />
        </Box>
      </Box>
      <Box
        colorIndex="light-1"
        full="horizontal"
        pad="medium"
        style={{ height: '250px' }}
      >
        <Title>Your Badges</Title>
      </Box>
    </Box>
    <ZooFooter />
  </GrommetApp>
);

export default App;
