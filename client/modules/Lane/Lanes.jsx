import React from 'react';
import PropTypes from 'prop-types';
import Lane from './LaneContainer';

const Lanes = ({ lanes }) => (
  <div className="lanes">
    {lanes.map(lane =>
      <Lane
        className="lane"
        key={lane.id}
        lane={lane}
      />
    )}
  </div>
);

Lanes.propTypes = {
  lanes: PropTypes.array,
};

export default Lanes;