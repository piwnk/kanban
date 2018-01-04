// import uuid from 'uuid';
import { normalize } from 'normalizr';

import callApi from '../../util/apiCaller';

import { lanes } from '../../util/schema'; // WHY not lanesSchema?


export const CREATE_LANES = 'CREATE_LANES';
export const CREATE_LANE = 'CREATE_LANE';
export const UPDATE_LANE = 'UPDATE_LANE';
export const DELETE_LANE = 'DELETE_LANE';
export const EDIT_LANE = 'EDIT_LANE';

import { createNotes } from '../Note/NoteActions';

export const createLanes = lanesData => ({
  type: CREATE_LANES,
  lanes: lanesData,
});

export const createLane = lane => ({
  type: CREATE_LANE,
  // lane: {
    // id: uuid(),
    // ...lane,
  // },
  lane,
});

export const createLaneRequest = lane => {
  // console.log(lane);
  return dispatch => {
    return callApi('lanes', 'post', lane)
  .then(res => { dispatch(createLane(res)); });
  };
};

// export function createLaneRequest(lane) {
//   return (dispatch) => {
//     return callApi('lanes', 'post', lane).then(res => {
//       dispatch(createLane(res));
//     });
//   };
// }

export const updateLane = lane => ({
  type: UPDATE_LANE,
  lane,
});

export const deleteLane = laneId => ({
  type: DELETE_LANE,
  laneId,
});

export const editLane = laneId => {
  // debugger;
  return {
    type: EDIT_LANE,
    laneId,
  };
};

export function fetchLanes() {
  return (dispatch) => {
    return callApi('lanes').then(res => {
      // if
      // console.log(res.name);
      // console.log(lanes);
      const normalized = normalize(res.lanes, lanes);
      console.log('Normalized');
      console.log(normalized);
      const { lanes: normalizedLanes, notes } = normalized.entities;

      console.log('Notes:');
      console.log(notes);

      dispatch(createLanes(normalizedLanes));
      dispatch(createNotes(notes));
    })
    .catch(err => console.log(err));
  };
}
