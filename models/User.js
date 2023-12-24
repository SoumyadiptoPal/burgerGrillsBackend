const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    
    password:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    pincode:{
        type: String,
        required: true
    },
    contact:{
        type: String,
        required: true
    },
  });
  const User = mongoose.model('user', UserSchema);
  module.exports = User;