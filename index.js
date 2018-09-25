require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const { mongoUrl, serverPort } = require('./config/config');
const logger = require('./config/logger');

// models
require('./server_components/board/boardModel');
require('./server_components/list/listModel');
require('./server_components/listItem/listItemModel');
require('./server_components/group/groupModel');
const routes = require('./server_components');

mongoose.connect(mongoUrl, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', () => logger.error('Error connecting to mongoDB'));
db.once('open', () => logger.info('Successfully connected to mongoDB'));

const app = express();
const port = serverPort || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './client/public')));
app.use('/api', routes);

const server = app.listen(port, () => logger.info(`Listening on port ${port}`));

module.exports = { server, db };
