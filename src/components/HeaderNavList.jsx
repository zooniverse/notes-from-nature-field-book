import React from 'react';
import Anchor from 'grommet/components/Anchor';

import { config } from '../config';
import { ProjectContext } from '../context/ProjectContext';

const headerNavList = [
  <Anchor
    key="Header-Projects"
    className="zoo-header__link--small"
    href={`${config.zooniverse}/projects`}
    label="Projects"
  />,
  <Anchor
    key="Header-About"
    className="zoo-header__link--small"
    href={`${config.zooniverse}/about`}
    label="About"
  />,
  <Anchor
    key="Header-Get Involved"
    className="zoo-header__link--small"
    href={`${config.zooniverse}/get-involved`}
    label="Get Involved"
  />,
  <Anchor
    key="Header-Talk"
    className="zoo-header__link--small"
    href={`${config.zooniverse}/talk`}
    label="Talk"
  />,
  <Anchor
    key="Header-Build A Project"
    className="zoo-header__link--small"
    href={`${config.zooniverse}/lab`}
    label="Build A Project"
  />,
  <ProjectContext.Consumer key="Header-Stats">
    {projectContext => (
      <Anchor
        key="Header-Stats-Anchor"
        className="zoo-header__link--small"
        href={`${config.zooniverse}/projects/${
          projectContext.project ? projectContext.project.slug : ''
        }/stats`}
        label="Stats"
      />
    )}
  </ProjectContext.Consumer>
];

export default headerNavList;
