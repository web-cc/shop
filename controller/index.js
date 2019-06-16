var express = require('express');
var router = express.Router();
var con = require('./../config/key');

/* GET home page. */
router.home =  (req, res, next) => {
  res.render('home/index', {user: req.user});
};


module.exports = router;
