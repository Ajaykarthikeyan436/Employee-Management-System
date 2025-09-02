const express = require("express");
const {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const router = express.Router();

router.get("/list", getEmployees);
router.post("/add", addEmployee);    
router.put("/:id", updateEmployee);   
router.delete("/:id", deleteEmployee);

module.exports = router;