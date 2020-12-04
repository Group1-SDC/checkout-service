/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const db = require('../database/index.js');

const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.use(compression());
app.use('/:id', express.static('public'));

app.get('/api/checkout/:id', (req, res) => {
  const { id } = req.params;
  console.log(`The request id is ${id}.`);
  db.Item.findOne({ id: [id] }).then((result) => {
    if (result) {
      res.send(result);
    } else {
      res.send(404);
    }
  }).catch((err) => console.error(err));
});

app.get('/', (req, res) => {
  res.redirect('localhost:3004/1/');
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
