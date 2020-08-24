const mongoose = require('mongoose');

const userschema = mongoose.Schema({
    email: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: Number,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      googleID: String,
});
const user = module.exports = mongoose.model('user', userschema);