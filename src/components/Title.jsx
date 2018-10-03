import PropTypes from 'prop-types';
import React from 'react';
import Heading from 'grommet/components/Heading';
import styled from 'styled-components';

const StyledTitle = styled(Heading)`
  letter-spacing: 1.5px;
`;

export default function Title({ children }) {
  return (
    <StyledTitle strong tag="h5" uppercase>
      {children}
    </StyledTitle>
  );
}

Title.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired
};
