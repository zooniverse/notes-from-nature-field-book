import React, { Component } from 'react';
import { Grommet } from 'grommet';
import { ZooFooter, ZooHeader } from 'zooniverse-react-components';

class App extends Component {
  render() {
    return (
      <Grommet>
        <ZooHeader />
        <section>
          <h1>[name]'s Field Book</h1>
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
      </Grommet>
    );
  }
}

export default App;
