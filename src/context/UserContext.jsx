import React, { Component } from 'react';
import oauth from 'panoptes-client/lib/oauth';

import { config } from '../config';

export const UserContext = React.createContext();

export class UserProvider extends Component {
  state = {
    initialised: false,
    signIn: () => {
      oauth.signIn(config.origin)
        .then(user => this.setState({ initialised: true, user }));
    },
    signOut: () => {
      oauth.signOut(config.origin)
        .then(user => this.setState({ initialised: true, user }));
    },
    user: null
  }

  componentDidMount() {
    if (!this.state.initialised) {
      oauth.checkCurrent()
        .then(user => this.setState({ initialised: true, user }));
    }
  }

  render() {
    return <UserContext.Provider value={this.state}>
      {this.props.children}
    </UserContext.Provider>
  }
}

export function withUser(Component) {
  return function UserComponent(props) {
    return (
      <UserContext.Consumer>
        {userState => <Component {...props} initialised={userState.initialised} user={userState.user}/>}
      </UserContext.Consumer>
    );
  };
}
