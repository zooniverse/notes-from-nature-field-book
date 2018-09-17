import React from 'react';

export default function Heading({ user }) {
  const displayName = user ? user.display_name : 'none';
  const headingContent = `${displayName}'s Notes from Nature Field Book`;
  return (
    <h1>{headingContent}</h1>
  );
}
