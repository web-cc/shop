var express = require('express');
var con = require('../config/key');
const customer = require('./../model/customer');
var passport = require('../config/passport'); // pass passport for configuration
var router = express.Router();

/* GET home page. */
router.user = (req, res, next) => {
//   if(req.isAuthenticated()) {
//     res.redirect('/');
// } else {
//     res.render('user/users', { message: req.flash('loginMessage') });
// }

  res.render('user/users',{ message: req.flash('loginMessage') ,user: req.user})
};
var abc = [];

//signup connect with link: 
router.signup = (req,res,next)=>{
  
  

  passport.authenticate('local-signup',{
    successRedirect: '/tai-khoan',
    failureRedirect: '/dang-ki',
    failureFlash: true
  },function (err,user,info){
    if(err) {
      req.flash('loginMessage', err.message)
      return res.redirect('/dang-ki');
    }

    if(!user) {
      req.flash('loginMessage', 'Tài khoản hoặc mật khẩu không chính xác')
    
      return res.redirect('/dang-ki');
    }

    return req.logIn(user, function(err) {
        if(err) {
          req.flash('loginMessage', 'Tài khoản hoặc mật khẩu không chính xác')
    
          return res.redirect('/dang-ki');
          
        } else {
            return res.redirect('/tai-khoan');
        }
    });
  })(req, res, next);
  //   let sql='INSERT INTO customers(name, phoneNumber, place,account,password,address) VALUES ("'+name+'","'+phoneNumber+'","'+address+'","'+account+'","'+password+'",1)';
  //   con.query(sql);
  // res.redirect('/tai-khoan');
  
}


//login connect with link /tai-khoan/dang-nhap
router.signin = (req,res,next)=>{
  
  let account = req.body.account;
  let password = req.body.password;
  console.log(account);
  console.log(password);

  passport.authenticate('local-login',{
    successRedirect: '/',
    failureRedirect: '/tai-khoan',
    failureFlash: true
  },function(err, user, info) {
    
    
    if(err) {
      req.flash('loginMessage', err.message)
      return res.redirect('/tai-khoan');
    }

    if(!user) {
      req.flash('loginMessage', 'Tài khoản hoặc mật khẩu không chính xác')
    
      return res.redirect('/tai-khoan');
    }

    return req.logIn(user, function(err) {
        if(err) {
          req.flash('loginMessage', 'Tài khoản hoặc mật khẩu không chính xác')
    
          return res.redirect('/tai-khoan');
          
        } else {
            return res.redirect('/');
        }
    });
})(req, res, next);
  
 
}
function functionName() {
  
} 
router.check = (req, res) => {
  let account = req.body.data;
  if (account == undefined || account == "") {
    res.send("3");
  } else {

    con.query('select * from customers WHERE account="' + account + '"', function (err, rows, fields) {
      if (err) throw err
      let list = [];
      rows.forEach(element => {
        var x = new customer(element.id, element.name, element.address, element.phoneNumber, element.email, element.password);
                list.push(x);

      });
      console.log(list.length);
      if (list.length >= 1) {
        res.send("0");
      }
      else {
        res.send("1");
      }
    });
  }
}

router.checkPhone = (req, res) => {
  let phoneNumber = req.body.data;
  if (phoneNumber == undefined || phoneNumber == "") {
    res.send("3");
  } else {

    con.query('select * from customers WHERE phoneNumber="' + phoneNumber + '"', function (err, rows, fields) {
      if (err) throw err
      let list = [];
      rows.forEach(element => {
        var x = new customer(element.id, element.name, element.address, element.phoneNumber, element.email, element.password);
        list.push(x);

      });
      console.log(list.length);
      if (list.length >= 1) {
        res.send("0");
      }
      else {
        res.send("1");
      }
    });
  }

}

router.logout=(req,res,next)=>
{
  req.logout();
  res.redirect('/');
}
module.exports = router;
