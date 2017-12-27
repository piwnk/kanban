import {
  CREATE_LANE,
  CREATE_LANES,
  UPDATE_LANE,
  DELETE_LANE,
  EDIT_LANE,
} from './LaneActions';
import {
  CREATE_NOTE,
  DELETE_NOTE,
} from '../Note/NoteActions';

import omit from 'lodash/omit';

// const initialState = [];
const initialState = {};

const LaneReducer = (state = initialState, action) => {
  switch (action.type) {

    // case CREATE_LANE:
    //   return [...state, action.lane];
    // WHY "23.6 (Dostosowanie reducerów) returns { ...state, [action.lane.id]: action.lane };
    // "Jak widzisz, zmieniło się dosyć sporo. Zacznijmy od tego, że zamiast zwykłej tablicy wykorzystujemy teraz słownik, a reprezentacja stanu linii będzie więc teraz obiektem, nie tablicą.
    // "Jak widzisz dopisałem też fragmenty kodu odpowiedzialne za edycje linii - być może u Ciebie wyglądają inaczej - ważne żeby działały.
    // Jak mają niby działać skoro napisane są pod tablice???
    // Nie można było tak od razu? Czemu każecie dopisać swój kod wg pierwotnego założenia a potem zmieniacie koncepcję pod koniec ćwiczenia?
    // Jestem pewien, że każdy kursant w tym momencie robi kopiuj/wklej, a chyba nie o to chodziło.
    // To ćwieczenie jak wiele innych jest bez sensu, więcej przepisywania bez możliwości sprawdzenia czy działa czy nie w krokach pośrednich.
    // A potem na koniec dochodź co jest nie tak po napisaniu 200 linijek kodu w 10ciu plikach.
    // W produkcji chyba się tak nie robi, że pisze się kod przez godzinę z nadzieją, że zadziała.


    // I co to w ogóle za zapis? { ...state, [action.lane.id]: action.lane }

    //     case UPDATE_LANE:
    //       return state.map(lane => {
    //         return lane.id === action.id
    //           ? { ...lane, ...action.lane }
    //           : lane;
    //       });

    //     case DELETE_LANE:
    //       return state.filter(lane => lane.id !== action.laneId);

    //     case EDIT_LANE:
    //       return state.map(lane => (
    //         lane.id !== action.laneId
    //         ? lane
    //         : {
    //           ...lane,
    //           editing: true,
    //         }
    //       ));

    //     case CREATE_NOTE:
    //       return state.map(lane => {
    //         if (lane.id === action.laneId) {
    //           const notes = [...lane.notes, action.note.id];
    //           return { ...lane, notes };
    //         }
    //         return lane;
    //       });

    //     case DELETE_NOTE:
    //       return state.map((lane) => {
    //         if (lane.id === action.laneId) {
    //           const notes = lane.notes.filter(note => note.id !== action.noteId);
    //           return { ...lane, notes };
    //         }
    //       });

    case CREATE_LANE:
      // return { ...state,
      //   [action.lane.id]: action.lane,
      // };
    case UPDATE_LANE:
      return { ...state,
        [action.lane.id]: action.lane,
      };

    case EDIT_LANE:
      {
        const lane = { ...state[action.id],
          editing: true,
        };
        return { ...state,
          [action.id]: lane,
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


    default:
      return state;
  }
};

export default LaneReducer;
