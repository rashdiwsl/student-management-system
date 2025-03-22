import { useState } from "react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";


const students = [
  { id: "S001", name: "John Doe", email: "john@example.com" },
  { id: "S002", name: "Jane Smith", email: "jane@example.com" },
  { id: "S003", name: "Mike Johnson", email: "mike@example.com" },
];

function ListStudent() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter((student) =>
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <div className="p-6">
          <h1 className="text-xl font-bold mb-4">List of Students</h1>
          <input
            type="text"
            placeholder="Search by Student ID"
            className="border p-2 mb-4 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <table className="w-full border-collapse border border-gray-300 bg-white shadow-md rounded-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Student ID</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="text-center">
                  <td className="border border-gray-300 p-2">{student.id}</td>
                  <td className="border border-gray-300 p-2">{student.name}</td>
                  <td className="border border-gray-300 p-2">{student.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default ListStudent;
