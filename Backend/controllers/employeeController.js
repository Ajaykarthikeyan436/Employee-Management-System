const EmployeeModel = require("../models/employeeModel");

// Employees List
const getEmployees = async (req, res) => {
  try {
    const employees = await EmployeeModel.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Add Employee
const addEmployee = async (req, res) => {
  try {
    const { employeeId, name, email, position, department, salary, dateOfJoining } = req.body;

    // Check duplicate by email
    const employeeExists = await EmployeeModel.findOne({ email });
    if (employeeExists) {
      return res.status(400).json({ message: "Employee with this email already exists" });
    }

    const employee = new EmployeeModel({
      employeeId,
      name,
      email,
      position,
      department,
      salary,
      dateOfJoining,
    });

    const savedEmployee = await employee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update employee
const updateEmployee = async (req, res) => {
  try {
    const { name, email, position, department, salary, dateOfJoining } = req.body;

    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      req.params.id,
      { name, email, position, department, salary, dateOfJoining },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete employee
const deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await EmployeeModel.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};