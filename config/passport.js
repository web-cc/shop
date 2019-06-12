// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model

var bcrypt = require('bcrypt-nodejs');
var con = require('./key');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(user, done) {
        done (null,user);
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-signup',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            let phone = req.body.phone;
            let address = req.body.address;
            let name = req.body.name;
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            con.query("SELECT * FROM customers WHERE email = ?",[email], function(err, rows) {
                if (err){
                    console.log(err.message);
                    return done(err);
                }
                if (rows.length) {
                    console.log("is already");
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {
                    // if there is no user with that email
                    // create the user
                    var newUserMysql = {
                        email: email,
                        password: bcrypt.hashSync(password, null, null)  // use the generateHash function in our user model
                    };
                    console.log(newUserMysql);
                    // var insertQuery = "INSERT INTO customers ( email, password ) values (?,?)";
                    var insertQuery = "INSERT INTO customers(name, phone, address,email,password) values (?,?,?,?,?)"
                    con.query(insertQuery,[name,phone,address,newUserMysql.email, newUserMysql.password,1],function(err, rows) {
                        
                        
                        return done(null, newUserMysql);
                    });
                }
            });
        })
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses email and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        
        },
        function(req, email, password, done) { // callback with email and password from our form
            console.log(email+password);
           
            con.query("SELECT * FROM customers WHERE email = ? ",[email], function(err, rows){
                
                if (err){
                console.log("error");
                    return done(err);
                }
                if (!rows.length) {

                    console.log("not user");
                    return done(null, false,{ message: 'No user found.'}); // req.flash is the way to set flashdata using connect-flash
                }
                
                // if the user is found but the password is wrong
                console.log (bcrypt.hashSync(password,null,null));
                if (!bcrypt.compareSync(password, rows[0].password)){
                // if (password != row[0].password){
                    console.log("not passs");
                    return done(null, false, {message: 'Oops! Wrong password.'} ); // create the loginMessage and save it to session as flashdata
                }
                // all is well, return successful user
                return done(null, rows[0]);
            });
        })
    );
};
