import React from 'react';
import App from 'grommet/components/App';
import Box from 'grommet/components/Box';
import { ZooFooter, ZooHeader } from 'zooniverse-react-components';

import { withUser } from '../context/UserContext';
import AuthContainer from '../containers/AuthContainer';
import Heading from './Heading';
import RecentsContainer from '../containers/RecentsContainer';
import FavoritesContainer from '../containers/FavoritesContainer';

const HeadingWithUser = withUser(Heading);
const RecentsWithUser = withUser(RecentsContainer);
const FavoritesWithUser = withUser(FavoritesContainer);

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
      <section>
        <h2>Your Notes from Nature Stats</h2>
      </section>
      <section>
        <h2>Historgram</h2>
      </section>
      <section>
        <h2>Your Badges</h2>
      </section>
    </Box>
    <ZooFooter />
  </App>
);

export default Main;
