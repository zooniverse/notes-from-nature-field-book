import PropTypes from 'prop-types';
import React, { Component } from 'react';
import apiClient from 'panoptes-client/lib/api-client';

import { config } from '../config';

export const ProjectContext = React.createContext();

export class ProjectProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null
    };
  }

  componentDidMount() {
    apiClient
      .type('projects')
      .get(config.projectId)
      .then(project => this.setState({ project }));
  }

  render() {
    return (
      <ProjectContext.Provider
        value={{
          project: this.state.project
        }}
      >
        {this.props.children}
      </ProjectContext.Provider>
    );
  }
}

ProjectProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export function withProject(MyComponent) {
  return function ProjectComponent(props) {
    return (
      <ProjectContext.Consumer>
        {projectState => (
          <MyComponent {...props} project={projectState.project} />
        )}
      </ProjectContext.Consumer>
    );
  };
}
