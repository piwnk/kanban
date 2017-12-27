import React from 'react';
import PropTypes from 'prop-types';

import Note from './Note';
import Edit from '../../components/Edit/Edit';

const Notes = ({ notes, laneId, editNote, onUpdate, deleteNote }) => (
  <ul className="notes">{notes.map((note) =>
    <Note
      id={note.id}
      key={note.id}
      editing={note.editing} // WHY here (not in lanes)?
    >
      {/* {note.task} */}
      <Edit
        editing={note.editing} // WHY see above
        value={note.task}
        onValueClick={() => editNote(note.id)}
        onDelete={() => deleteNote(note.id, laneId)}
        onUpdate={task => onUpdate({
          ...note,
          task,
          editing: false,
        })}
      />
    </Note>
  )}
  </ul>
);

Notes.propTypes = {
  deleteNote: PropTypes.func,
  onUpdate: PropTypes.func,
  laneId: PropTypes.string,
  editNote: PropTypes.func,
  notes: PropTypes.array,
};

export default Notes;
