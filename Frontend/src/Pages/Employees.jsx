import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toast';
import { Trash2, X, Pencil } from 'lucide-react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Employees = () => {

    const { employees, listEmployees, loading } = useContext(AppContext)

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: "",
        email: "",
        position: "",
        department: "",
        salary: "",
        dateOfJoining: "",
    });

    const [sortBy, setSortBy] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        listEmployees();
    }, []);

    // DELETE
    const confirmDelete = (item) => {
        setSelectedEmployee(item);
        setShowDeleteModal(true);
    };

    //Delete Employee Function
    const removeEmployee = async () => {
        try {
            const response = await axios.post(backendUrl + "/api/employees/delete", { id: selectedEmployee._id });

            if (response.data.success) {
                toast.success(response.data.message);
                await listEmployees();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        } finally {
            setShowDeleteModal(false);
            setSelectedEmployee(null);
        }
    };

    // UPDATE
    const openEditModal = (employee) => {
        setSelectedEmployee(employee);
        setEditFormData({
            name: employee.name,
            email: employee.email,
            position: employee.position,
            department: employee.department,
            salary: employee.salary,
            dateOfJoining: employee.dateOfJoining.split("T")[0], // 👈 format for input[type=date]
        });
        setShowEditModal(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    //Update Function
    const updateEmployee = async () => {
        try {
            if (!selectedEmployee?._id) {
                toast.error("Invalid employee selected");
                return;
            }

            const response = await axios.put(
                `${backendUrl}/api/employees/update/${selectedEmployee._id}`,
                editFormData
            );
            toast.success("Employee updated successfully!");
            await listEmployees();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update employee");
        } finally {
            setShowEditModal(false);
            setSelectedEmployee(null);
        }
    };

    // FILTER + SORT
    const filteredEmployees = employees
        .filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.department.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === "name") return a.name.localeCompare(b.name);
            if (sortBy === "salary") return Number(a.salary) - Number(b.salary);
            if (sortBy === "joiningDate") return new Date(a.dateOfJoining) - new Date(b.dateOfJoining);
            return 0;
        });

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Employees</h2>

            {/* Search & Sort Controls */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">Sort By</option>
                    <option value="name">Name</option>
                    <option value="salary">Salary</option>
                    <option value="joiningDate">Joining Date</option>
                </select>
            </div>

            {loading ? (
                <p className="mt-5 text-gray-600">Loading employees...</p>
            ) : filteredEmployees.length === 0 ? (
                <p className="mt-5 text-gray-600">No employees found.</p>
            ) : (
                <table className="w-full border-collapse border mt-5">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Position</th>
                            <th className="border p-2">Department</th>
                            <th className="border p-2">Salary</th>
                            <th className="border p-2">Joining Date</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map(item => (
                            <tr key={item._id}>
                                <td className="border p-2">{item.name}</td>
                                <td className="border p-2">{item.position}</td>
                                <td className="border p-2">{item.department}</td>
                                <td className="border p-2">₹{item.salary}</td>
                                <td className="border p-2">{new Date(item.dateOfJoining).toLocaleDateString()}</td>
                                <td className="border p-2 flex gap-3 justify-center">
                                    <Pencil
                                        onClick={() => openEditModal(item)}
                                        className="w-5 h-5 cursor-pointer text-blue-600 hover:text-blue-800"
                                    />
                                    <Trash2
                                        onClick={() => confirmDelete(item)}
                                        className="w-5 h-5 cursor-pointer text-red-600 hover:text-red-800"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowDeleteModal(false)}
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
                        <p className="mb-6">
                            Are you sure you want to delete{" "}
                            <span className="font-bold">{selectedEmployee?.name}</span>?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={removeEmployee}
                                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-[450px] relative">
                        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowEditModal(false)}>
                            <X className="w-5 h-5" />
                        </button>
                        <h3 className="text-lg font-semibold mb-4">Edit Employee</h3>

                        <div className="flex flex-col gap-3">
                            <input
                                type="text"
                                name="name"
                                value={editFormData.name}
                                onChange={handleEditChange}
                                placeholder="Name"
                                className="p-2 border rounded"
                            />
                            <input
                                type="email"
                                name="email"
                                value={editFormData.email}
                                onChange={handleEditChange}
                                placeholder="Email"
                                className="p-2 border rounded"
                            />
                            <input
                                type="text"
                                name="position"
                                value={editFormData.position}
                                onChange={handleEditChange}
                                placeholder="Position"
                                className="p-2 border rounded"
                            />
                            <select
                                name="department"
                                value={editFormData.department}
                                onChange={handleEditChange}
                                className="p-2 border rounded"
                            >
                                <option value="">Select Department</option>
                                <option value="IT">IT</option>
                                <option value="HR">HR</option>
                                <option value="Finance">Finance</option>
                                <option value="Marketing">Marketing</option>
                            </select>
                            <input
                                type="number"
                                name="salary"
                                value={editFormData.salary}
                                onChange={handleEditChange}
                                placeholder="Salary"
                                className="p-2 border rounded"
                            />
                            <input
                                type="date"
                                name="dateOfJoining"
                                value={editFormData.dateOfJoining}
                                onChange={handleEditChange}
                                className="p-2 border rounded"
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-5">
                            <button onClick={() => setShowEditModal(false)} className="px-4 py-2 rounded-lg border border-gray-300 
                            hover:bg-gray-100">
                                Cancel
                            </button>
                            <button onClick={updateEmployee} className="px-4 py-2 rounded-lg bg-blue-600 
                            text-white hover:bg-blue-700">
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Employees;