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
import { StatsProvider, StatsContext } from '../context/StatsContext';
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
                      <StatsProvider explorer={explorer} project={project}>
                        <StatsContext>
                          {({
                            collectiveStatsByDay,
                            fetchCollectiveStats,
                            userStatsByDay,
                            userStatsByMonth
                          }) => (
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
                                    {({
                                      favoriteCollection,
                                      linkedSubjects
                                    }) => (
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
                                            favoriteCollection={
                                              favoriteCollection
                                            }
                                            linkedSubjects={linkedSubjects}
                                          />
                                        </div>
                                      </Box>
                                    )}
                                  </FavoritesContext.Consumer>
                                </FavoritesProvider>
                                <StatsContainer
                                  collectiveStatsByDay={collectiveStatsByDay}
                                  fetchCollectiveStats={fetchCollectiveStats}
                                  userStatsByDay={userStatsByDay}
                                  userStatsByMonth={userStatsByMonth}
                                />
                              </Box>
                              <BadgeContainer
                                explorer={explorer}
                                userStatsByMonth={userStatsByMonth}
                              />
                            </Box>
                          )}
                        </StatsContext>
                      </StatsProvider>
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
