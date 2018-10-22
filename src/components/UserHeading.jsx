import PropTypes from 'prop-types';
import React from 'react';
import Heading from 'grommet/components/Heading';

export default function UserHeading({ user }) {
  const headingContent =
    user && user.display_name
      ? `${user.display_name}'s Field Book`
      : 'Your Field Book (please sign-in)';
  return (
    <Heading className="user-heading" strong tag="h2">
      {headingContent}
    </Heading>
  );
}

UserHeading.propTypes = {
  user: PropTypes.shape({
    display_name: PropTypes.string
  })
};

UserHeading.defaultProps = {
  user: {
    display_name: ''
  }
};
