import React from 'react';
import Link from 'next/link';
import { FaUserCircle, FaSearch, FaTree, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className=" bg-gradient-to-b w-80 from-gray-800 to-black text-white  flex-col shadow-lg">
      <div className="flex items-center justify-center py-6 border-b border-gray-700">
        FAMILY_CONNECT 
      </div>
      <nav className="flex-grow px-4 py-6">
        <ul className="space-y-6">
          <li>
            <Link href="/profile"
               className="flex items-center space-x-3 py-3 px-4 hover:bg-gray-700 rounded transition duration-300">
                <FaUserCircle className="text-2xl" />
                <span className="text-lg">Profile</span>
            </Link>
          </li>
          <li>
            <Link href="/search"
               className="flex items-center space-x-3 py-3 px-4 hover:bg-gray-700 rounded transition duration-300">
                <FaSearch className="text-2xl" />
                <span className="text-lg">Search</span>
            </Link>
          </li>
          <li>
            <Link href="/family_tree"
               className="flex items-center space-x-3 py-3 px-4 hover:bg-gray-700 rounded transition duration-300">
                <FaTree className="text-2xl" />
                 Family Tree
            </Link>
          </li>
        </ul>
      </nav>
      <div className="px-4 py-6 border-t border-gray-700">
        <button className="w-full flex items-center justify-center space-x-3 py-3 bg-red-600 rounded hover:bg-red-700 transition duration-300">
          <FaSignOutAlt className="text-2xl" />
          <span className="text-lg">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
