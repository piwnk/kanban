import React from 'react';
import PropTypes from 'prop-types';

import NotesContainer from '../Note/NotesContainer';
import Edit from '../Edit/Edit';

import styles from './Lane.css';

const Lane = ({ lane, laneNotes, updateLane, addNote, deleteLane, editLane }) => {
  const laneId = lane.id;
  return (
    <div className={styles.Lane}>
      <div className={styles.LaneHeader}>
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
        <div className={styles.DeleteLaneBtn}>
          <button
            onClick={() => deleteLane(laneId)}
          >
            <i className="fa fa-remove" />
          </button>
        </div>
      </div>
      <NotesContainer
        notes={laneNotes}
        laneId={laneId}
      />
      <div className={styles.LaneAddNote}>
        <button
          onClick={() => addNote(
            { task: 'New Note' },
            laneId)}
        >
          <i className="fa fa-plus" /> Add note...
        </button>
      </div>
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
