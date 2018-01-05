import omit from 'lodash/omit';

import {
  CREATE_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  EDIT_NOTE,
  CREATE_NOTES,
} from './NoteActions';

const initialState = {};

const NoteReducer = (state = initialState, action) => {
  switch (action.type) {
    // case CREATE_NOTE:
    //   return [...state, action.note];
    //   // return { ...state, [action.note.id]: action.note }; // WHY same as below ??

    // case UPDATE_NOTE:
    //   return state.map((note) => {
    //     return note.id === action.id ? { ...note,
    //       ...action.note,
    //     } : note;
    //   });

    // case DELETE_NOTE:
    //   return state.filter((note) => note.id !== action.noteId);

    // case EDIT_NOTE:
    //   return state.map(note => (
    //     note.id !== action.noteId ?
    //     note :
    //     {
    //       ...note,
    //       editing: true,
    //     }
    //   ));

    // case CREATE_NOTES:
    //   return {
    //     ...action.notes,
    //   };

    case CREATE_NOTE:
      // return { ...state, [action.note.id]: action.note };
    case UPDATE_NOTE:
      return { ...state, [action.note.id]: action.note };

    case EDIT_NOTE: {
      const note = {
        ...state[action.noteId],
        editing: true };
      return {
        ...state,
        [action.noteId]: note };
    }
    case DELETE_NOTE:
      return omit(state, action.noteId);
    case CREATE_NOTES:
      return { ...action.notes };

    default:
      return state;
  }
};


export default NoteReducer;
