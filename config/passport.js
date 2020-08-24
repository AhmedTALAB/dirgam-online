const localStrategy = require('passport-local').Strategy;
const User = require('../models/admin');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

module.exports = (passport) =>{

passport.use(new localStrategy((username,password,done)=>{
//match user name
User.findOne({username:username}, (err,user)=>{
if(err) throw err;
if(!user){
    return done(null, false, {message:'no user found'});
}
// match password
bcrypt.compare(password, user.password, (err,ismatch)=>{
if(err) throw err;
if(ismatch){
    return done(null, user);
} else{
    return done(null, false, {message:'wrong password'});

}

});

});
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });   

};