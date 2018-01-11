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
          lane.notes.push(saved);
          return lane.save();
        })
      .then(() => {
        res.json(saved);
      });
  });
};


export const updateNote = (req, res) => {
  const note = req.body;
  console.log(note);
  delete note._id;

  return (
    Note.findOneAndUpdate({ id: note.id }, { task: note.task })
    .then(() => {
      return res.status(200).end();
    })
    .catch(err => res.status(500).send(err))
  );
};


export const deleteNote = (req, res) => {
  const noteId = req.params.noteId;
  const laneId = req.body.laneId;

  console.log(`noteId: ${noteId}`);
  console.log(`laneId: ${laneId}`);
  // return Note.remove({
  //   id: noteId,
  // })

  // .then(Lane.findOne({ id: laneId })
  //   .then(lane => {
  //     const notes = lane.notes.filter(note => note.id !== noteId);
  //     return Lane.updateOne({
    //       id: laneId,
    //       notes,
    //     })
    //     .then(() => res.status(200).end())
    //     .catch(err => res.status(500).send(err));
    //   })
    // );
  return (
      Lane.findOne({ id: laneId })
      .then(lane => {
        const notes = lane.notes.filter(note => note.id !== noteId);
        Lane.updateOne({
          id: noteId,
          notes,
        })
        .catch(err => res.status(500).send(err))
        .then(() => {
          Note.remove({ id: noteId })
          .catch(err => res.status(500).send(err))
          .then(() => res.status(200).end());
        });
      })
      .catch(err => res.status(500).send(err))
    );
};
