require('newrelic');
const express = require('express');
const path = require('path');
const checkout = require('../database/index.js');

const app = express();
const PORT = 3000;

app.use('/', express.static('public'));

// Loader.io verification
app.get('/loaderio-d65024cc698be357259a8328ae84ca06.txt', (req, res) => {
  res.send('loaderio-d65024cc698be357259a8328ae84ca06');
});

app.use('/:id', express.static('public'));

app.get('/api/checkout/:id', (req, res) => {
  const { id } = req.params;

  const query = `SELECT items.id, items.category, items.name, items.base_price AS price, colors.color, items.heart, sizes.sizes 
                 FROM items, colors, sizes 
                 WHERE items.primary_color = colors.id
                 AND items.sizes = sizes.id
                 AND items.id=$1`;
  const values = [id];
  checkout.query(query, values, (err, data) => {
    if (err) {
      console.log('Failed to execute query with given values: ', err);
      res.sendStatus(500);
    } else {
      console.log('Query successful.');
      res.send(data);
    }
  });
});

// app.get('/', (req, res) => {
//   res.redirect('localhost:3004/1/');
// });

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
