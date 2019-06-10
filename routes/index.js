var express = require('express');
var router = express.Router();

var index = require("../controller/index");
var cart = require("../controller/cart");
var category = require("../controller/category");
var checkout = require("../controller/checkout");
var login = require("../controller/login");
var product = require("../controller/product");
var usersController = require("../controller/user");
var signupController = require('../controller/signup');
var userDetailController = require('../controller/user-detail');
var productController = require('../controller/product');

/* GET home page. */
router.get('/',index.home);
router.get('/cart',cart.home);
router.get('/category',category.list);
router.get('/checkout',checkout.home);
router.get('/login',login.home);
router.get('/product',product.getIndex);
router.get('/user',usersController.user);
router.get('/signup',signupController.getIndex);
router.post('/tai-khoan/check-account',isLoggedIn,usersController.check);
router.post('/tai-khoan/check-phone',isLoggedIn,usersController.checkPhone);
router.get('/thong-tin-tai-khoan',userDetailController.getDetail);
router.get('/san-pham/tim-kiem',productController.getSearch);
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on doi xi lay mic
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
    res.redirect('/tai-khoan');
}
module.exports = router;
