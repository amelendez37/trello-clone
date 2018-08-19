const mongoose = require('mongoose');
const ListSchema = require('./listModel');

const { Schema } = mongoose;

const BoardSchema = new Schema({
  name: { type: String },
  lists: [ListSchema],
});

mongoose.model('Board', BoardSchema);
