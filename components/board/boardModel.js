const mongoose = require('mongoose');
const ListSchema = require('../list/listModel');

const { Schema, model } = mongoose;

const BoardSchema = new Schema({
  name: { type: String },
  lists: [ListSchema],
});

model('Board', BoardSchema);
