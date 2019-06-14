var express = require('express');
var con = require('../config/key');
const customer = require('./../model/customer');
var passport = require('passport'); 
var router = express.Router();

/* GET home page. */
router.user = (req, res, next) => {
 

  res.render('user/users',{ message: req.flash('loginMessage') ,user: req.user})
};

//signup connect with link: 
router.signup = (req,res,next)=>{
  
  

  passport.authenticate('local-signup',{
    successRedirect: '/login',
    failureRedirect: '/signup',
    failureFlash: true
  },function (err,user,info){
    if(err) {
      req.flash('loginMessage', err.message)
      return res.redirect('/signup');
    }

    if(!user) {
      req.flash('loginMessage', 'Tài khoản hoặc mật khẩu không chính xác')
    
      return res.redirect('/signup');
    }

    return req.logIn(user, function(err) {
        if(err) {
          req.flash('loginMessage', 'Tài khoản hoặc mật khẩu không chính xác')
    
          return res.redirect('/signup');
          
        } else {
            return res.redirect('/login');
        }
    });
  })(req, res, next);
  //   let sql='INSERT INTO customers(name, phoneNumber, place,account,password,address) VALUES ("'+name+'","'+phoneNumber+'","'+address+'","'+account+'","'+password+'",1)';
  //   con.query(sql);
  // res.redirect('/login');
  
}


//login connect with link /login/dang-nhap
router.signin = (req,res,next)=>{
  let account = req.body.email;
  let password = req.body.password;
  console.log(account);
  console.log(password);

  passport.authenticate('local-login',{
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  },function(err, user, info) {
    
    
    if(err) {
      req.flash('loginMessage', err.message)
      return res.redirect('/login');
    }

    if(!user) {
      req.flash('loginMessage', 'Tài khoản hoặc mật khẩu không chính xác')
    
      return res.redirect('/login');
    }

    return req.logIn(user, function(err) {
        if(err) {
          req.flash('loginMessage', 'Tài khoản hoặc mật khẩu không chính xác')
    
          return res.redirect('/login');
          
        } else {
            return res.redirect('/');
        }
    });
})(req, res, next);
  
 
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
