import PropTypes from 'prop-types';
import React from 'react';
import Heading from 'grommet/components/Heading';

import { config } from '../config';

export default function UserHeading({ project, user }) {
  if (user && project) {
    const projectLink = (
      <a href={`${config.zooniverse}/projects/${project.slug}`}>
        {project.display_name}
      </a>
    );

    return (
      <Heading className="user-heading" strong tag="h2">
        {`${user.display_name}'s `}
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

UserHeading.propTypes = {
  project: PropTypes.shape({
    display_name: PropTypes.string,
    slug: PropTypes.string
  }),
  user: PropTypes.shape({
    display_name: PropTypes.string
  })
};

UserHeading.defaultProps = {
  project: {
    display_name: '',
    slug: ''
  },
  user: {
    display_name: ''
  }
};
