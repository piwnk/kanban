import React from 'react';
import PropTypes from 'prop-types';

import NotesContainer from '../Note/NoteContainer';
import Edit from '../../components/Edit/Edit';

import styles from './Lane.css';

const Lane = ({ lane, laneNotes, updateLane, addNote, deleteLane, editLane }) => {
  const laneId = lane.id;
  return (
    <div className={styles.Lane}>
      <div className={styles.LaneHeader}>
        <div className={styles.LaneAddNote}>
          <button
            onClick={() => addNote(
              { task: 'New Note' },
              laneId)}
          >Add Note</button>
        </div>
        {/* <h4>{lane.name}</h4> */}
        <Edit
          className={styles.LaneName}
          editing={lane.editing}
          value={lane.name}
          onValueClick={() => editLane(lane.id)} // TODO
          onUpdate={name => updateLane({
            ...lane,
            name,
            editing: false,
          })}
        />
        <div className={styles.LaneDelete}>
          <button
            onClick={() => deleteLane(laneId)}
          >Remove Lane</button>
        </div>
      </div>
      <NotesContainer
        notes={laneNotes}
        laneId={laneId}
      />
    </div>
  );
};

Lane.propTypes = {
  lane: PropTypes.object,
  laneNotes: PropTypes.array,
  addNote: PropTypes.func,
  updateLane: PropTypes.func,
  deleteLane: PropTypes.func,
  editLane: PropTypes.func,
};

export default Lane;
