import PropTypes from 'prop-types';
import React from 'react';
import Heading from 'grommet/components/Heading';

import { config } from '../config';

export default function UserHeading({ project, explorer, matchesUser }) {
  if (explorer && project) {
    const projectLink = (
      <a
        href={
          project.redirect
            ? project.redirect
            : `${config.zooniverse}/projects/${project.slug}`
        }
      >
        {project.display_name}
      </a>
    );

    const headingClassName = matchesUser
      ? 'user-heading'
      : 'user-heading user-heading--explorer';

    return (
      <Heading className={headingClassName} strong tag="h2">
        {`${explorer.display_name}'s `}
        {projectLink}
        {' Field Book'}
      </Heading>
    );
  }
  return (
    <Heading className="user-heading" strong tag="h2">
      Your Field Book (please sign-in)
    </Heading>
  );
}

UserHeading.defaultProps = {
  project: {
    display_name: '',
    redirect: '',
    slug: ''
  },
  explorer: {
    display_name: ''
  },
  matchesUser: true
};

UserHeading.propTypes = {
  project: PropTypes.shape({
    display_name: PropTypes.string,
    redirect: PropTypes.string,
    slug: PropTypes.string
  }),
  explorer: PropTypes.shape({
    display_name: PropTypes.string
  }),
  matchesUser: PropTypes.bool
};
