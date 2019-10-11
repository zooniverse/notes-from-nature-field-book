import PropTypes from 'prop-types';
import React from 'react';
import Heading from 'grommet/components/Heading';

import { config } from '../config';

export default function UserHeading({ explorer, matchesUser, organization }) {
  if (explorer && organization) {
    const organizationLink = (
      <a
        href={
          organization.redirect
            ? organization.redirect
            : `${config.zooniverse}/organizations/${organization.slug}`
        }
      >
        {organization.display_name}
      </a>
    );

    const headingClassName = matchesUser
      ? 'user-heading'
      : 'user-heading user-heading--explorer';

    return (
      <Heading className={headingClassName} strong tag="h2">
        {`${explorer.display_name}'s `}
        {organizationLink}
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
  organization: PropTypes.shape({
    display_name: PropTypes.string,
    slug: PropTypes.string
  }),
  explorer: PropTypes.shape({
    display_name: PropTypes.string
  }),
  matchesUser: PropTypes.bool
};

UserHeading.defaultProps = {
  organization: {
    display_name: '',
    slug: ''
  },
  explorer: {
    display_name: ''
  },
  matchesUser: true
};
