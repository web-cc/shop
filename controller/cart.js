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
  res.render('cart/cart', {products: a, user: req.user});
};
var orderDetailAll = [];
var productAll = [];
var productSession = [];
var id_order = -1;
/* GET home page. */
router.list = (req, res, next) => {
  orderDetailAll = [];
  productAll = [];
  
  productSession = req.session.productSession;
  console.log(productSession);
  if (productSession != undefined && productSession.length >= 1) {
    var ids = [];
    for (var i = 0; i < productSession.length; i++) {
      console.log(productSession[i].id);
      ids.push(productSession[i].id);
    }
    console.log(ids);
    let query = 'select * from products where id in (' + ids + ') order by field (id,'+ids+')';
    console.log(query);
    con.query(query, function (err, rows) {
      console.log(rows);
      if(rows != null){
      for (var i = 0; i < rows.length; i++) {
        var x = new product(rows[i].id, rows[i].name, rows[i].price, productSession[i].producer, rows[i].description, 1, rows[i].category_id, rows[i].image);
        productAll.push(x);
      }

      console.log(productAll);
      res.render('cart/cart', { user: req.user, productAll: productAll });
    }
    else{
      res.render('cart/cart', { user: req.user, productAll: productAll });
    }
    })
  }
  else {
    res.render('cart/cart', { user: req.user, productAll: productAll });
  }




};

module.exports = router;
