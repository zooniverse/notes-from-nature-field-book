import PropTypes from 'prop-types';
import React, { Component } from 'react';
import apiClient from 'panoptes-client/lib/api-client';

import locationMatch from '../lib/location-match';

export const ExplorerContext = React.createContext();

export class ExplorerProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      explorer: null,
      matchesUser: false
    };
  }

  componentDidMount() {
    const { user } = this.props;
    if (user) {
      this.setExplorer();
    }
  }

  componentDidUpdate(prevProps) {
    const { organization, user } = this.props;
    if (prevProps.organization !== organization || prevProps.user !== user) {
      this.setExplorer();
    }
  }

  setExplorer() {
    const { user } = this.props;
    const explorerQuery = locationMatch(/\W?explorer=(\w+)/);
    if (explorerQuery && user) {
      this.checkPermission();
    } else if (user) {
      this.setState({ explorer: user, matchesUser: true });
    } else {
      this.setState({ explorer: null, matchesUser: false });
    }
  }

  async fetchRoles(organizationId, userId) {
    return apiClient
      .type('organization_roles')
      .get({ organization_id: organizationId, user_id: userId })
      .then(roles => roles)
      .catch(error => console.error('Error loading roles.', error));
  }

  async checkPermission() {
    const { organization, user } = this.props;

    if (user && user.admin) {
      this.fetchExplorer();
    } else if (organization && user) {
      const roles = await this.fetchRoles(organization.id, user.id);
      const collaboratorRoles = roles.filter(
        role =>
          role.roles.includes('collaborator') || role.roles.includes('owner')
      );
      if (collaboratorRoles.length > 0) {
        this.fetchExplorer();
      }
    }
  }

  fetchExplorer() {
    const { user } = this.props;
    const explorerQuery = locationMatch(/\W?explorer=(\S+)/);
    apiClient
      .type('users')
      .get({ login: explorerQuery })
      .then(([userResponse]) => {
        const matchesUser = user.id === userResponse.id;
        this.setState({ explorer: userResponse, matchesUser });
      })
      .catch(() => console.warn('Failed to fetch explorer.'));
  }

  render() {
    return (
      <ExplorerContext.Provider
        value={{
          explorer: this.state.explorer,
          matchesUser: this.state.matchesUser
        }}
      >
        {this.props.children}
      </ExplorerContext.Provider>
    );
  }
}

ExplorerProvider.propTypes = {
  children: PropTypes.element.isRequired,
  organization: PropTypes.shape({
    id: PropTypes.string,
    slug: PropTypes.string
  }),
  user: PropTypes.shape({
    admin: PropTypes.bool,
    id: PropTypes.string,
    login: PropTypes.string
  })
};

ExplorerProvider.defaultProps = {
  organization: null,
  user: null
};
