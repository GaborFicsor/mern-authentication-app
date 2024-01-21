const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: String,
  email: { type: String, unique: true, required: true },
  firstName: String,
  lastName: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

// Add Passport-Local Mongoose plugin to simplify username/password authentication
userSchema.plugin(passportLocalMongoose);

// Middleware to update the 'updatedAt' field before saving the user
userSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;