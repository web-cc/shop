var express = require('express');
var router = express.Router();

/* GET home page. */
router.home =  (req, res, next) => {
  res.render('checkout/checkout', { title: 'Express' , user: req.user});
};


module.exports = router;
