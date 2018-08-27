import React from 'react';
import { ZooFooter, ZooHeader } from 'zooniverse-react-components';

import { UserContext, UserProvider } from './context/UserContext';
import AuthContainer from './containers/AuthContainer';

const App = () => (
  <UserProvider>
    <ZooHeader authContainer={<AuthContainer />} />
    <section>
      <UserContext.Consumer>
        {(context) => {
          const displayName = context && context.user ? context.user.display_name : 'nope';
          return (
            <h1>{displayName}'s Field Book</h1>
          );
        }}
      </UserContext.Consumer>
      <section>
        <h2>Your Recent Classifications</h2>
        <hr/>
        <h2>Your Favorites</h2>
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
    </section>
    <ZooFooter />
  </UserProvider>
);

export default App;
