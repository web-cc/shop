var express = require('express');
var router = express.Router();

/* GET home page. */
router.home =  (req, res, next) => {
  res.render('category/category', { title: 'Express' });
};


module.exports = router;
