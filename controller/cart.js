var express = require('express');
var con = require('../config/key');
var router = express.Router();

const product = require('./../model/product');

var randomstring = require("randomstring");
const orderDetail = require('./../model/orderDetail');
var orderDetailAll = [];
var productAll = [];
var productSession = []; 
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
        var x = new product(rows[i].id, rows[i].name, rows[i].price,rows[i].producer,rows[i].description,  productSession[i].quantity,  rows[i].category_id, rows[i].image);
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

router.order = async (req, res, next) => {


  var phone = req.body.phone;
  var address = req.body.address ;

  var sum_money = 0;
  var order_id = -1;
  var customer_id = req.user.id;
  var customer_name = req.user.name;
  var dateTime = require('node-datetime');
var dt = dateTime.create();
var created_at = dt.format('Y-m-d');

  console.log("create" +created_at );

  if(productAll.length >=1)
  {
  if (customer_id != undefined) {
    for(var i = 0;i<productAll.length;i++)
    {
      sum_money = sum_money + (productSession[i].quantity*productAll[i].price);
      console.log("vonglap"+productSession[i].quantity+":"+ productAll[i].price);


    }
    console.log("sum_money:"+i +sum_money );
    var code = randomstring.generate(7);
    let sql = 'INSERT INTO orders (customer_id,customer_name,status,sum_money,created_at,address,phone,code) VALUES (' + customer_id + ',"' + customer_name + '",' + 0 + ',' + sum_money + ',"' + created_at + '","' + address + '",' + phone + ',"' + code + '")';
    console.log(sql);
    await con.query(sql);
    con.query('select id from orders where customer_id = ? and code = ? ', [customer_id],[code], function (err, rows, fields) {
      if (err) throw err

      rows.forEach(rows => {
        order_id = rows.id;
       
        console.log(sql);
        for (var i = 0; i < productAll.length; i++) {
          sql = 'INSERT INTO order_details (order_id,product_id,price,status,quantity) VALUES (' + order_id + ',' + productSession[i].id + ',' + productAll[i].price + ',' + 0 + ',' + productSession[i].quantity + ')';
          console.log(sql)
          con.query(sql);
        }

      })
      productSession=[];
      req.session.productSession = productSession;
      
      res.redirect('back');
    });
  }

  else{
    res.redirect('/login');
  }
}
else{
  res.redirect('back');
}
}
router.changeQuantity = (req,res,next)=>{
  var id_product = req.body.id_product;
  var quantity = req.body.quantity;
  console.log("changequauaau"+id_product+":"+quantity);

  for(var i = 0;i<productSession.length;i++)
  {
    if(parseInt(productSession[i].id) == id_product)
    {    
      productSession[i].quantity = quantity;
    }
  }
  
  req.session.productSession = productSession;
  res.send("changed");
}


module.exports = router;
