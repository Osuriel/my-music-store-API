const mongoose = require('mongoose');
const uuid = require("uuid");
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  favoriteItems: { type: Array, default: []},
  isAdmin: { type: Boolean, default: false },
});

const UserModel = mongoose.model('User', userSchema);

const UserController = {
  UserModel,
}

module.exports = UserController;