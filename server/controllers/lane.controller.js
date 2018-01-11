import uuid from 'uuid';

import Lane from '../models/lane';
import Note from '../models/note';

export function getSomething(req, res) {
  return res.status(200).end();
}

export const addLane = (req, res) => {
  if (!req.body.name) {
    res.status(403).end();
  }

  const newLane = new Lane(req.body);

  newLane.notes = [];

  newLane.id = uuid();

  newLane.save((err, saved) => {
    if (err) { res.status(500).send(err); }

    res.json(saved);
  });
};


export const getLane = (req, res) => {
  Lane.findOne({ id: req.params.laneId })
  .then(lane => res.json(lane))
  .catch(err => res.status(500).send(err));
};

export const getLanes = (req, res) => {
  Lane.find().exec((err, lanes) => {
    if (err) { res.status(500).send(err); }

    res.json({ lanes });
  });
};

export const deleteLane = (req, res) => {
  Lane.findOne({ id: req.params.laneId })
  .then(lane => {
    lane.notes.map(note => {
      Note.removeOne({
        id: note.id,
      })
      .catch(err => res.status(500).send(err))
      .then();
    });

    lane.remove()
    .then(() => res.status(200).end());
  });
};


export const updateLane = (req, res) => {
  const lane = req.body;

  Lane.findOne({ id: req.params.laneId })
  .then(found => {
    const laneUpdated = {
      ...found,
      ...lane,
    };
    Lane.updateOne(laneUpdated);
  })
  .then(() => res.status(200).end())
  .catch(err => res.status(500).send(err));
};
