import PropTypes from 'prop-types';
import React from 'react';
import Heading from 'grommet/components/Heading';

export default function Title({ children }) {
  return (
    <Heading className="title" strong tag="h5" uppercase>
      {children}
    </Heading>
  );
}

Title.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired
};
