require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config/config');
const { mongoUrl } = require('./config/config');
const logger = require('./config/logger');

// only board model needed due to embedded schema
require('./components/board/boardModel');

mongoose.connect(mongoUrl);

const db = mongoose.connection;

db.on('error', logger.error('Error connecting to mongoDB'));
db.once('open', logger.info('Successfully connected to mongoDB'));

const app = express();
const port = config.serverPort || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, './client/public')));

app.listen(port, () => console.log(`Listening on port ${port}`));
