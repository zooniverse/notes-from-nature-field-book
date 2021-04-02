import PropTypes from 'prop-types';
import React from 'react';
import Button from 'grommet/components/Button';
import FavoriteIcon from 'grommet/components/icons/base/Favorite';

export default function FavoritesButton({
  addSubjectTo,
  linkedSubjects,
  removeSubjectFrom,
  subject
}) {
  const subjectId = subject.links.subject || subject.id;
  const favorited =
    linkedSubjects && linkedSubjects.length
      ? !!linkedSubjects.some(subj => subj === subjectId)
      : false;

  const favClassName = favorited ? 'favorite__solid' : 'favorite__regular';

  return (
    <Button
      onClick={() => {
        if (favorited) {
          removeSubjectFrom(subjectId);
        } else {
          addSubjectTo(subjectId);
        }
      }}
      type="button"
    >
      <FavoriteIcon className={favClassName} />
    </Button>
  );
}

FavoritesButton.defaultProps = {
  addSubjectTo: () => {},
  linkedSubjects: [],
  removeSubjectFrom: () => {}
};

FavoritesButton.propTypes = {
  addSubjectTo: PropTypes.func,
  linkedSubjects: PropTypes.arrayOf(PropTypes.string),
  removeSubjectFrom: PropTypes.func,
  subject: PropTypes.shape({
    id: PropTypes.string,
    links: PropTypes.shape({
      subject: PropTypes.string
    })
  }).isRequired
};
