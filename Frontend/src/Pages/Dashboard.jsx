import React from 'react'
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {

    const { employees, listEmployees, loading } = useContext(AppContext);

    useEffect(() => {
        listEmployees();
    }, []);

    const totalEmployees = employees.length;
    const departmentsCount = new Set(employees.map((e) => e.department)).size;
    const avgSalary =
        totalEmployees > 0
            ? Math.round(
                employees.reduce((acc, emp) => acc + Number(emp.salary || 0), 0) /
                totalEmployees
            )
            : 0;

    return (
        <div className='space-y-8'>
            <div>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="shadow-md">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold">Total Employees</h3>
                            <p className="text-2xl font-bold">{totalEmployees}</p>
                        </div>
                    </div>

                    <div className="shadow-md">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold">Departments</h3>
                            <p className="text-2xl font-bold">{departmentsCount}</p>
                        </div>
                    </div>

                    <div className="shadow-md">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold">Avg Salary</h3>
                            <p className="text-2xl font-bold">₹{avgSalary}</p>
                        </div>
                    </div>
                </div>

                {/* Recent Employees */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Recent Employees</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2 text-left">Name</th>
                                    <th className="p-2 text-left">Department</th>
                                    <th className="p-2 text-left">Position</th>
                                    <th className="p-2 text-left">Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.slice(-5).reverse().map((emp) => (
                                    <tr key={emp._id} className="border-t">
                                        <td className="p-2">{emp.name}</td>
                                        <td className="p-2">{emp.department}</td>
                                        <td className="p-2">{emp.position}</td>
                                        <td className="p-2">
                                            {new Date(emp.dateOfJoining).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
