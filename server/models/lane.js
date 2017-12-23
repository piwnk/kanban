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

laneSchema.pre('remove', function (next) {
  console.log(this);
  this.notes.map(item => {
    Note.findOne({
      id: item.id,
    })
    .exec((err, note) => {
      note.remove();
      console.log('Notes related removed');
    });
    next();
  });
});
export default mongoose.model('Lane', laneSchema);
