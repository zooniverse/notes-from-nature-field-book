import React from 'react';
import App from 'grommet/components/App';
import Box from 'grommet/components/Box';
import styled from 'styled-components';
import { ZooFooter, ZooHeader } from 'zooniverse-react-components';

import { withUser } from '../context/UserContext';
import AuthContainer from '../containers/AuthContainer';
import Heading from './Heading';
import RecentsContainer from '../containers/RecentsContainer';
import FavoritesContainer from '../containers/FavoritesContainer';
import UserStatsContainer from '../containers/UserStatsContainer';
import HistogramContainer from '../containers/HistogramContainer';

const HeadingWithUser = withUser(Heading);
const RecentsWithUser = withUser(RecentsContainer);
const FavoritesWithUser = withUser(FavoritesContainer);
const UserStatsWithUser = withUser(UserStatsContainer);
const HistogramWithUser = withUser(HistogramContainer);

export const StyledHR = styled.hr`
  margin: 2em 1em;
`;

const Main = () => (
  <App centered={false}>
    <ZooHeader authContainer={<AuthContainer />} />
    <Box pad="large" style={{ backgroundColor: '#EFF2F5' }}>
      <HeadingWithUser />
      <Box direction="row" full="horizontal" margin={{ bottom: 'medium' }}>
        <Box colorIndex="light-1" margin={{ right: 'medium' }} pad="medium" style={{ width: '75%' }}>
          <RecentsWithUser />
          <StyledHR />
          <FavoritesWithUser />
        </Box>
        <Box>
          <UserStatsWithUser />
          <HistogramWithUser />
        </Box>
      </Box>
      <Box colorIndex="light-1" full="horizontal" pad="medium" style={{ height: '250px' }}>
        <h2>Your Badges</h2>
      </Box>
    </Box>
    <ZooFooter />
  </App>
);

export default Main;
