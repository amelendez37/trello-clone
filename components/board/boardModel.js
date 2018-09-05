const mongoose = require('mongoose');
const ListSchema = require('../list/listModel');

const { Schema } = mongoose;

const BoardSchema = new Schema({
  boardName: { type: String, required: true },
  lists: [ListSchema],
});

mongoose.model('Board', BoardSchema);

module.exports = BoardSchema;
