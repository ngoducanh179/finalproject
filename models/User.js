const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  search: {
    type: String
  },
  phone: {
    type: String,
    unique: true
  },
  confirm: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('user', UserSchema);
