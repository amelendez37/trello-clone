const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/public')));

app.get('/', (req, res) => res.send('hello from server'));

app.listen(port, () => console.log(`Listening on port ${port}`));
