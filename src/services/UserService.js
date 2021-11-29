const mongoose = require('mongoose');
const uuid = require("uuid");

const uuidv4 = uuid.v4

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  favoriteItems: { type: Array, default: []}
});

const UserModel = mongoose.model('User', userSchema);

const logIn = async (req, res) => {
  console.log('req.body: ', req.body);

  const { email, password } = req.body;

  const userFound = await UserModel.findOne({email, password});
  
  res.send(userFound);
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