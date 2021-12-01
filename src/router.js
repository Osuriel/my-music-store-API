const jwt = require('jsonwebtoken');
const express = require('express')
const ProductService = require("./services/ProductService");
const UserService = require("./services/UserService");

console.log('ProductService: ', ProductService)

const router = express.Router();


// Product routes
router.get('/product-list', ProductService.fetchAllProducts)

// User Routes
router.post('/log-in', UserService.logIn)

router.get('/log-out', UserService.logOut)

router.post('/edit-user-favorites', UserService.editUserFavorites);

router.post('/register-user', UserService.registerUser);

router.post('/upload-product', (req, res) => {
  const { sessionToken } = req.body;

  try{
    // verify token to make sure user is logged in.
    const {userId, iat} = jwt.verify(sessionToken, 'not so strong private key');
    res.send('user is logged in');
  } catch(error) {
    res.statusCode = 500;
    res.send('user is NOT logged in');
  }
});

module.exports = router;