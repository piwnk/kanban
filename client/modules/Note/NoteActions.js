// import uuid from 'uuid';
import callApi from '../../util/apiCaller';


export const CREATE_NOTE = 'CREATE_NOTE';
export const CREATE_NOTES = 'CREATE_NOTES';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';

export const createNote = (note, laneId) => ({
  type: CREATE_NOTE,
  note,
  laneId,
});

export const createNoteRequest = (note, laneId) => {
  return (dispatch) => {
    return callApi('notes', 'post', {
      note,
      laneId,
    })
      .then(noteResp => {
        dispatch(createNote(noteResp, laneId));
      });
  };
};

export const createNotes = notesData => ({
  type: CREATE_NOTES,
  notes: notesData,
});

export const updateNote = note => ({
  type: UPDATE_NOTE,
  note,
});

export const updateNoteRequest = note => (
  dispatch => {
    return callApi('notes', 'put', note)
    .catch(err => console.log(err))
    .then(dispatch(updateNote(note)));
  }
);

export const deleteNote = (noteId, laneId) => ({
  type: DELETE_NOTE,
  noteId,
  laneId,
});

export const deleteNoteRequest = (noteId, laneId) => dispatch => {
  return (
    callApi(`notes/${noteId}`, 'delete', { laneId })
    .catch(err => console.log(err))
    .then(dispatch(deleteNote(noteId, laneId)))
  );
};

export const editNote = noteId => ({
  type: EDIT_NOTE,
  noteId,
});
