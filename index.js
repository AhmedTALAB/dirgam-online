const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const config = require("config");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");

mongoose
  .connect(config.get("database"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to the database");
  })
  .catch((err) => console.log(err));

app.use(express.static(path.join(__dirname, "public")));
//express session middleware
app.use(
  session({
    secret: config.get("secret"),
    resave: true,
    saveUninitialized: true,
  })
);

//express messeges middleware
app.use(require("connect-flash")());
app.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

app.get("*", (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

//local users
// app.get('*', (req, res, next)=>{
//     res.locals.admin = req.admin || null
//     next();
// });

app.get("/", (req, res) => {
  res.render("index");
});

// routes:__
const rout1 = require("./routes/rout1");
app.use("/comp", rout1);
//login route
const login = require("./routes/login");
app.use("/login", login);
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log("server is running"));
