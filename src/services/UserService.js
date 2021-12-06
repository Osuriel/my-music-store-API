const mongoose = require('mongoose');
const uuid = require("uuid");
const jwt = require('jsonwebtoken');
const UserController = require('../controllers/UserController');

const uuidv4 = uuid.v4

const logIn = async (req, res) => {
  const { email, password } = req.body;

  const userFound = await UserController.UserModel.findOne({email, password});
  console.log('user to log in: ', userFound )

  const token = jwt.sign({ userId: userFound.id, iat: Date.now()  }, 'not so strong private key');

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