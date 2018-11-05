import PropTypes from 'prop-types';
import React, { Component } from 'react';
import apiClient from 'panoptes-client/lib/api-client';

import { config } from '../config';

export const ProjectContext = React.createContext({
  id: config.projectId
});

export class ProjectProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialised: false,
      project: null
    };
  }

  componentDidMount() {
    if (!this.state.initialised) {
      apiClient
        .type('projects')
        .get(config.projectId)
        .then(project => this.setState({ initialised: true, project }));
    }
  }

  render() {
    return (
      <ProjectContext.Provider
        value={{
          initialised: this.state.initialised,
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
          <MyComponent
            {...props}
            initialised={projectState.initialised}
            project={projectState.project}
          />
        )}
      </ProjectContext.Consumer>
    );
  };
}
