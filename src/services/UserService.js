const mongoose = require('mongoose');
const uuid = require("uuid");
const jwt = require('jsonwebtoken');

const uuidv4 = uuid.v4

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

const logIn = async (req, res) => {
  console.log('req.body: ', req.body);

  const { email, password } = req.body;
  console.log('req.body: ', req.body);

  const userFound = await UserModel.findOne({email, password});
  console.log('userFound: ', userFound);

  const token = jwt.sign({ userId: userFound.id, iat: Date.now()  }, 'not so strong private key');

  console.log('token: ', token);

    // 1 .How can I send this JWT to the client
    // 2. but make it so the client doesnt have access to it?
    // that way no library or hacker will ever have access to it.

  res.cookie('session_token', token, {
    secure: false,
    http: false,
  }).send(userFound);
};

const editUserFavorites = async (req, res) => {

  const { userId, favorites } = req.body;

  const user = await UserModel.findOneAndUpdate(
    {id: userId},
    { favoriteItems: favorites },
    { returnDocument: 'after'}
  );

  res.send(user);
};

const registerUser = async (req, res) => {

  const { name, lastName, password, email  } = req.body;

  const newuser = new UserModel({ id: uuidv4() , name, lastName, password, email });

  try {
    await newuser.save();
    res.send(newuser);

  } catch (error){
    console.log('error: ', error);
    res.status(500).send("Unable to register user");
  }
};

const UserService = {
  logIn,
  editUserFavorites,
  registerUser,
}

module.exports = UserService;