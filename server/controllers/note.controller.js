import uuid from 'uuid';

import Lane from '../models/lane';
import Note from '../models/note';

export const addNote = (req, res) => {
  const { note, laneId } = req.body;

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

  return (
  Lane.findOne({ id: laneId })
    .then(lane => {
      const notes = lane.notes.filter(note => note.id !== noteId);
      Lane.updateOne({
        id: laneId,
        notes })
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

export const moveNote = (req, res) => {
  const { noteId, sourceLaneId, targetLaneId } = req.body;
  return Lane.findOne({ id: sourceLaneId })
    .catch(err => res.status(500).send(err))
    .then(sourceLane => {
      const note = sourceLane.notes.find(item => item.id === noteId);
      const sourceNotes = sourceLane.notes.filter(item => item.id !== noteId);

      return Lane.updateOne({
        id: sourceLaneId,
        notes: sourceNotes,
      }, () => console.log('source updated'))
      .catch(err => res.status(500).send(err))
      .then(
        Lane.findOne({ id: targetLaneId })
        .catch(err => res.status(500).send(err))
        .then(targetLane => {
          const targetNotes = [...targetLane.notes, note];
          console.log(targetLane.notes);
          console.log(targetNotes);
          return Lane.updateOne({
            id: targetLaneId,
            notes: targetNotes,
          }, () => console.log('target updated'))
          .catch(err => res.status(500).send(err))
          .then(() => res.status(200).end());
        })
      );
    });
};
