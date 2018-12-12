import React from 'react';
import GrommetApp from 'grommet/components/App';
import Box from 'grommet/components/Box';
import { ZooFooter, ZooHeader } from 'zooniverse-react-components';

import { ExplorerProvider, ExplorerContext } from '../context/ExplorerContext';
import {
  FavoritesProvider,
  FavoritesContext
} from '../context/FavoritesContext';
import { ProjectProvider, ProjectContext } from '../context/ProjectContext';
import { UserProvider, UserContext } from '../context/UserContext';

import AuthContainer from '../containers/AuthContainer';
import BadgeContainer from '../containers/BadgeContainer';
import UserHeading from './UserHeading';
import RecentsContainer from '../containers/RecentsContainer';
import FavoritesContainer from '../containers/FavoritesContainer';
import StatsContainer from '../containers/StatsContainer';

const App = () => (
  <UserProvider>
    <ProjectProvider>
      <UserContext.Consumer>
        {({ user }) => (
          <GrommetApp centered={false}>
            <ZooHeader authContainer={<AuthContainer />} />
            <ProjectContext.Consumer>
              {({ project }) => (
                <ExplorerProvider project={project} user={user}>
                  <ExplorerContext>
                    {({ explorer, matchesUser }) => (
                      <Box className="main" pad="large" tag="main">
                        <UserHeading
                          project={project}
                          explorer={explorer}
                          matchesUser={matchesUser}
                        />
                        <Box
                          direction="row"
                          full="horizontal"
                          margin={{ bottom: 'medium' }}
                          responsive
                        >
                          <FavoritesProvider
                            project={project}
                            explorer={explorer}
                          >
                            <FavoritesContext.Consumer>
                              {({ favoriteCollection, linkedSubjects }) => (
                                <Box
                                  basis="2/3"
                                  colorIndex="light-1"
                                  justify="between"
                                  margin={{ right: 'medium' }}
                                >
                                  <RecentsContainer explorer={explorer} />
                                  <hr className="main__hr" />
                                  <div>
                                    <FavoritesContainer
                                      favoriteCollection={favoriteCollection}
                                      linkedSubjects={linkedSubjects}
                                      matchesUser={matchesUser}
                                    />
                                  </div>
                                </Box>
                              )}
                            </FavoritesContext.Consumer>
                          </FavoritesProvider>
                          <StatsContainer explorer={explorer} />
                        </Box>
                        <BadgeContainer explorer={explorer} />
                      </Box>
                    )}
                  </ExplorerContext>
                </ExplorerProvider>
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
