import React from 'react';
import * as GrommetApp from 'grommet/components/App';
import Box from 'grommet/components/Box';
import styled from 'styled-components';
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

const Main = styled(Box)`
  background-color: #eff2f5;
`;

const StyledHR = styled.hr`
  margin: 2em 1em;
`;

const App = () => (
  <GrommetApp centered={false}>
    <ZooHeader authContainer={<AuthContainer />} />
    <Main pad="large" tag="main">
      <UserHeadingWithUser />
      <Box direction="row" full="horizontal" margin={{ bottom: 'medium' }}>
        <Box
          colorIndex="light-1"
          margin={{ right: 'medium' }}
          pad="medium"
          style={{ width: '75%' }}
        >
          <RecentsWithUser />
          <StyledHR />
          <FavoritesWithUser />
        </Box>
        <Box>
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
    </Main>
    <ZooFooter />
  </GrommetApp>
);

export default App;
