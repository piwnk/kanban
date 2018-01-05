import { connect } from 'react-redux';

import Notes from './Notes';

import * as noteActions from './NoteActions';

// WHY not component body

// WHY as object in instruction (arrow in Lane part)
const mapDispatchToProps = {
  deleteNote: noteActions.deleteNoteRequest,
  editNote: noteActions.editNote,
  // ...noteActions,
};

export default connect(null, mapDispatchToProps)(Notes);
