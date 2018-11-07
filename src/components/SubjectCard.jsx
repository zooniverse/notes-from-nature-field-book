import PropTypes from 'prop-types';
import React from 'react';
import Box from 'grommet/components/Box';
import { Thumbnail } from 'zooniverse-react-components';

import { config } from '../config';
import { ProjectContext } from '../context/ProjectContext';
import getSubjectLocations from '../lib/get-subject-locations';
import { FavoritesContext } from '../context/FavoritesContext';
import FavoritesButton from './FavoritesButton';

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

  const subjectId = subject.links.subject
    ? `/subjects/${subject.links.subject}`
    : subject.href;
  return (
    <ProjectContext.Consumer>
      {projectContext => (
        <Box alignSelf="center" className="subject-card" margin="small">
          <a
            href={`${config.zooniverse}/projects/${
              projectContext.project ? projectContext.project.slug : ''
            }/talk${subjectId}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Thumbnail
              alt={`Subject ${subject.links.subject}`}
              src={src}
              type={type}
              format={format}
              height={250}
              width={200}
            />
          </a>
          <Box direction="row" justify="center">
            <FavoritesContext.Consumer>
              {({ addSubjectTo, favorites, removeSubjectFrom }) => (
                <FavoritesButton
                  addSubjectTo={addSubjectTo}
                  favorites={favorites}
                  removeSubjectFrom={removeSubjectFrom}
                  subject={subject}
                />
              )}
            </FavoritesContext.Consumer>
          </Box>
        </Box>
      )}
    </ProjectContext.Consumer>
  );
}

SubjectCard.propTypes = {
  subject: PropTypes.shape({
    id: PropTypes.string
  }).isRequired
};
