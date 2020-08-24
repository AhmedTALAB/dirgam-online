const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const passport = require('passport');


router.get('/login-user',(req, res)=>{
res.render('loginU');
});
//admin login
router.get('/login-admin',(req, res)=>{
res.render('loginA');
});
//register user
router.get('/register',(req, res)=>{
res.render('register1');
});
// register admin
router.get('/register2',(req, res)=>{
res.render('register2');
});

// post requests
//A1-register User
router.post('/register',(req, res)=>{
let user = new Admin();

user.username = req.body.username;
user.email = req.body.email;
user.password = req.body.password;

bcrypt.genSalt(10, (err,salt)=>{
bcrypt.hash(user.password, salt, (err, hash)=>{
    if(err) console.log(err);
    user.password = hash;
    user.save((err)=>{
        if (err) throw err;
        else{           
             res.redirect('/login/login-user');
    
        }
    });
});
});

});
// A2 register admin
// router.post('/register2',(req, res)=>{
//     let admin = new Admin();
//     admin.name = req.body.name;
//     admin.username = req.body.username;
//     admin.email = req.body.email;
//     admin.password = req.body.password;
    
//     bcrypt.genSalt(10, (err,salt)=>{
//     bcrypt.hash(admin.password, salt, (err, hash)=>{
//         if(err) console.log(err);
//         admin.password = hash;
//         admin.save((err)=>{
//             if (err) throw err;
//             else{           
//                  res.redirect('/login/login-admin');
        
//             }
//         });
//     });
//     });
    
//     });

//B1- login-user
router.post('/login-user',(req, res, next)=>{
passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect: '/login/login-user',
    failureFlash:true
})(req, res,next);
});
//B2- login-admin
router.post('/login-admin',(req, res, next)=>{
passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect: '/login/login-admin',
    failureFlash:true
})(req, res,next);
});

//logout
router.get('/loggout-user',(req, res)=>{
req.logOut();
req.flash('success', 'you logged out');
res.redirect('/login/login-user');
});

module.exports = router;