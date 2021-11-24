

var users = [
  {
    id: '111',
    email: 'john@email.com',
    name: 'John',
    lastName: 'Smith',
    password: 'password',
    favoriteItems: ['234']
  }
];

const logIn = (req, res) => {
  console.log('req.body: ', req.body);

  const { email, password } = req.body;

  const userFound = users.find(user => {
    if(user.email === email && user.password === password){
      return true;
    }
    
    return false;
  });

  console.log('userFound: ', userFound);

  res.send(userFound);
};

const editUserFavorites = (req, res) => {
  console.log('req.body: ', req.body);

  const { userId, favorites } = req.body;

  // fetchingData from imaginary database

  const user = users.find(user => user.id === userId);

  const arrayOfOtherUsers = users.filter(user => user.id !== userId);

  const userWithUpdatedFavorites = {...user, favoriteItems: favorites};

  users = [...arrayOfOtherUsers, userWithUpdatedFavorites]

  res.send(userWithUpdatedFavorites);
};

const UserService = {
  logIn,
  editUserFavorites,
}

module.exports = UserService;