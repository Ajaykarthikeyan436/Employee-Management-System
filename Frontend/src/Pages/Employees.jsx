import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App';
import { toast } from 'react-toast';

const Employees = () => {
    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        listEmployees()
    },[])

    const removeEmployee = async (id) => {
        try {

            const response = await axios.post( backendUrl + "/api/employees/delete", {id} )

            if(response.data.success) {
                toast.success(response.data.message)
                await listEmployees()
            }
            else{
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    return (
        <div className="p-6">

            <h2 className="text-2xl font-bold">Employees</h2>

            {loading ? (
                <p className="mt-5 text-gray-600">Loading employees...</p>
            ) : employees.length === 0 ? (
                <p className="mt-5 text-gray-600">No employees found.</p>
            ) : (
                <table className="w-full border-collapse border mt-5">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Position</th>
                            <th className="border p-2">Department</th>
                            <th className='border p-2'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(item => (
                            <tr key={item._id}>
                                <td className="border p-2">{item.name}</td>
                                <td className="border p-2">{item.position}</td>
                                <td className="border p-2">{item.department}</td>
                                <td className='border p-2 cursor-pointer'><p onClick={() => removeEmployee(item._id)}>X</p></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>

    );
}

export default Employees
