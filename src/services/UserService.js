const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  email: { type: String, required: true },
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

const UserService = {
  logIn,
  editUserFavorites,
}

module.exports = UserService;