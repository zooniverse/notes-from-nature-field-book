import React from 'react';
import GrommetApp from 'grommet/components/App';
import Anchor from 'grommet/components/Anchor';
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

const headerNavList = [
  <Anchor
    key="http://www.zooniverse.org/projects"
    className="zoo-header__link--small"
    href="http://www.zooniverse.org/projects"
    label="Projects"
  />,
  <Anchor
    key="http://www.zooniverse.org/about"
    className="zoo-header__link--small"
    href="http://www.zooniverse.org/about"
    label="About"
  />,
  <Anchor
    key="http://www.zooniverse.org/get-involved"
    className="zoo-header__link--small"
    href="http://www.zooniverse.org/get-involved"
    label="Get Involved"
  />,
  <Anchor
    key="http://www.zooniverse.org/talk"
    className="zoo-header__link--small"
    href="http://www.zooniverse.org/talk"
    label="Talk"
  />,
  <Anchor
    key="http://www.zooniverse.org/lab"
    className="zoo-header__link--small"
    href="http://www.zooniverse.org/lab"
    label="Build A Project"
  />,
  <Anchor
    key="project-stats"
    className="zoo-header__link--small"
    href="https://www.zooniverse.org/projects/zooniverse/notes-from-nature/stats"
    label="Stats"
  />
];

// TODO: REFACTOR STATS NAV LINK

const App = () => (
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
