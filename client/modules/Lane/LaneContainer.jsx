import { connect } from 'react-redux';


import Lane from './Lane';

import { updateLaneNameRequest, editLane, deleteLaneRequest } from './LaneActions';
import { createNoteRequest } from '../Note/NoteActions';

const mapStateToProps = (state, ownProps) => {
  return {
    laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId]), // .find(note => noteId === note.id)),
  };
};


const mapDispatchToProps = {
  editLane,
  deleteLane: deleteLaneRequest,
  updateLane: updateLaneNameRequest,
  addNote: createNoteRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Lane);
