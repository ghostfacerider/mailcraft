const mongoose = require('mongoose')
const {isEmail} = require('validator')



const { Schema} = mongoose
const addressSchema = new Schema({
  
});

module.exports = mongoose.model("Address", addressSchema);

