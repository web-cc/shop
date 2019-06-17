var express = require('express');
var router = express.Router();
var con = require('./../config/key');
const customer = require('./../model/customer');
  var customersAll = [];
  con.query('select * from customers ', function (err, rows, fields) {
    if (err) throw err
  
    rows.forEach(element => {
      var x = new customer(element.id, element.name, element.phone, element.address, element.email, element.password );
      customersAll.push(x);
    })
  });
  /* GET home page. */
  router.user = (req, res, next) => {
  
    
      res.render('user/user-detail',{ customer: customersAll ,user: req.user.id})
    };
  //get detail customer
router.getDetail = (req, res, next) => {
  let id = req.user.id;
  let sql = 'select * from customers where id = '+ id;
  console.log(sql);
  con.query(sql, function(err, results, fields){
    console.log(results[0]);
    var x = new customer(results[0].id, results[0].name, results[0].phone, results[0].address, results[0].email, results[0].password);
    res.render('user/user-detail',{customers : x,user: req.user.id});
    
  });
};
router.update=(req,res,next)=>{
  let id = req.user.id;
  let sql='UPDATE customers SET name="'+req.body.name+'",phone="'+req.body.phone+'",address="'+req.body.address+'" WHERE id ='+id;
  con.query(sql);
  console.log(sql);
  res.redirect('/thong-tin-tai-khoan');
}

module.exports = router;
