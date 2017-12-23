import uuid from 'uuid';

import Lane from '../models/lane';
import Note from '../models/note';

export const addNote = (req, res) => {
  const {
    note,
    laneId,
  } = req.body;

  if (!note || !note.task || !laneId) {
    res.status(400).end();
  }

  const newNote = new Note({
    task: note.task,
  });

  newNote.id = uuid();
  newNote.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }

    Lane.findOne({
      id: laneId,
    })
      .then(
        lane => {
          console.log(saved);
          lane.notes.push(saved);
          return lane.save(); // WHY return
        })
      .then(() => {
        res.json(saved);
      });
  });
};

export const deleteNote = (req, res) => {
  Note.findOne({
    id: req.params.noteId,
  })
  .exec((err, note) => {
    if (err || !note) {
      res.status(500).send(err);
    }
    note.remove(() => {
      res.status(200).end();
    });
  });
};
