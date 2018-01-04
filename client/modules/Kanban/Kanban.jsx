import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Lanes from '../Lane/Lanes';

import styles from './Kanban.css';

import { createLaneRequest, fetchLanes } from '../Lane/LaneActions';

const Kanban = (props) => (
  <div className={styles.Kanban}>
    <Lanes lanes={props.lanes} />
    <div className={styles.AddLaneBtn}>
      <button
        onClick={() => props.createLane({
          name: 'New lane',
        })}
      >
        <i className="fa fa-plus" />
      </button>
    </div>
  </div>
);

Kanban.need = [() => { return fetchLanes(); }]; // WHY instructions SUCK (end of 23.5).

Kanban.propTypes = {
  lanes: PropTypes.array,
  createLane: PropTypes.func,
};

const mapStateToProps = state => ({
  lanes: Object.values(state.lanes),
});

const mapDispatchToProps = {
  createLane: createLaneRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Kanban);
