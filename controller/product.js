var express = require('express');
var router = express.Router();
var con = require('./../config/key');
const product = require('./../model/product');
const category = require('./../model/category');
var productsAll = [];


var categoriesAll = [];



/* GET home page. and get all product */
router.getIndex = (req, res, next) => {
  productsAll = [];
  categoriesAll = [];
  var from = req.query.from;
  var to = req.query.to;
  console.log(from);
  console.log(to);
  con.query('select * from categories ', function (err, rows, fields) {
    if (err) throw err
  
    rows.forEach(element => {
      var x = new category(element.id, element.name, element.description);
      categoriesAll.push(x);
    })
  });
  if (from == undefined && to == undefined){
    con.query('select * from products ', function (err, rows, fields) {
      if (err) throw err
    
      rows.forEach(element => {
        var x = new product(element.id, element.name, element.price,element.producer, element.description,element.quantity,element.category_id);
        productsAll.push(x);
      })
      res.render('product/product',{products : productsAll, categories : categoriesAll,user: req.user});
    });
  }
  else if (from == undefined ){
    con.query('select * from products  > '+to , function (err, rows, fields) {
      if (err) throw err
    
      rows.forEach(element => {
        var x = new product(element.id, element.name, element.price,element.producer, element.description,element.quantity,element.category_id);
        productsAll.push(x);
      })
      res.render('product/product',{products : productsAll, categories : categoriesAll,user: req.user});
    });
  }
  else {
    con.query('select * from products WHERE status = 1 and price >  '+from+' and price < '+to, function (err, rows, fields) {
      if (err) throw err
    
      rows.forEach(element => {
        var x = new product(element.id, element.name, element.price,element.producer, element.description,element.quantity,element.category_id);
        productsAll.push(x);
      })
      res.render('product/product',{products : productsAll, categories : categoriesAll,user: req.user});
    });
  }
  
};

router.getSearch = (req, res, next) => {
  productsAll = [];
  let name = req.query.name;
  console.log(name);
  
  if (name == undefined){
    con.query('select * from products ', function (err, rows, fields) {
      if (err) throw err
    
      rows.forEach(element => {
        var x = new product(element.id, element.name, element.price,element.producer, element.description,element.quantity,element.category_id);
        productsAll.push(x);
      })
      res.render('product/product',{products : productsAll, categories : categoriesAll,user: req.user});
    });
  }
  else{
    con.query('select * from products lower(name) like lower("%'+name+'%")' , function (err, rows, fields) {
      if (err) throw err
    
      rows.forEach(element => {
        var x = new product(element.id, element.name, element.price,element.producer, element.description,element.quantity,element.category_id);
        productsAll.push(x);
      })
      res.render('product/product',{products : productsAll, categories : categoriesAll,user: req.user});
    });
  }
  
};
//get detail product
router.getDetail = (req, res, next) => {
  let id = req.params.id;
  let sql = 'select * from products where id = '+ id;
  console.log(sql);
  con.query(sql, function(err, results, fields){
    console.log(results[0]);
    var x = new product(results[0].id, results[0].name, results[0].price,results[0].producer, results[0].description,results[0].quantity,results[0].category_id);
    res.render('product/product-detail',{product : x});
    
  });
};

module.exports = router;