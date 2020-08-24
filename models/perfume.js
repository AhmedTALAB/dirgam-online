const mongoose = require('mongoose');


let perfumeschema = mongoose.Schema({
    link:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    catogry:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
 
});

const Perfume = module.exports = mongoose.model('Perfume', perfumeschema);