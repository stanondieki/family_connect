import React from 'react';
import { FaUserCircle, FaTree, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900" id="profile">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-white py-10 px-6 text-center">
        <div className="flex flex-col items-center">
          <FaUserCircle className="text-6xl mb-4" />
          <h1 className="text-4xl font-bold">John Doe</h1>
          <p className="text-lg mt-2 opacity-75">Family Connect User</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
        {/* Personal Details */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-2xl font-semibold mb-4">Personal Details</h2>
          <div className="space-y-3">
            <p><strong>Email:</strong> john.doe@example.com</p>
            <p><strong>Phone:</strong> +254 707 497 200</p>
            <p><strong>Address:</strong> 123 Family St, Hometown, USA</p>
          </div>
        </div>

        {/* Family Tree */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FaTree className="text-green-600" /> Family Tree
          </h2>
          <p className="text-lg mb-4">Explore and view your family tree.</p>
          <Link href="/family_tree">
            <button className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
              View Family Tree
            </button>
          </Link>
        </div>

        {/* Settings */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FaCog className="text-blue-600" /> Settings
          </h2>
          <p className="text-lg mb-4">Update your preferences and account settings.</p>
          <Link href="/settings">
            <button className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300">
              Go to Settings
            </button>
          </Link>
        </div>

        {/* Logout */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition flex items-center justify-center">
          <button className="w-full flex items-center justify-center gap-2 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </div>
    
  );
};

export default ProfilePage;
