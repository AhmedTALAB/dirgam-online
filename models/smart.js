const mongoose = require('mongoose');
const { schema } = require('./brand');

let smartschema = mongoose.Schema({
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

const Smart = module.exports = mongoose.model('Smart', smartschema);