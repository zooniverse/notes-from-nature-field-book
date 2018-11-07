import PropTypes from 'prop-types';
import React from 'react';
import Button from 'grommet/components/Button';

export default function FavoritesButton({
  addSubjectTo,
  favorites,
  removeSubjectFrom,
  subject
}) {
  const subjectId = subject.links.subject || subject.id;
  const favorited =
    favorites && favorites.links
      ? !!favorites.links.subjects.some(subj => subj === subjectId)
      : false;

  const favClassName = favorited ? 'fas fa-heart fa-fw' : 'far fa-heart fa-fw';

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
      <i className={favClassName} />
    </Button>
  );
}

FavoritesButton.defaultProps = {
  addSubjectTo: () => { },
  favorites: [],
  removeSubjectFrom: () => { }
};

FavoritesButton.propTypes = {
  addSubjectTo: PropTypes.func,
  favorites: PropTypes.shape({
    id: PropTypes.string
  }),
  removeSubjectFrom: PropTypes.func,
  subject: PropTypes.shape({
    id: PropTypes.string
  }).isRequired
};
