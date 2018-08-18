const mongoose = require('mongoose');

const { Schema } = mongoose;

const ListItemSchema = new Schema({
  text: { type: String },
});

module.exports = ListItemSchema;
