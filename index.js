const express = require('express');
const app = express();
const path = require('path');
const mongoose  = require('mongoose');
const config = require('./config/database');
const User = require('./models/logU');
const perfume = require('./models/perfume')
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const multer = require('multer');

mongoose.connect('mongodb+srv://ahmed:ahm23456@cluster0.gn4ey.mongodb.net/<dbname>?retryWrites=true&w=majority');
let db = mongoose.connection;
db.on('error', err => console.log(err));
db.once('open', ()=> console.log('connected to MongoBD'));

app.use(express.static(path.join(__dirname,'public')));
//express session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}));

//express messeges middleware
app.use(require('connect-flash')());
  app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

app.use(bodyParser.urlencoded({extended:false}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.get('*', (req, res, next)=>{
    res.locals.user = req.user || null;
    next();
});

//local users
// app.get('*', (req, res, next)=>{
//     res.locals.admin = req.admin || null
//     next();
// });

app.get('/', (req, res)=>{
res.render('index');
});



// routes:__
const rout1 = require('./routes/rout1');
app.use('/comp', rout1);
//login route
const login = require('./routes/login');
app.use('/login', login);
const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log('server is running'));
