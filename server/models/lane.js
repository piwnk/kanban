import mongoose from 'mongoose';

import Note from './note';

const Schema = mongoose.Schema;

const laneSchema = new Schema({
  name: {
    type: 'String',
    required: true,
  },
  notes: [{
    type: Schema.ObjectId,
    ref: 'Note',
    required: true,
  }],
  id: {
    type: 'String',
    required: true,
    unique: true,
  },
});


function populateNotes(next) {
  this.populate('notes');
  next();
}


laneSchema.pre('find', populateNotes);
laneSchema.pre('findOne', populateNotes);

// laneSchema.pre('remove', function (next) {
//   this.notes.map(note => {
//     Note.findOne({
//       id: note.id,
//     })
//     .exec((noteErr, noteFound) => {
//       console.log(noteFound);
//       noteFound.remove(() => {
//         console.log('Notes related removed');
//       });
//     });
//     next();
//   });
// });

export default mongoose.model('Lane', laneSchema);
