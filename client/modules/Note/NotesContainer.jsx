import { connect } from 'react-redux';

import Notes from './Notes';

import { deleteNoteRequest, editNote, updateNoteRequest, moveWithinLane } from '../Note/NoteActions';


// WHY not component body

// WHY as object in instruction (arrow in Lane part)
const mapDispatchToProps = {
  deleteNote: deleteNoteRequest,
  editNote,
  updateNote: updateNoteRequest,
  moveWithinLane,
  // ...noteActions,
};

export default connect(null, mapDispatchToProps)(Notes);
