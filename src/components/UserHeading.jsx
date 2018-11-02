import PropTypes from 'prop-types';
import React from 'react';
import Heading from 'grommet/components/Heading';

export default function UserHeading({ project, user }) {
  const headingContent =
    user && user.display_name && project && project.display_name
      ? `${user.display_name}'s ${project.display_name} Field Book`
      : 'Your Field Book (please sign-in)';
  return (
    <Heading className="user-heading" strong tag="h2">
      {headingContent}
    </Heading>
  );
}

UserHeading.propTypes = {
  project: PropTypes.shape({
    display_name: PropTypes.string
  }),
  user: PropTypes.shape({
    display_name: PropTypes.string
  })
};

UserHeading.defaultProps = {
  project: {
    display_name: ''
  },
  user: {
    display_name: ''
  }
};
