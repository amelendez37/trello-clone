const mongoose = require('mongoose');
const ListItemSchema = require('../board/boardModel');

const { Schema } = mongoose;

const ListSchema = new Schema({
  name: { type: String },
  listItems: [ListItemSchema],
});

module.exports = ListSchema;
