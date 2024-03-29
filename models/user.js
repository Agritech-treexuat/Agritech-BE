const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: String,
  profile: {
    name: String,
    phone: String,
    email: String,
    birth: String,
    address: String,
  },
  password: String, // Thêm trường password
  history: [{
    qr_id: String,
    date: String,
  }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
