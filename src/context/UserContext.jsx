import PropTypes from 'prop-types';
import React, { Component } from 'react';
import oauth from 'panoptes-client/lib/oauth';

import { config } from '../config';

export const UserContext = React.createContext();

export class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialised: false,
      user: null
    };
  }

  componentDidMount() {
    if (!this.state.initialised) {
      oauth
        .checkCurrent()
        .then(user => this.setState({ initialised: true, user }));
    }
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          initialised: this.state.initialised,
          user: this.state.user,
          signIn: () => {
            oauth
              .signIn(config.origin)
              .then(user => this.setState({ initialised: true, user }));
          },
          signOut: () => {
            oauth
              .signOut(config.origin)
              .then(user => this.setState({ initialised: true, user }));
          }
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

UserProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export function withUser(MyComponent) {
  return function UserComponent(props) {
    return (
      <UserContext.Consumer>
        {userState => (
          <MyComponent
            {...props}
            initialised={userState.initialised}
            user={userState.user}
          />
        )}
      </UserContext.Consumer>
    );
  };
}
