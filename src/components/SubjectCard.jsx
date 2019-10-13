import PropTypes from 'prop-types';
import React from 'react';
import Box from 'grommet/components/Box';
import { Thumbnail } from 'zooniverse-react-components';

import { config } from '../config';
import { ExplorerContext } from '../context/ExplorerContext';
import { FavoritesContext } from '../context/FavoritesContext';
import getSubjectLocations from '../lib/get-subject-locations';
import FavoritesButton from './FavoritesButton';

export default function SubjectCard({ project, subject }) {
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
    <Box alignSelf="center" className="subject-card" margin="small">
      <a
        href={`${config.zooniverse}/projects/${project.slug}/talk${subjectId}`}
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
        <ExplorerContext.Consumer>
          {({ matchesUser }) => (
            <div>
              {matchesUser ? (
                <FavoritesContext.Consumer>
                  {({ addSubjectTo, linkedSubjects, removeSubjectFrom }) => (
                    <FavoritesButton
                      addSubjectTo={addSubjectTo}
                      linkedSubjects={linkedSubjects}
                      matchesUser={matchesUser}
                      removeSubjectFrom={removeSubjectFrom}
                      subject={subject}
                    />
                  )}
                </FavoritesContext.Consumer>
              ) : null}
            </div>
          )}
        </ExplorerContext.Consumer>
      </Box>
    </Box>
  );
}

SubjectCard.propTypes = {
  project: PropTypes.shape({
    slug: PropTypes.string
  }).isRequired,
  subject: PropTypes.shape({
    id: PropTypes.string,
    links: PropTypes.shape({
      subject: PropTypes.string
    })
  }).isRequired
};
