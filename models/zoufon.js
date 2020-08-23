const mongoose = require('mongoose');

let zoufonschema = mongoose.Schema({
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

const Zoufon = module.exports = mongoose.model('Zoufon', zoufonschema);