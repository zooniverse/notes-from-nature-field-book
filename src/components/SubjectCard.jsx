import PropTypes from 'prop-types';
import React from 'react';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import { Thumbnail } from 'zooniverse-react-components';
import getSubjectLocations from '../lib/get-subject-locations';

export default function SubjectCard({ subject }) {
  const locations = getSubjectLocations(subject);
  let type = '';
  let format = '';
  let src = '';
  if (locations.image) {
    type = 'image';
    [format, src] = locations.image;
  } else if (locations.video) {
    type = 'video';
    [format, src] = locations.video;
  }
  return (
    <Box alignSelf="end" className="subject-card" margin="small">
      <Thumbnail
        alt={`Subject ${subject.links.subject}`}
        src={src}
        type={type}
        format={format}
        height={250}
        width={200}
      />
      <Box direction="row" justify="center">
        <Button type="button">
          <i className="fa fa-heart fa-fw" />
        </Button>
        <Button type="button">
          <i className="fa fa-list fa-fw" />
        </Button>
      </Box>
    </Box>
  );
}

SubjectCard.propTypes = {
  subject: PropTypes.shape({
    id: PropTypes.string
  }).isRequired
};
