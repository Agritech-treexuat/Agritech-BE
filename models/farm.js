const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  vietgap: [String],
  images: [String],
  square: Number,
});

const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;
