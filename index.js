require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const { mongoUrl, serverPort } = require('./config/config');
const logger = require('./config/logger');

// models
require('./components/board/boardModel');
require('./components/list/listModel');
require('./components/listItem/listItemModel');
require('./components/group/groupModel');
const routes = require('./components');

mongoose.connect(mongoUrl, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', () => logger.error('Error connecting to mongoDB'));
db.once('open', () => logger.info('Successfully connected to mongoDB'));

const app = express();
const port = serverPort || 3000;

// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './client/public')));
app.use('/api', routes);

const server = app.listen(port, () => logger.info(`Listening on port ${port}`));

module.exports = { server, db };
