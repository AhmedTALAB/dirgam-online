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
    collection:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
 
});

const perfume = module.exports = mongoose.model('Perfume', perfumeschema);