import { connect } from 'react-redux';


import Lane from './Lane';

// import * as laneActions from './LaneActions';
// import { createNote } from '../Note/NoteActions';

import { deleteLane, updateLane, editLane } from './LaneActions';
import { createNoteRequest } from '../Note/NoteActions';

const mapStateToProps = (state, ownProps) => {
  // console.log(state);
  // console.log(ownProps);
  return {
    laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId]), // .find(note => noteId === note.id)),
  };
};


const mapDispatchToProps = {
  editLane,
  deleteLane,
  updateLane,
  addNote: createNoteRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Lane);
