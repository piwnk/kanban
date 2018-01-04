import uuid from 'uuid';

import Lane from '../models/lane';
import Note from '../models/note';

export const addNote = (req, res) => {
  const {
    note,
    laneId,
  } = req.body;

  console.log('Body:');
  console.log(req.body);

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
          lane.notes.push(saved);
          return lane.save();
        })
      .then(() => {
        res.json(saved);
      });
  });
};


export const updateNote = (req, res) => {
  const { task } = req.body;

  Note.findOne({
    id: req.params.noteId,
  })
  .then(note => {
      // ESLINT spread INSTEAD?
      // const updatedNote = {
      //   ...note,
      //   task,
      // };
    note.task = task;
    return note.save();
  })
  .then(() => res.status(200).end());
};


export const deleteNote = (req, res) => {
  Note.findOne({
    id: req.params.noteId,
  })
  .exec((err, note) => {
    if (err || !note) { res.status(500).send(err); }

    note.remove(() => {
      res.status(200).end();
    });
  });
};
