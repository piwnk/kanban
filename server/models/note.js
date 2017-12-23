import mongoose from 'mongoose';
const Schema = mongoose.Schema;

import Lane from '../models/lane';

const noteSchema = new Schema({
  task: {
    type: 'String',
    required: true,
  },
  id: {
    type: 'String',
    required: true,
    unique: true,
  },
});


export default mongoose.model('Note', noteSchema);
