import React from 'react'
import { Routes , Route} from "react-router-dom"
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import AddEmployee from './Pages/AddEmployee'
import Employees from './Pages/Employees'
import { ToastContainer } from 'react-toast'

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Home />}>

        <Route index element={<h1 className="text-2xl font-bold">Dashboard Overview</h1>} />
          {/* Nested Pages */}
          <Route path="employees" element={<Employees />} />
          <Route path="add-employee" element={<AddEmployee />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
