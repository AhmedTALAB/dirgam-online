const mongoose = require('mongoose');

let brandschema = mongoose.Schema({
    link:{
        type: String,
        required: true
    },
    perfume:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
 
});

const Brand = module.exports = mongoose.model('Brand', brandschema);