import axios from "axios";
import { createContext, useState } from "react";
import { backendUrl } from "../App";
import { getAuth } from "firebase/auth";
import { toast } from 'react-toast'

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        position: "",
        department: "",
        salary: "",
        dateOfJoining: "",
    });

    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(false);

    //Add Employee Function
    const EmployeeAdd = async (e) => {
        e.preventDefault();
        setLoading(true);

        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            toast.error("Login and Continue")
            return;
        }

        try {
            const response = await axios.post(backendUrl + "/api/employees/add", formData);

            toast.success("Employee Added Successfully!");
            console.log("Employee Saved:", response.data);

            setFormData({
                name: "",
                email: "",
                position: "",
                department: "",
                salary: "",
                dateOfJoining: "",
            });
        } catch (err) {
            console.error(err);
            toast.error("Failed to add employee");
        } finally {
            setLoading(false);
        }
    };

    //Listout Employees Function
    const listEmployees = async () => {
        try {
            setLoading(true);
            const response = await axios.get(backendUrl + "/api/employees/list");
            setEmployees(response.data);
        } catch (error) {
            console.log(error.message);
            toast.error("Failed to load employees");
        } finally {
            setLoading(false);
        }
    };

    const value = {
        employees, setEmployees, listEmployees, loading, setLoading, EmployeeAdd,
        formData, setFormData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider

