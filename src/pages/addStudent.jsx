import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    dob: "",
    idNo: "",
    degreeProgram: "",
    enrolledCourses: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    alert("Student Registered Successfully!");
  };

  const handleNotify = () => {
    alert("Notification Sent to Student!");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="p-6 max-w-lg mx-auto">
          <h1 className="text-2xl font-bold mb-4">Add Student</h1>
          <p className="mb-6">Welcome to the Admin Dashboard.</p>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Register Student</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">First Name</label>
                <input type="text" name="firstName" className="w-full p-2 border rounded" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium">Last Name</label>
                <input type="text" name="lastName" className="w-full p-2 border rounded" value={formData.lastName} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input type="email" name="email" className="w-full p-2 border rounded" value={formData.email} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium">Address</label>
                <input type="text" name="address" className="w-full p-2 border rounded" value={formData.address} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium">Date of Birth</label>
                <input type="date" name="dob" className="w-full p-2 border rounded" value={formData.dob} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium">ID Number</label>
                <input type="text" name="idNo" className="w-full p-2 border rounded" value={formData.idNo} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium">Degree Program</label>
                <input type="text" name="degreeProgram" className="w-full p-2 border rounded" value={formData.degreeProgram} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium">Enrolled Courses</label>
                <input type="text" name="enrolledCourses" className="w-full p-2 border rounded" value={formData.enrolledCourses} onChange={handleChange} required />
              </div>
              <div className="flex justify-between">
                <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleRegister}>Register Student</button>
                <button type="button" className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleNotify}>Notify Student</button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AddStudent;
