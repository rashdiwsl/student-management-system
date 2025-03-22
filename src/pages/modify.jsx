import { useState } from "react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
const semesters = [
  "Semester 1", "Semester 2",
  "Semester 3", "Semester 4",
  "Semester 5", "Semester 6",
  "Semester 7", "Semester 8"
];

function MaintainPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <div className="p-6">
          <h1 className="text-xl font-bold mb-4">Maintain Courses</h1>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {semesters.map((semester, index) => (
              <button
                key={index}
                className="bg-blue-500 text-white p-3 rounded-md shadow-md hover:bg-blue-600"
              >
                {semester}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search by Course ID"
            className="border p-2 mb-4 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default MaintainPage;