const mongoose = require('mongoose');

const { Schema } = mongoose;

const ListItemSchema = new Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

mongoose.model('ListItem', ListItemSchema);

module.exports = ListItemSchema;
