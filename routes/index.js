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

/* GET home page. */
router.get('/',index.home);
router.get('/checkout',checkout.home);
router.get('/user',usersController.user);
router.get('/thong-tin-tai-khoan',userDetailController.getDetail);
router.post('/thong-tin-tai-khoan',userDetailController.update);

// router.post('/tai-khoan/check-account',isLoggedIn,usersController.check);
// router.post('/tai-khoan/check-phone',isLoggedIn,usersController.checkPhone);

//danh mục sản phẩm
router.get('/category',category.list);
router.get('/category/search',category.getSearch);

//chi tiet san pham
router.get('/product/:id',product.list);
router.post('/product',product.order);


// gio hang
router.get('/cart',cart.list);
router.post('/cart',requiresLogin,cart.order);
router.post('/cart/change-quantity',requiresLogin,cart.changeQuantity);



router.get('/logout',usersController.logout);//dang xuat

router.get('/login',login.home); //dang nhap
router.post('/user/login',usersController.signin); // dang nhap
router.get('/signup',signupController.getIndex); //dang ky
router.post('/user/signup',usersController.signup); //dang ky
router.get('/profile', requiresLogin, userDetailController.getDetail);
router.post('/profile', requiresLogin, userDetailController.update);



function requiresLogin(req, res, next) {
	if (req.isAuthenticated()) {
	  return next();
	} else {
		req.flash('loginMessage', 'You must be logged in to view this page.')
		return res.redirect('/login');
	}
  }

module.exports = router;
