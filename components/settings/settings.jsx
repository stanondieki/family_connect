// pages/settings.jsx

import React, { useState } from 'react';

const Settings = () => {
  // Sample state for settings
  const [setting1, setSetting1] = useState(false);  // Enable Feature 1
  const [setting2, setSetting2] = useState(true);   // Enable Feature 2
  const [darkMode, setDarkMode] = useState(false);  // Dark Mode
  const [emailNotifications, setEmailNotifications] = useState(true); // Email notifications
  const [selectedLanguage, setSelectedLanguage] = useState('en');  // Language selection

  // Handler functions to update settings
  const handleSetting1Change = () => setSetting1(!setting1);
  const handleSetting2Change = () => setSetting2(!setting2);
  const handleDarkModeChange = () => setDarkMode(!darkMode);
  const handleEmailNotificationsChange = () => setEmailNotifications(!emailNotifications);
  const handleLanguageChange = (e) => setSelectedLanguage(e.target.value);

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <h1 className="text-3xl font-semibold text-center mb-6">Settings</h1>
      
      <div className="space-y-6">
        {/* Setting 1 */}
        <div className="flex items-center justify-between bg-gray-100 p-4 rounded shadow-sm">
          <span className="text-lg">Enable Feature 1</span>
          <button
            onClick={handleSetting1Change}
            className={`px-4 py-2 rounded-md ${setting1 ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'}`}
          >
            {setting1 ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        {/* Setting 2 */}
        <div className="flex items-center justify-between bg-gray-100 p-4 rounded shadow-sm">
          <span className="text-lg">Enable Feature 2</span>
          <button
            onClick={handleSetting2Change}
            className={`px-4 py-2 rounded-md ${setting2 ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'}`}
          >
            {setting2 ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between bg-gray-100 p-4 rounded shadow-sm">
          <span className="text-lg">Dark Mode</span>
          <button
            onClick={handleDarkModeChange}
            className={`px-4 py-2 rounded-md ${darkMode ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'}`}
          >
            {darkMode ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        {/* Email Notifications */}
        <div className="flex items-center justify-between bg-gray-100 p-4 rounded shadow-sm">
          <span className="text-lg">Email Notifications</span>
          <button
            onClick={handleEmailNotificationsChange}
            className={`px-4 py-2 rounded-md ${emailNotifications ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'}`}
          >
            {emailNotifications ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        {/* Language Selection */}
        <div className="flex items-center justify-between bg-gray-100 p-4 rounded shadow-sm">
          <span className="text-lg">Language</span>
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="px-4 py-2 rounded-md bg-white text-black"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
          </select>
        </div>

        {/* Password Update */}
        <div className="bg-gray-100 p-4 rounded shadow-sm">
          <h3 className="text-lg font-semibold">Change Password</h3>
          <div className="mt-4 space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              className="w-full p-2 rounded border border-gray-300"
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full p-2 rounded border border-gray-300"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full p-2 rounded border border-gray-300"
            />
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Update Password</button>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Settings;
