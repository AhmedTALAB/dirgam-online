const mongoose = require('mongoose');

let adminschema = mongoose.Schema({

    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
    type: String,
    required: true
    }
});

const Admin = module.exports = mongoose.model('Admin', adminschema);