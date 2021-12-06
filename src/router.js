const jwt = require('jsonwebtoken');
const express = require('express')
const ProductService = require("./services/ProductService");
const UserService = require("./services/UserService");
const PermissionService = require('./services/PermissionService');

console.log('ProductService: ', ProductService)

const router = express.Router();


// Product routes
router.get('/product-list', ProductService.fetchAllProducts)

// User Routes
router.post('/log-in', UserService.logIn)

router.get('/log-out', UserService.logOut)

router.post('/edit-user-favorites', UserService.editUserFavorites);

router.post('/register-user', UserService.registerUser);

router.post('/upload-product', async (req, res) => {
 // TODO: Implement upload-product route for real. right now were just using it to check if our 'checkAdminPermission' function works.

  try{ 
    await PermissionService.checkAdminPermission(req);

    res.send('user is logged in as an admin.');
  } catch(error) {
    console.log('error: ', error);
    res.statusCode = 500;
    res.send('user is NOT logged in as an admin');
  }
});

module.exports = router;