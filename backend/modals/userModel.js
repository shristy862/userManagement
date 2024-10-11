const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
  resetPasswordToken: { type: String, default: null }, // Field for storing the reset token
  resetPasswordExpires: { type: Date, default: null }, // Field for storing the token expiration time
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); 
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log('Hashed password:', this.password); 
  next();
});

module.exports = mongoose.model('User', userSchema);
