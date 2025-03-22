import { useState } from "react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

const courses = [
  { id: "C001", semester: "Fall 2024", lastUpdate: "2025-03-20" },
  { id: "C002", semester: "Spring 2025", lastUpdate: "2025-03-18" },
  { id: "C003", semester: "Summer 2025", lastUpdate: "2025-03-15" },
];

function Maintain() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = courses.filter((course) =>
    course.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <div className="p-6">
          <h1 className="text-xl font-bold mb-4">Maintain Courses</h1>
          <input
            type="text"
            placeholder="Search by Course ID"
            className="border p-2 mb-4 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <table className="w-full border-collapse border border-gray-300 bg-white shadow-md rounded-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Course ID</th>
                <th className="border border-gray-300 p-2">Semester</th>
                <th className="border border-gray-300 p-2">Last Update</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.id} className="text-center">
                  <td className="border border-gray-300 p-2">{course.id}</td>
                  <td className="border border-gray-300 p-2">{course.semester}</td>
                  <td className="border border-gray-300 p-2">{course.lastUpdate}</td>
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

export default Maintain;