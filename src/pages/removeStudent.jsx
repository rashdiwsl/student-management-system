import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

const RemoveStudent = () => {
  const [formData, setFormData] = useState({
    idNo: "",
    degreeProgram: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRemove = () => {
    alert("Student Removed Successfully!");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="p-6 max-w-lg mx-auto">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          <p className="mb-6">Welcome to the Admin Dashboard.</p>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Remove Student</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">ID Number</label>
                <input type="text" name="idNo" className="w-full p-2 border rounded" value={formData.idNo} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium">Degree Program</label>
                <input type="text" name="degreeProgram" className="w-full p-2 border rounded" value={formData.degreeProgram} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium">Reason</label>
                <textarea name="reason" className="w-full p-2 border rounded" value={formData.reason} onChange={handleChange} required />
              </div>
              <div className="flex justify-center">
                <button type="button" className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleRemove}>Remove Student</button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default RemoveStudent;
