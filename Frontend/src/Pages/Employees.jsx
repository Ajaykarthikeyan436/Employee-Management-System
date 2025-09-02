import { ArrowLeftIcon } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Employees = () => {
    const [employees] = useState([
        { id: 1, name: "John Doe", position: "Developer", department: "IT" },
        { id: 2, name: "Jane Smith", position: "Manager", department: "HR" },
        { id: 3, name: "Agnel", position: "Field Worker", department: "Marketing" },
    ]);

    const navigate = useNavigate()

    return (
        <div className="p-6">
            <div className='flex gap-2 items-center'>
                <ArrowLeftIcon onClick={() => navigate('/dashboard')} className='w-6 h-6 cursor-pointer' />
                <h2 className="text-2xl font-bold">Employees</h2>
            </div>
            <table className="w-full border-collapse border mt-5">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Position</th>
                        <th className="border p-2">Department</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(item => (
                        <tr key={item.id}>
                            <td className="border p-2">{item.name}</td>
                            <td className="border p-2">{item.position}</td>
                            <td className="border p-2">{item.department}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Employees
