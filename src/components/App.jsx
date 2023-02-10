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
import { ProjectProvider, ProjectContext } from '../context/ProjectContext';
import { StatsProvider, StatsContext } from '../context/StatsContext';
import { UserProvider, UserContext } from '../context/UserContext';

import AuthContainer from '../containers/AuthContainer';
import BadgeContainer from '../containers/BadgeContainer';
import UserHeading from './UserHeading';
import RecentsContainer from '../containers/RecentsContainer';
import FavoritesContainer from '../containers/FavoritesContainer';
import StatsContainer from '../containers/StatsContainer';

export default function App() {
  return (
    <UserProvider>
      <ProjectProvider>
        <UserContext.Consumer>
          {({ user }) => (
            <GrommetApp centered={false}>
              <ZooHeader
                authContainer={<AuthContainer />}
                mainHeaderNavList={headerNavList}
              />
              <ProjectContext.Consumer>
                {({ project }) => (
                  <ExplorerProvider project={project} user={user}>
                    <ExplorerContext.Consumer>
                      {({ explorer, matchesUser }) => (
                        <StatsProvider explorer={explorer} project={project}>
                          <StatsContext.Consumer>
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
                                  basis="full"
                                  justify="between"
                                  wrap
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
                                            project={project}
                                          />
                                          <hr className="main__hr" />
                                          <FavoritesContainer
                                            favoriteCollection={
                                              favoriteCollection
                                            }
                                            linkedSubjects={linkedSubjects}
                                            project={project}
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
              </ProjectContext.Consumer>
              <ZooFooter />
            </GrommetApp>
          )}
        </UserContext.Consumer>
      </ProjectProvider>
    </UserProvider>
  );
}
