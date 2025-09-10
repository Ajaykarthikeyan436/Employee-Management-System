require('dotenv').config()
const express = require("express")
const cors = require('cors')
const connectDB = require('./config/mongodb')
const employeeRoutes = require("./routes/employeeRoute");

const app = express()

app.use(cors({
  origin: [
    'http://localhost:5173', 
    'https://employee-management-system-fshr.vercel.app',
    'https://tech-bazaar-frontend-d1vorsh3y-ajays-projects-8ce49744.vercel.app',//fallback Url for frontend
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));
app.use(express.json())

//Connections
connectDB()

//Route Section
app.use("/api/employees", employeeRoutes);

app.get("/", (req,res) => {
    res.send("Backend is Running....")
})

app.listen(5000, () => {
    console.log("Server is Running....")
})

module.export = app;