// A smart component that handles state for the LoginButton and LoggedInUser
// components. Stores state in Context.

import React from 'react';
import Anchor from 'grommet/components/Anchor';
import { LoginButton, LogoutButton, UserMenu, UserNavigation } from 'zooniverse-react-components';

import oauth from 'panoptes-client/lib/oauth';

import { config } from '../config';

class AuthContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialised: false,
      user: null
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    oauth.checkCurrent()
      .then(user => this.setState({ initialised: true, user }));
  }

  login() {
    console.log('login');
    oauth.signIn(config.origin)
      .then(user => this.setState({ initialised: true, user }));
  }

  logout() {
    console.log('logout');
    oauth.signOut()
      .then(user => this.setState({ initialised: true, user }));
  }

  render() {
    let menuItems;

    if (this.state.user && this.state.initialised) {
      const login = this.state.user.login;
      menuItems = [
        <Anchor href={`https://${config.zooniverse}/users/${login}`}>Profile</Anchor>,
        <Anchor href={`https://${config.zooniverse}/settings`}>Settings</Anchor>,
        <Anchor href={`https://${config.zooniverse}/collections/${login}`}>Collections</Anchor>,
        <Anchor href={`https://${config.zooniverse}/favorites/${login}`}>Favorites</Anchor>,
        <LogoutButton logout={this.logout} />
      ];
    }

    return (this.state.user)
      ? <div>
          <UserNavigation />
          <UserMenu user={this.state.user} userMenuNavList={menuItems} />
        </div>
      : <div>
          <LoginButton toggleModal={this.login} />
        </div>;
  }
}

export default AuthContainer;
