import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


import Lanes from '../Lane/Lanes';
import Header from '../Header/Header';

import styles from './Kanban.css';

import { createLaneRequest, fetchLanes } from '../Lane/LaneActions';

const Kanban = (props) => (
  <div className={styles.Kanban}>
    <Header />
    <Lanes lanes={props.lanes} />
    <div className={styles.AddLaneBtn}>
      <button
        onClick={() => props.createLane({
          name: 'Lane... ',
        })}
      >
        <i className="fa fa-plus" />
        {/* <p>Add column...</p> */}
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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DragDropContext(HTML5Backend)
)(Kanban);
