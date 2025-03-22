import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "Rashmi Rathnayake",
    email: "rashmi.@gmail.com",
    mobile: "12345678910",
    address: "Sri Lanka",
  });

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <div className="p-6 flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4">Profile</h1>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-96 text-center">
            <img 
              src="/profile-icon.png" 
              alt="Profile" 
              className="mx-auto w-24 h-24 mb-4 rounded-full" 
            />
            <div className="space-y-3">
              <div>
                <label className="block text-left font-semibold">Name</label>
                <input 
                  type="text" 
                  value={user.name} 
                  className="w-full p-2 border rounded" 
                  disabled
                />
              </div>
              <div>
                <label className="block text-left font-semibold">Email</label>
                <input 
                  type="email" 
                  value={user.email} 
                  className="w-full p-2 border rounded" 
                  disabled
                />
              </div>
              <div>
                <label className="block text-left font-semibold">Mobile No</label>
                <input 
                  type="text" 
                  value={user.mobile} 
                  className="w-full p-2 border rounded" 
                  disabled
                />
              </div>
              <div>
                <label className="block text-left font-semibold">Address</label>
                <input 
                  type="text" 
                  value={user.address} 
                  className="w-full p-2 border rounded" 
                  disabled
                />
              </div>
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Profile;
