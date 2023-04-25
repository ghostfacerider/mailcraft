import mongoose from 'mongoose';
// import { isEmail } from 'validator';

const { Schema } = mongoose;
const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    maxlength: 100,
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
    maxlength: [255, ' Minimum password lenth is 6 characters'],
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    maxlength: [255, ' Minimum password lenth is 6 characters'],
    unique: [true, ' enter a unique e-mail'],
    required: [true, 'Please enter a valid e_mail'],
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
    // validate: {
    //   validator: isEmail,
    //   msg: "Email alread exists",
    // },
  },
});

export default mongoose.model('User', userSchema);
