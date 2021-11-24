const express = require('express')
const ProductService = require("./services/ProductService");
const UserService = require("./services/UserService");

console.log('ProductService: ', ProductService)

const router = express.Router();



router.get('/product-list', ProductService.fetchAllProducts)


router.post('/log-in', UserService.logIn)


router.post('/edit-user-favorites', UserService.editUserFavorites);

module.exports = router;