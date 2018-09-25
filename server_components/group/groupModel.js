const mongoose = require('mongoose');
const BoardSchema = require('../board/boardModel');

const { Schema } = mongoose;

const GroupSchema = new Schema({
  groupName: { type: String, required: true },
  boards: [BoardSchema],
});

mongoose.model('Group', GroupSchema);

module.exports = GroupSchema;
