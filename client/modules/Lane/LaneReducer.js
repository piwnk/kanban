import {
  CREATE_LANE,
  CREATE_LANES,
  UPDATE_LANE,
  DELETE_LANE,
  EDIT_LANE,
  MOVE_BETWEEN_LANES,
} from './LaneActions';
import {
  CREATE_NOTE,
  DELETE_NOTE,
  MOVE_WITHIN_LANE,
} from '../Note/NoteActions';

import omit from 'lodash/omit';

const initialState = {};

const moveNotes = (array, sourceNoteId, targetNoteId) => {
  const sourceIndex = array.indexOf(sourceNoteId);
  const targetIndex = array.indexOf(targetNoteId);
  const arrayCopy = [...array];

  arrayCopy.splice(targetIndex, 0, arrayCopy.splice(sourceIndex, 1)[0]);
  return arrayCopy;
};

const LaneReducer = (state = initialState, action) => {
  let lane;
  switch (action.type) {

    case CREATE_LANE:
    case UPDATE_LANE:
      lane = {
        ...state[action.lane.id],
        ...action.lane,
      };
      return {
        ...state,
        [action.lane.id]: lane,
      };

    case EDIT_LANE:
      {
        lane = {
          ...state[action.laneId],
          editing: true,
        };
        return {
          ...state,
          [action.laneId]: lane,
        };
      }

    case CREATE_LANES:
      return { ...action.lanes,
      };
    case DELETE_NOTE:
      {
        const newLane = { ...state[action.laneId],
        };
        newLane.notes = newLane.notes.filter(noteId => noteId !== action.noteId);

        return { ...state,
          [action.laneId]: newLane,
        };
      }
    case CREATE_NOTE:
      {
        const newLane = { ...state[action.laneId],
        };
        newLane.notes = newLane.notes.concat(action.note.id);

        return { ...state,
          [action.laneId]: newLane,
        };
      }
    case DELETE_LANE:
      {
        return omit(state, action.laneId);
      }

    case MOVE_WITHIN_LANE:
      {
        const newLane = { ...state[action.laneId] };
        console.log(newLane);

        newLane.notes = moveNotes(newLane.notes, action.sourceId, action.targetId);
        // debugger;
        return { ...state, [action.laneId]: newLane };
      }

    case MOVE_BETWEEN_LANES:
      {
        const targetLane = { ...state[action.targetLaneId] };
        const sourceLane = { ...state[action.sourceLaneId] };

        targetLane.notes = [...targetLane.notes, action.noteId];
        sourceLane.notes = sourceLane.notes.filter(noteId => noteId !== action.noteId);

        return {
          ...state,
          [action.targetLaneId]: targetLane,
          [action.sourceLaneId]: sourceLane,
        };
      }

    default:
      return state;
  }
};

export default LaneReducer;
