import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

function AddStudent() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    dob: "",
    idNo: "",
    degreeProgram: "",
    enrolledCourses: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student Data Submitted:", formData);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <div className="p-6 flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4">Add Student</h1>
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">First Name</label>
                  <input type="text" name="firstName" className="w-full p-2 border rounded" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium">Last Name</label>
                  <input type="text" name="lastName" className="w-full p-2 border rounded" value={formData.lastName} onChange={handleChange} required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input type="email" name="email" className="w-full p-2 border rounded" value={formData.email} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium">Address</label>
                <input type="text" name="address" className="w-full p-2 border rounded" value={formData.address} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Date of Birth</label>
                  <input type="date" name="dob" className="w-full p-2 border rounded" value={formData.dob} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium">ID Number</label>
                  <input type="text" name="idNo" className="w-full p-2 border rounded" value={formData.idNo} onChange={handleChange} required />
                </div>
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
                <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded ">Register</button>
                <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded ">Notify Student</button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AddStudent;