var express = require('express');
var router = express.Router();
var con = require('./../config/key');
const product = require('./../model/product');
const category = require('./../model/category');
var productsAll = [];


var categoriesAll = [];



/* GET home page. and get all product */
router.list = (req, res, next) => {
  let cate;
  let id = req.params.id;
  let sql = 'select * from products where id = '+ id;
  console.log(sql);
  con.query(sql, function(err, results, fields){
    console.log(results[0]);
    var x = new product(results[0].id, results[0].name, results[0].price,results[0].producer, results[0].description,results[0].quantity,results[0].category_id, results[0].image);
          let sql2='select * from categories where id = '+ results[0].category_id;
    con.query(sql2,function(err,rows,fields){
              cate = rows[0];
              console.log(cate);
              res.render('product/product',{product : x, category:cate, user: req.user});

          });

  });
  
};
module.exports = router;