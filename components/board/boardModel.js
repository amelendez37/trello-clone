const mongoose = require('mongoose');
const ListSchema = require('../list/listModel');

const { Schema } = mongoose;

const BoardSchema = new Schema({
  boardName: {
    type: String,
    required: true,
    maxlength: 20,
  },
  lists: [ListSchema],
});

mongoose.model('Board', BoardSchema);

module.exports = BoardSchema;
