import PropTypes from 'prop-types';
import React from 'react';
import Heading from 'grommet/components/Heading';
import styled from 'styled-components';

const StyledHeading = styled(Heading)`
  color: #5C5C5C;
  letter-spacing: -.5px;
  margin: 1em 0;
`;

export default function UserHeading({ user }) {
  const headingContent = (user && user.display_name) ? `${user.display_name}'s Field Book` : 'Your Field Book (please sign-in)';
  return (
    <StyledHeading strong tag="h2">{headingContent}</StyledHeading>
  );
}

UserHeading.propTypes = {
  user: PropTypes.shape({
    display_name: PropTypes.string,
  }),
};

UserHeading.defaultProps = {
  user: {
    display_name: '',
  },
};
