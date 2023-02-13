import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Anchor from 'grommet/components/Anchor';
import {
  LoginButton,
  LogoutButton,
  UserMenu,
  UserNavigation
} from 'zooniverse-react-components';

import { config } from '../config';
import { UserContext } from '../context/UserContext';

class Auth extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    this.props.signIn();
  }

  logout() {
    this.props.signOut();
  }

  render() {
    let menuItems;

    if (this.props.user && this.props.initialised) {
      const { login } = this.props.user;
      menuItems = [
        <Anchor key="Menu-Profile" href={`${config.zooniverse}/users/${login}`}>
          Profile
        </Anchor>,
        <Anchor key="Menu-Settings" href={`${config.zooniverse}/settings`}>
          Settings
        </Anchor>,
        <Anchor
          key="Menu-Collections"
          href={`${config.zooniverse}/collections/${login}`}
        >
          Collections
        </Anchor>,
        <Anchor
          key="Menu-Favorites"
          href={`${config.zooniverse}/favorites/${login}`}
        >
          Favorites
        </Anchor>,
        <LogoutButton key="Menu-Logout" logout={this.logout} />
      ];
    }

    return this.props.user ? (
      <div>
        <UserNavigation />
        <UserMenu user={this.props.user} userMenuNavList={menuItems} />
      </div>
    ) : (
      <div>
        <LoginButton toggleModal={this.login} />
      </div>
    );
  }
}

Auth.propTypes = {
  initialised: PropTypes.bool,
  signIn: PropTypes.func,
  signOut: PropTypes.func,
  user: PropTypes.shape({
    login: PropTypes.string
  })
};

Auth.defaultProps = {
  initialised: false,
  signIn: () => {},
  signOut: () => {},
  user: null
};

const AuthContainer = () => (
  <UserContext.Consumer>
    {(context) => <Auth {...context} />}
  </UserContext.Consumer>
);

export default AuthContainer;
