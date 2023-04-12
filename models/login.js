const mongoose = require("mongoose");
const { Schema } = mongoose;

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const loginSchema = new Schema({
  password: {
    type: String,
    required: true,
    maxlength: [255, " Minimum password lenth is 6 characters"],
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    maxLength: 255,
    required: [true, "Must enter a valid email Address"],
    validate: {
      validator: (v) => {
        return /[A-Za-z0-9.-]@[A-Za-z0-9.-]+\.[a-z]/.test(v);
      },
    },
  },
});

module.exports = User = mongoose.model("Login", loginSchema);
