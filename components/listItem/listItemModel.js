const mongoose = require('mongoose');

const { Schema } = mongoose;

const ListItemSchema = new Schema({
  text: { type: String },
  completed: { type: Boolean },
});

mongoose.model('ListItem', ListItemSchema);

module.exports = ListItemSchema;
