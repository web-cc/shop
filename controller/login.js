var express = require('express');
var router = express.Router();

/* GET home page. */
router.home =  (req, res, next) => {
  res.render('login/login', { message: req.flash('loginMessage') ,user: req.user});
};


module.exports = router;
