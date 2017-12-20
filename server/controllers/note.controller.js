import uuid from 'uuid';

import Lane from '../models/lane';
import Note from '../models/note';

export const addNote = (req, res) => {
  console.log(req.body);
  const { note, laneId } = req.body;

  if (!note || !note.task || !laneId) {
    res.status(400).end();
  }

  const newNote = new Note({
    task: note.task,
  });

  newNote.id = uuid();
  newNote.save((err, saved) => {
    if (err) { res.status(500).send(err); }

    Lane.findOne({ id: laneId })
      .then(
        lane => {
          lane.notes.push(saved);
          return lane.save(); // WHY return
        })
        .then(() => {
          res.json(saved);
        }
        );
  });
};
