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
    const explorerQuery = locationMatch(/\W?explorer_id=(\w+)/);
    if (user) {
      this.setExplorer(explorerQuery);
    }
  }

  componentDidUpdate(prevProps) {
    const { project, user } = this.props;
    if (prevProps.project !== project || prevProps.user !== user) {
      const explorerQuery = locationMatch(/\W?explorer_id=(\w+)/);
      this.setExplorer(explorerQuery);
    }
  }

  setExplorer(explorerQuery) {
    const { project, user } = this.props;
    if (explorerQuery && project) {
      this.checkPermission();
    } else if (user) {
      this.setState({ explorer: user, matchesUser: true });
    } else {
      this.setState({ explorer: null, matchesUser: false });
    }
  }

  async fetchAllRoles(project, roles = [], _page = 1) {
    return apiClient
      .type('project_roles')
      .get({ project_id: project.id, page: _page })
      .then(projRoles => {
        const meta = projRoles[0].getMeta();
        const newProjRoles = roles.concat(projRoles);

        if (meta.next_page) {
          return this.fetchAllRoles(project, newProjRoles, meta.next_page);
        }
        return newProjRoles;
      })
      .catch(error => console.error('Error loading roles.', error));
  }

  async checkPermission() {
    const { project, user } = this.props;

    if (user && user.admin === 'purple') {
      this.fetchExplorer();
    } else if (user) {
      const roles = await this.fetchAllRoles(project);
      const collaboratorRoles = roles.filter(
        role =>
          role.roles.includes('collaborator') || role.roles.includes('owner')
      );
      const isCollab = collaboratorRoles.some(
        role => role.links.owner.id === user.id
      );
      if (isCollab) {
        this.fetchExplorer();
      }
    }
  }

  fetchExplorer() {
    const explorerQuery = locationMatch(/\W?explorer_id=(\w+)/);
    apiClient
      .type('users')
      .get({ id: explorerQuery })
      .then(([userResponse]) => {
        const matchesUser = this.props.user.id === userResponse.id;
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
  project: PropTypes.shape({
    id: PropTypes.string,
    slug: PropTypes.string
  }),
  user: PropTypes.shape({
    login: PropTypes.string
  })
};

ExplorerProvider.defaultProps = {
  project: null,
  user: null
};
