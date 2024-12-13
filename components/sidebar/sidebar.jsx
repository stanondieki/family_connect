import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {
  FaUserCircle,
  FaSearch,
  FaTree,
  FaSignOutAlt,
  FaEnvelope,
  FaCalendarAlt,
  FaCog,
} from 'react-icons/fa';

const Sidebar = ({ onSearchClick }) => {
  return (
    <aside className="bg-gradient-to-b w-80 from-gray-800 to-black text-white flex flex-col shadow-lg min-h-screen overflow-hidden">
      {/* Sidebar Title */}
      <div className="flex items-center justify-center py-6 border-b border-gray-700">
        FAMILY_CONNECT
      </div>

      {/* Navigation */}
      <nav className="flex-grow px-4 py-6 overflow-hidden">
        <ul className="space-y-6">
          <li>
            <Link
              href="/profile/profile"
              className="flex items-center space-x-3 py-3 px-4 hover:bg-gray-700 rounded transition duration-300"
            >
              <FaUserCircle className="text-2xl" />
              <span className="text-lg">Profile</span>
            </Link>
          </li>

          {/* Search Functionality */}
          <li>
            <button
              onClick={onSearchClick}
              className="w-full flex items-center space-x-3 py-3 px-4 text-left hover:bg-gray-700 rounded transition duration-300"
            >
              <FaSearch className="text-2xl" />
              <span className="text-lg">Search</span>
            </button>
          </li>

          <li>
            <Link
              href="/family_tree"
              className="flex items-center space-x-3 py-3 px-4 hover:bg-gray-700 rounded transition duration-300"
            >
              <FaTree className="text-2xl" />
              <span className="text-lg">Family Tree</span>
            </Link>
          </li>

          <li>
            <Link
              href="/messages/message"
              className="flex items-center space-x-3 py-3 px-4 hover:bg-gray-700 rounded transition duration-300"
            >
              <FaEnvelope className="text-2xl" />
              <span className="text-lg">Messages</span>
            </Link>
          </li>

          <li>
            <Link
              href="/Events/FamilyEvent"
              className="flex items-center space-x-3 py-3 px-4 hover:bg-gray-700 rounded transition duration-300"
            >
              <FaCalendarAlt className="text-2xl" />
              <span className="text-lg">Family Events</span>
            </Link>
          </li>

          <li>
            <Link
              href="/settings/settings"
              className="flex items-center space-x-3 py-3 px-4 hover:bg-gray-700 rounded transition duration-300"
            >
              <FaCog className="text-2xl" />
              <span className="text-lg">Settings</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="px-4 py-6 border-t border-gray-700">
        <button className="w-full flex items-center justify-center space-x-3 py-3 bg-red-600 rounded hover:bg-red-700 transition duration-300">
          <FaSignOutAlt className="text-2xl" />
          <span className="text-lg">Logout</span>
        </button>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  onSearchClick: PropTypes.func.isRequired, // Validation for the prop
};

export default Sidebar;
