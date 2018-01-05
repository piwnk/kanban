import React from 'react';
import PropTypes from 'prop-types';

import Note from './Note';
import Edit from '../Edit/Edit';

import styles from './Note.css';

const Notes = ({ notes, laneId, editNote, updateNote, deleteNote }) => {
  // debugger;
  return (
    <ul className={styles.Notes}>
      {notes.map((note) =>
        <Note
          id={note.id}
          key={note.id}
          // editing={note.editing} // WHY here (not in lanes)?
        >
          <Edit
            editing={note.editing} // WHY see above
            value={note.task}
            onValueClick={() => editNote(note.id)}
            onDelete={() => deleteNote(note.id, laneId)}
            onUpdate={task => updateNote({
              ...note,
              task,
              editing: false,
            })}
          />
        </Note>
      )}
    </ul>
  );
};

Notes.propTypes = {
  deleteNote: PropTypes.func,
  updateNote: PropTypes.func,
  laneId: PropTypes.string,
  editNote: PropTypes.func,
  notes: PropTypes.array,
};

export default Notes;
