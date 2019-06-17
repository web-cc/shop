var express = require('express');
var router = express.Router();
var con = require('./../config/key');
var router = express.Router();
const category = require('./../model/category');
const product = require('./../model/product');
var productsAll = [];
var categoriesAll = [];
router.list = (req, res, next) => {
  productsAll = [];
  categoriesAll = [];
  var category_id_filter = req.query.categoryId;

  console.log(category_id_filter);  
 
  con.query('select * from categories ', function (err, rows, fields) {
    if (err) throw err
  
    rows.forEach(element => {
      var x = new category(element.id, element.name, element.description);
      categoriesAll.push(x);
    })
  });
  if (category_id_filter == undefined){
    con.query('select * from products ', function (err, rows, fields) {
      if (err) throw err
    
      rows.forEach(element => {
        var x = new product(element.id, element.name, element.price,element.producer,element.description,element.quantity,element.category_id,element.image);
        productsAll.push(x);
      })
      res.render('product/category',{products : productsAll, categories : categoriesAll,user: req.user});
    });
  }
  else{
    con.query('select * from products where category_id = '+category_id_filter, function (err, rows, fields) {
      if (err) throw err
    
      rows.forEach(element => {
        var x = new product(element.id, element.name, element.price,element.producer,element.description,element.quantity,element.category_id,element.image);
        productsAll.push(x);
      })
      res.render('product/category',{products : productsAll, categories : categoriesAll,user: req.user});
    });
  }
  
};

router.getSearch = (req, res, next) => {
  let name= req.query.name;
  console.log("ten"+name);
  productsAll = [];
  if (name == undefined){
    con.query('select * from products ', function (err, rows, fields) {
      if (err) throw err
    
      rows.forEach(element => {
        var x = new product(element.id, element.name, element.price,element.producer, element.description, element.quantity, element.category_id, element.image);
        productsAll.push(x);
      })
      res.render('product/category',{products : productsAll, categories : categoriesAll,user: req.user});
    });
  }
  else{
    con.query('select * from products WHERE lower(name) like lower("%'+name+'%")' , function (err, rows, fields) {
      if (err) throw err
    
      rows.forEach(element => {
        var x = new product(element.id, element.name, element.price,element.producer, element.description, element.quantity, element.category_id, element.image);
        productsAll.push(x);
      })
      res.render('product/category',{products : productsAll, categories : categoriesAll,user: req.user});
    });
  }
  
};



module.exports = router;
