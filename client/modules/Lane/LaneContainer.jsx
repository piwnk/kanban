import { connect } from 'react-redux';


import Lane from './Lane';

// import * as laneActions from './LaneActions';
// import { createNote } from '../Note/NoteActions';

import { deleteLane, updateLane, editLane } from './LaneActions';
import { createNoteRequest } from '../Note/NoteActions';

const mapStateToProps = (state, ownProps) => ({
  lane: ownProps.lane.notes.map(noteId => state.notes.find(note => noteId === note.id)),
});

// const mapDispatchToProps = dispatch => ({
//   ...laneActions,
//   addNote: createNote,
// });

const mapDispatchToProps = {
  editLane,
  deleteLane,
  updateLane,
  addNote: createNoteRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Lane);
