import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  bio:{
    type: String,
    default: "Hey there! I am using ChatBridge",
  },
  profilePicture: {
    type: String,
    default: ""
  },
  nativeLanguage: {
    type: String,
    default: "English",
  },
  learningLanguage: {
    type: String,
    default: "English",
  },
  location: {
    type: String,
    default: "Not specified",
  },
  isOnboarded: {
    type: Boolean,
    default: false,
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
},{timestamps: true});

// preHook 

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try{
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }catch(error) {
    console.error("Error hashing password:", error);
    next(error);
  }
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  return isMatch;
}

const User = mongoose.model("User", userSchema);




export default User;