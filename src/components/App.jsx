import React from 'react';
import * as GrommetApp from 'grommet/components/App';
import Box from 'grommet/components/Box';
import { ZooFooter, ZooHeader } from 'zooniverse-react-components';

import { UserProvider, withUser } from '../context/UserContext';
import AuthContainer from '../containers/AuthContainer';
import UserHeading from './UserHeading';
import RecentsContainer from '../containers/RecentsContainer';
import FavoritesContainer from '../containers/FavoritesContainer';
import UserStatsContainer from '../containers/UserStatsContainer';
import HistogramContainer from '../containers/HistogramContainer';

import Title from './Title'; // remove with completion of Badge section

const UserHeadingWithUser = withUser(UserHeading);
const RecentsWithUser = withUser(RecentsContainer);
const FavoritesWithUser = withUser(FavoritesContainer);
const UserStatsWithUser = withUser(UserStatsContainer);
const HistogramWithUser = withUser(HistogramContainer);

const App = () => (
  <UserProvider>
    <GrommetApp centered={false}>
      <ZooHeader authContainer={<AuthContainer />} />
      <Box className="main" pad="large" tag="main">
        <UserHeadingWithUser />
        <Box
          direction="row"
          full="horizontal"
          margin={{ bottom: 'medium' }}
          responsive
        >
          <Box basis="2/3" colorIndex="light-1" margin={{ right: 'medium' }}>
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
  </UserProvider>
);

export default App;
