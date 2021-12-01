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

  const userFound = await UserModel.findOne({email, password});

  const token = jwt.sign({ userId: userFound.id, iat: Date.now()  }, 'not so strong private key');

  console.log('token: ', token);

    // 1 .How can I send this JWT to the client - X solution: setting it in the cookies
    // 2. make sure every request to the server now includes the jwt session token. - X solotion: setting it in the cookies
    // 3. but make it so the client doesnt have access to it?
    // that way no library or hacker will ever have access to it. setting the secure and httpOnly flag to true.

     res.cookie('session_token', token, {
      httpOnly: true,
      secure: false,
  }).send(userFound);
  
};

const logOut = async (req, res) => res.clearCookie('session_token').send('Logged out successfully');

const editUserFavorites = async (req, res) => {
  console.log('Cookies: ', JSON.stringify(req.cookies))

  console.log('req.userId: ', req.userId)

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
  logOut,
}

module.exports = UserService;