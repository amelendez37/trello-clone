const mongoose = require('mongoose');
const ListItemSchema = require('../listItem/listItemModel');

const { Schema } = mongoose;

const ListSchema = new Schema({
  listName: { type: String },
  listItems: [ListItemSchema],
});

mongoose.model('List', ListSchema);

module.exports = ListSchema;
