const express = require("express");
const router = express.Router();
const Perfume = require("../models/perfume");
var ObjectId = require("mongodb").ObjectID;
const upload = require("../middlewares/multer");

//special offers rout
router.get("/special-offer", (req, res) => {
  res.render("special");
});

router.get("/perfumes", (req, res) => {
  const queryObject = req.query;
  if (JSON.stringify(queryObject) !== JSON.stringify({})) {
    console.log(queryObject);
    Perfume.find(queryObject, (err, docs) => {
      if (err) res.send(err);
      res.send(docs);
    });
  } else {
    Perfume.find({}, (err, docs) => {
      if (err) res.send(err);
      res.send(docs);
    });
  }
});
//smart routes
router.post("/perfume", (req, res) => {
  Perfume.find(
    { brand: req.body.brand, catogry: req.body.catogry },
    (err, perfume) => {
      if (err) throw err;
      else {
        res.render("perfume", { perfume });
      }
    }
  );
});

router.get("/perfume/:id", (req, res) => {
  Perfume.findById(req.params.id, (err, perfume) => {
    if (err) throw err;
    else {
      res.render("perfume-detail", { smart: perfume });
    }
  });
});

//brand route
router.get("/brand", (req, res) => {
  Perfume.find({}, (err, brand) => {
    if (err) throw err;
    else {
      res.render("brand", { brand });
    }
  });
});

//post requests
//1- smart
router.post("/perfume", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render("index", { msg: err });
      console.log(err);
    } else {
      const { name, brand, catogry, price } = req.body;
      new Perfume({
        link: req.file.filename,
        name,
        brand,
        catogry,
        price,
      })
        .save()
        .then(() => {
          req.flash("success", "new smart product added");
          res.redirect("/comp/perfume");
        })
        .catch((err) => console.log(err));
    }
  });
});

//serach
router.post("/searchSm", (req, res) => {
  let username = req.body.username;
  Perfume.findOne({ name: username }, (err, smart) => {
    if (err) {
      console.log(err);
    } else {
      if (smart == null) {
        res.render("404");
      } else {
        res.render("find-perfume", { smart });
      }
    }
  });
});

// 2- brand
// router.post('/brand',(req, res)=>{
//     upload(req, res, (err)=>{
//         if(err){
//          res.render('index',{msg: err});
//      console.log(err);
//         } else{
//         let brand = new perfume();

//      brand.link = req.file.filename;
//      brand.perfume = req.body.perfume;
//      brand.price = req.body.price;

//      brand.save((err)=>{
//       if (err) console.log(err);
//       else{
//           req.flash('success', 'new smart product added');
//           res.redirect('/comp/brand');
//       }
//      });
//         }

//      });
// });
//serach
// router.post('/searchBr', (req,res)=>{
// let username = req.body.username;
// perfume.findOne({'name':username}, (err, brand)=>{
//     if(err){
//     console.log(err);
//     }
//     else{
//         if(brand == null){
//             res.render('404');
//         }else{
//             res.render('find-brand', {brand:brand});

//         }
//     }
// })
// });

//3-zoufon
// router.post('/zoufon',(req, res)=>{
//     upload(req, res, (err)=>{
//         if(err){
//          res.render('index',{msg: err});
//      console.log(err);
//         } else{
//         let zoufon = new perfume();

//      zoufon.link = req.file.filename;
//      zoufon.perfume = req.body.perfume;
//      zoufon.price = req.body.price;

//      zoufon.save((err)=>{
//       if (err) throw err;
//       else{
//           req.flash('success', 'new smart product added');
//           res.redirect('/comp/zoufon');
//       }
//      });
//         }

//      });
// });
//serach
// router.post('/searchZf', (req,res)=>{
// let username = req.body.username;
// perfume.findOne({'perfume':username}, (err, zoufon)=>{
//     if(err){
//         res.render('404');
//     }
//     else{

//         if(zoufon == null){
//             res.render('404');
//         }else{
//             res.render('find-zoufon', {zoufon:zoufon});

//         }
//     }
// });
// });

module.exports = router;
