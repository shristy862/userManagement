const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  registrationNo: { type: String, required: true },
  gstNo: { type: String, required: true },
  companyId: { type: String, required: true },
  contactNo: { type: String, required: true },
  location: { type: String, required: true },
  representative: { type: String, required: true },
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true },
  role: { type: String, default: 'company' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
}, { timestamps: true });

companySchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); 
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log('Hashed company password:', this.password);
  next();
});

module.exports = mongoose.model('Company', companySchema);
