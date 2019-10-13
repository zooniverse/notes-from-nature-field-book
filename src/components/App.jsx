import React from 'react';
import GrommetApp from 'grommet/components/App';
import Box from 'grommet/components/Box';
import { ZooFooter, ZooHeader } from 'zooniverse-react-components';

import headerNavList from './HeaderNavList';
import { ExplorerProvider, ExplorerContext } from '../context/ExplorerContext';
import {
  FavoritesProvider,
  FavoritesContext
} from '../context/FavoritesContext';
import { ProjectsProvider, ProjectsContext } from '../context/ProjectsContext';
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
    <ProjectsProvider>
      <UserContext.Consumer>
        {({ user }) => (
          <GrommetApp centered={false}>
            <ZooHeader
              authContainer={<AuthContainer />}
              mainHeaderNavList={headerNavList}
            />
            <ProjectsContext.Consumer>
              {({ organization, projects }) => (
                <ExplorerProvider organization={organization} user={user}>
                  <ExplorerContext.Consumer>
                    {({ explorer, matchesUser }) => (
                      <StatsProvider explorer={explorer} projects={projects}>
                        <StatsContext.Consumer>
                          {({
                            collectiveStatsByDay,
                            fetchCollectiveStats,
                            userStatsByDay,
                            userStatsByMonth
                          }) => (
                            <Box className="main" pad="large" tag="main">
                              <UserHeading
                                explorer={explorer}
                                matchesUser={matchesUser}
                                organization={organization}
                              />
                              <Box
                                direction="row"
                                basis="full"
                                justify="between"
                                wrap
                              >
                                <FavoritesProvider
                                  projects={projects}
                                  explorer={explorer}
                                >
                                  <FavoritesContext.Consumer>
                                    {({
                                      favoriteCollection,
                                      linkedSubjects
                                    }) => (
                                      <Box
                                        className="box"
                                        colorIndex="light-1"
                                        flex="grow"
                                        justify="between"
                                        margin={{
                                          bottom: 'medium',
                                          right: 'medium'
                                        }}
                                      >
                                        <RecentsContainer
                                          explorer={explorer}
                                          projects={projects}
                                        />
                                        <hr className="main__hr" />
                                        <FavoritesContainer
                                          favoriteCollection={
                                            favoriteCollection
                                          }
                                          linkedSubjects={linkedSubjects}
                                          projects={projects}
                                        />
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
                                projects={projects}
                                userStatsByMonth={userStatsByMonth}
                              />
                            </Box>
                          )}
                        </StatsContext.Consumer>
                      </StatsProvider>
                    )}
                  </ExplorerContext.Consumer>
                </ExplorerProvider>
              )}
            </ProjectsContext.Consumer>
            <ZooFooter />
          </GrommetApp>
        )}
      </UserContext.Consumer>
    </ProjectsProvider>
  </UserProvider>
);

export default App;
