import React from 'react';
import GrommetApp from 'grommet/components/App';
import Box from 'grommet/components/Box';
import { ZooFooter, ZooHeader } from 'zooniverse-react-components';

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
        {userContext => (
          <GrommetApp centered={false}>
            <ZooHeader authContainer={<AuthContainer />} />
            <Box className="main" pad="large" tag="main">
              <ProjectContext.Consumer>
                {projectContext => (
                  <UserHeading
                    project={projectContext.project}
                    user={userContext.user}
                  />
                )}
              </ProjectContext.Consumer>
              <Box
                direction="row"
                full="horizontal"
                margin={{ bottom: 'medium' }}
                responsive
              >
                <Box
                  basis="2/3"
                  colorIndex="light-1"
                  justify="between"
                  margin={{ right: 'medium' }}
                >
                  <RecentsContainer user={userContext.user} />
                  <hr className="main__hr" />
                  <FavoritesContainer user={userContext.user} />
                </Box>
                <StatsContainer user={userContext.user} />
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
            <ZooFooter />
          </GrommetApp>
        )}
      </UserContext.Consumer>
    </ProjectProvider>
  </UserProvider>
);

export default App;
