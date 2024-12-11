import React from 'react';
import { FaUserCircle, FaTree, FaCog } from 'react-icons/fa';
import Link from 'next/link';

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-100" id='profile'>
      <div className="bg-gradient-to-b from-gray-800 to-black text-white p-6">
        <div className="flex items-center space-x-4">
          <FaUserCircle className="text-4xl" />
          <h1 className="text-3xl font-bold">John Doe</h1>
        </div>
        <p className="text-lg mt-2">Family Connect User</p>
      </div>

      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Personal Details</h2>
        <div className="space-y-3">
          <div>
            <strong>Email:</strong> john.doe@example.com
          </div>
          <div>
            <strong>Phone:</strong> +254 707 497 200
          </div>
          <div>
            <strong>Address:</strong> 123 Family St, Hometown, USA
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Family Tree</h2>
        <p className="text-lg">
          Explore and view your family tree.
        </p>
        <Link
          href="/family_tree"
          className="inline-block mt-4 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          View Family Tree
        </Link>
      </div>

      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Settings</h2>
        <p className="text-lg">
          Update your preferences and account settings.
        </p>
        <Link
          href="/settings"
          className="inline-block mt-4 py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Go to Settings
        </Link>
      </div>

      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <button className="w-full py-3 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
