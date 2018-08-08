import React, { Component } from 'react';
import { ZooFooter, ZooHeader } from 'zooniverse-react-components';

import AuthContainer from './containers/AuthContainer';

const UserContext = React.createContext({
  display_name: 'Default Value'
});

class App extends Component {
  render() {
    return (
      <UserContext.Provider value={{ display_name: 'Guest' }}>
        <ZooHeader authContainer={<AuthContainer />} />
        <section>
          <UserContext.Consumer>
            {(user) => {
              const displayName = user.display_name;
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
      </UserContext.Provider>
    );
  }
}

export default App;
