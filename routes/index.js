var express = require('express');
var router = express.Router();

var index = require("../controller/index");
var cart = require("../controller/cart");
var category = require("../controller/category");
var checkout = require("../controller/checkout");
var login = require("../controller/login");
var product = require("../controller/product");
var user = require("../controller/user");


/* GET home page. */
router.get('/',index.home);
router.get('/cart',cart.home);
router.get('/category',category.home);
router.get('/checkout',checkout.home);
router.get('/login',login.home);
router.get('/product',product.home);
router.get('/user',user.home);



module.exports = router;
