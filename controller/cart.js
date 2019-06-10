var express = require('express');
var con = require('../config/key');
var router = express.Router();

var product = function(id, name, price, producer, description, quatity, category_id){
  this.id = id;
  this.name = name;
  this.price = price;
  this.producer = producer;
}

var products = [];
 
con.query('select * from products', function (err, rows, fields) {
  if (err) throw err
 
  rows.forEach(element => {
    var x = new product(element.id, element.name, element.price, element.producer, element.description, element.quatity, element.category_id);
    products.push(x);
  })
});
/* GET users listing. */
router.home = (req, res, next) => {
  let a = [];
  a= products;
  res.render('product/product', {products: a});
};

module.exports = router;
