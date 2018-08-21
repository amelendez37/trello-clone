const mongoose = require('mongoose');
const ListItemSchema = require('../listItem/listItemModel');

const { Schema } = mongoose;

const ListSchema = new Schema({
  name: { type: String },
  listItems: [ListItemSchema],
});

// module.exports = ListSchema;
mongoose.model('List', ListSchema);

module.exports = ListSchema;
