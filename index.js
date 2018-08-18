require('dotenv').config();

const express = require('express');
const path = require('path');
const config = require('./config/config');
const logger = require('./config/components/logger');

const app = express();
const port = config.server.port || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, './client/public')));

app.listen(port, () => console.log(`Listening on port ${port}`));
