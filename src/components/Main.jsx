import React from 'react';
import App from 'grommet/components/App';
import Box from 'grommet/components/Box';
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

const Main = () => (
  <App centered={false}>
    <ZooHeader authContainer={<AuthContainer />} />
    <Box>
      <HeadingWithUser />
      <section>
        <RecentsWithUser />
        <hr />
        <FavoritesWithUser />
      </section>
      <UserStatsWithUser />
      <HistogramWithUser />
      <section>
        <h2>Your Badges</h2>
      </section>
    </Box>
    <ZooFooter />
  </App>
);

export default Main;
