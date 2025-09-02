const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  employee: { type: String, required: true },
  position: { type: String, required: true },
  salary: { type: Number, required: true },
  dateOfJoining: { type: Date, default: Date.now },
});

const EmployeeModel = mongoose.model("Employee", EmployeeSchema);

module.exports = EmployeeModel;