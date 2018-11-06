import React from 'react';
import GrommetApp from 'grommet/components/App';
import Box from 'grommet/components/Box';
import { ZooFooter, ZooHeader } from 'zooniverse-react-components';

import {
  FavoritesProvider,
  FavoritesContext
} from '../context/FavoritesContext';
import { ProjectProvider, ProjectContext } from '../context/ProjectContext';
import { UserProvider, UserContext } from '../context/UserContext';

import AuthContainer from '../containers/AuthContainer';
import UserHeading from './UserHeading';
import RecentsContainer from '../containers/RecentsContainer';
import FavoritesContainer from '../containers/FavoritesContainer';
import StatsContainer from '../containers/StatsContainer';

import Title from './Title'; // remove with completion of Badge section

const App = () => (
  <UserProvider>
    <ProjectProvider>
      <UserContext.Consumer>
        {({ user }) => (
          <GrommetApp centered={false}>
            <ZooHeader authContainer={<AuthContainer />} />
            <ProjectContext.Consumer>
              {({ project }) => (
                <Box className="main" pad="large" tag="main">
                  <UserHeading project={project} user={user} />
                  <Box
                    direction="row"
                    full="horizontal"
                    margin={{ bottom: 'medium' }}
                    responsive
                  >
                    <FavoritesProvider project={project} user={user}>
                      <FavoritesContext.Consumer>
                        {({ favorites }) => (
                          <Box
                            basis="2/3"
                            colorIndex="light-1"
                            justify="between"
                            margin={{ right: 'medium' }}
                          >
                            <RecentsContainer user={user} />
                            <hr className="main__hr" />
                            <FavoritesContainer favorites={favorites} />
                          </Box>
                        )}
                      </FavoritesContext.Consumer>
                    </FavoritesProvider>
                    <StatsContainer user={user} />
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
              )}
            </ProjectContext.Consumer>
            <ZooFooter />
          </GrommetApp>
        )}
      </UserContext.Consumer>
    </ProjectProvider>
  </UserProvider>
);

export default App;
