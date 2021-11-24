const express = require('express')
const ProductService = require("./services/ProductService");
const UserService = require("./services/UserService");

console.log('ProductService: ', ProductService)

const router = express.Router();


// Product routes
router.get('/product-list', ProductService.fetchAllProducts)

// User Routes
router.post('/log-in', UserService.logIn)

router.post('/edit-user-favorites', UserService.editUserFavorites);

router.post('/register-user', UserService.registerUser);

module.exports = router;