// Refactored PostgreSQL connection
const { Pool } = require('pg');

const checkout = new Pool({
  database: 'checkout',
});

module.exports = checkout;

// Inherited MongoDB connection
/* const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/items', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const itemSchema = mongoose.Schema({
  id: Number,
  category: String,
  name: String,
  price: Number,
  heart: Boolean,
  sizes: Array,
  color: String,
});

const Item = mongoose.model('Item', itemSchema);

module.exports.Item = Item; */
