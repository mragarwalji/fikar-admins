// console.log("✅ db file loaded successfully");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  gender: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const AdminUser = mongoose.model("AdminUser", adminUserSchema);
module.exports = AdminUser;
