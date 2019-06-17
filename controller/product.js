var express = require('express');
var router = express.Router();
var con = require('./../config/key');
const product = require('./../model/product');
const category = require('./../model/category');
var productsAll = [];
var productsConcern = [];


var categoriesAll = [];



/* GET home page. and get all product */
router.list = (req, res, next) => {
  productsAll = [];
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
              con.query('select * from products WHERE  category_id = ' + cate.id , function (err, rows, fields) {
                if (err) throw err
              
                rows.forEach(element => {
                  var x = new product(element.id, element.name, element.price,element.producer,element.description,element.quantity,element.category_id,element.image);
                  console.log(x);
                  productsAll.push(x);
                })
                res.render('product/product',{products:productsAll ,product : x, category:cate, user: req.user});
              });

          });

  });
  
};
router.order = (req,res,next) =>{
  console.log("phong"); 
  var id_product = req.body.id_product;
  console.log(id_product);
  let productSessionList = [];
  var productSession={
    id: null,
    quantity: null
  };
  if(req.session.productSession != undefined)
  {
    productSessionList = req.session.productSession;
    for (var i = 0 ; i<productSessionList.length;i++)
    {
      if(id_product == productSessionList[i].id)
      {
        productSessionList[i].quantity = productSessionList[i].quantity;
        req.session.productSession = productSessionList;
        res.send("added");
        return;
      }
    }
    
  }
  productSession.id = id_product;
  productSessionList.push(productSession);
  req.session.productSession = productSessionList;
  console.log(req.session);
  res.send("added");

}


module.exports = router;