import PropTypes from 'prop-types';
import React, { Component } from 'react';
import apiClient from 'panoptes-client/lib/api-client';

import { config } from '../config';

export const ProjectsContext = React.createContext();

export class ProjectsProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organization: null,
      projects: null
    };
  }

  componentDidMount() {
    apiClient
      .type('organizations')
      .get({ id: config.organizationId })
      .then(([organization]) => {
        this.setState({ organization });
        organization
          .get('projects', { cards: true })
          .then(organizationProjects => {
            this.setState({ projects: organizationProjects });
          });
      });
  }

  render() {
    return (
      <ProjectsContext.Provider
        value={{
          organization: this.state.organization,
          projects: this.state.projects
        }}
      >
        {this.props.children}
      </ProjectsContext.Provider>
    );
  }
}

ProjectsProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export function withProjects(MyComponent) {
  return function ProjectsComponent(props) {
    return (
      <ProjectsContext.Consumer>
        {projectsState => (
          <MyComponent {...props} projects={projectsState.projects} />
        )}
      </ProjectsContext.Consumer>
    );
  };
}
