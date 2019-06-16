var express = require('express');
var router = express.Router();
var con = require('./../config/key');
var router = express.Router();
const category = require('./../model/category');
const product = require('./../model/product');

router.list = (req, res, next) => {
  productsAll = [];
  categoriesAll = [];
  var from = req.query.from;
  var to = req.query.to;
  var category_id_filter = req.query.categoryId;
  console.log(category_id_filter);
  console.log(from);
  console.log(to);
 
  con.query('select * from categories ', function (err, rows, fields) {
    if (err) throw err
  
    rows.forEach(element => {
      var x = new category(element.id, element.name, element.description);
      categoriesAll.push(x);
    })
  });
  if (from == undefined && to == undefined && category_id_filter == undefined){
    con.query('select * from products ', function (err, rows, fields) {
      if (err) throw err
    
      rows.forEach(element => {
        var x = new product(element.id, element.name, element.price,element.producer,element.description,element.quantity,element.category_id,element.image);
        productsAll.push(x);
      })
      res.render('product/category',{products : productsAll, categories : categoriesAll,user: req.user});
    });
  }
  else if (from == undefined && category_id_filter == undefined ){
    con.query('select * from products ', function (err, rows, fields) {
      if (err) throw err
    
      rows.forEach(element => {
        var x = new product(element.id, element.name, element.price,element.producer,element.description,element.quantity,element.category_id,element.image);
        productsAll.push(x);
      })
      res.render('product/category',{products : productsAll, categories : categoriesAll,user: req.user});
    });
  }
  else if ( category_id_filter == undefined){
    con.query('select * from products WHERE price >  '+from+' and price < '+to, function (err, rows, fields) {
      if (err) throw err

      rows.forEach(element => {
        var x = new product(element.id, element.name, element.price,element.producer,element.description,element.quantity,element.category_id,element.image);
        productsAll.push(x);
      })
      res.render('product/category',{products : productsAll, categories : categoriesAll,user: req.user});
    });
  }
  else if (from == undefined && category_id_filter != undefined ){
    con.query('select * from products WHERE   category_id = ' + category_id_filter , function (err, rows, fields) {
      if (err) throw err
    
      rows.forEach(element => {
        var x = new product(element.id, element.name, element.price,element.producer,element.description,element.quantity,element.category_id,element.image);
        productsAll.push(x);
      })
      res.render('product/category',{products : productsAll, categories : categoriesAll,user: req.user});
    });
  }
  else if ( category_id_filter != undefined){
    con.query('select * from products WHERE price >  '+from+' and price < '+to + ' and category_id = ' + category_id_filter, function (err, rows, fields) {
      if (err) throw err

      rows.forEach(element => {
        var x = new product(element.id, element.name, element.price,element.producer,element.description,element.quantity,element.category_id,element.image);
        productsAll.push(x);
      })
      res.render('product/category',{products : productsAll, categories : categoriesAll,user: req.user});
    });
  }
  
};

router.create = (req, res, next) => {
  let name = req.body.name;
  let status = 1;
  let id = req.body.id;
  if(id==""){
    id=0;
  }
  let description = req.body.description;
  console.log(id);
  console.log(name);
  if(id == 0){
    let sql='INSERT INTO categories(name, description) VALUES ("'+name+'","'+description+'")';
    con.query(sql);
  }
  else{
    let sql = 'UPDATE categories SET name="'+name+'",description="'+description+'" WHERE id='+id;
    con.query(sql)
  }
  categoriesAll = [];
  con.query('select * from categories', function (err, rows, fields) {
    if (err) throw err

    rows.forEach(element => {
      var x = new category(element.id, element.name, element.description);
      categoriesAll.push(x);
    })
  });
  res.redirect('/gian-hang');
};

router.changeStatus = (req, res, next) => {
  
  let id= req.params.id;
  let x, r;
  let sqlselect = "select * from categories where id="+id;
  con.query(sqlselect, function(err, results, fields){
    let sql = 'UPDATE categories WHERE id='+id;
    con.query(sql);
    categoriesAll = [];
    con.query('select * from categories', function (err, rows, fields) {
      if (err) throw err

      rows.forEach(element => {
        var x = new category(element.id, element.name, element.description);
        categoriesAll.push(x);
      })
    });
    
  });
  
  res.redirect('/gian-hang');
}

module.exports = router;
