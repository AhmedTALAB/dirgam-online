const express = require('express');
const router = express.Router();
const Perfume = require('../models/perfume');
var ObjectId = require('mongodb').ObjectID;
const multer = require('multer');
const path = require('path');
//set storage engine
const storage = multer.diskStorage({
destination: './public/img/',
filename: (req, file, cb)=>{
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
}
});
// init upload
const upload = multer({
    storage: storage,
    limits: {fileSize:1000000000},
    fileFilter: (req, file, cb)=>{
if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
    cb(null, true);}
else{
cb(new Error('IMAGES only'));
    }

    }
}).single('link');


//special offers rout
router.get('/special-offer',(req, res)=>{
res.render('special');
});


//smart routes
router.get('/smart',(req, res)=>{
    Perfume.find({}, (err, perfume)=>{
    if (err) throw err;
    else{
        res.render('smart', {perfume:perfume});
    }
});
});
router.get('/smart/:id', (req, res)=>{
Perfume.findById(req.params.id, (err, smart)=>{
if (err) throw err;
else{
    res.render('smart-detail', {smart:smart});
}
});
});


//brand route
router.get('/brand',(req, res)=>{
    perfume.find({}, (err, brand)=>{
        if (err) throw err;
        else{
            res.render('brand', {brand:brand});
        }
    });
});
router.get('/brand/:id', (req, res)=>{
perfume.findById(req.params.id, (err, brand)=>{
if (err) throw err;
else{
    res.render('brand-detail', {brand:brand});
}
});
});
//zoufun route
router.get('/zoufon',(req, res)=>{
    perfume.find({}, (err, zoufon)=>{
        if (err) throw err;
        else{
            res.render('zoufon', {zoufon:zoufon});
        }
    });
});
router.get('/zoufon/:id', (req, res)=>{
perfume.findById(req.params.id, (err, zoufon)=>{
if (err) throw err;
else{
    res.render('zoufon-detail', {zoufon:zoufon});
}
});
});

//post requests
//1- smart
router.post('/smart',(req, res)=>{
upload(req, res, (err)=>{
   if(err){
    res.render('index',{msg: err});
console.log(err);
   } else{
   let perfume = new Perfume();

perfume.link = req.file.filename;      
perfume.name = req.body.name;
perfume.catogry = req.body.catogry;
perfume.gender = req.body.gender;
perfume.price = req.body.price;

perfume.save((err)=>{
 if (err) console.log(err);
 else{
     req.flash('success', 'new smart product added');
     res.redirect('/comp/smart');
 }
});
   }

});

});
//serach
router.post('/searchSm', (req,res)=>{
let username = req.body.username;
perfume.findOne({'name':username}, (err, smart)=>{
    if(err){
    console.log(err)
    }
    else{
        if(smart == null){
            res.render('404');
        }else{
            res.render('find-smart', {smart:smart});

        }
    }
})
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