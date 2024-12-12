import React, { useState } from 'react';
import { FaRegSun, FaMoon, FaRedoAlt, FaDownload, FaInfoCircle } from 'react-icons/fa';

const Settings = () => {
  // State variables
  const [setting1, setSetting1] = useState(false);
  const [setting2, setSetting2] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [treeTheme, setTreeTheme] = useState('Classic');
  const [profilePicture, setProfilePicture] = useState(null);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const SectionTitle = ({ title, icon }) => (
    <div className="flex items-center gap-2 mb-4">
      {icon}
      <h2 className="text-2xl font-semibold">{title}</h2>
    </div>
  );

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'ru', name: 'Russian' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hi', name: 'Hindi' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'nl', name: 'Dutch' },
    { code: 'tr', name: 'Turkish' },
    { code: 'sv', name: 'Swedish' },
    { code: 'no', name: 'Norwegian' },
    { code: 'pl', name: 'Polish' },
    { code: 'fi', name: 'Finnish' },
    { code: 'da', name: 'Danish' },
    { code: 'id', name: 'Indonesian' },
    { code: 'ms', name: 'Malay' },
    { code: 'th', name: 'Thai' },
    { code: 'vi', name: 'Vietnamese' },
  ];

  const themes = ['Classic', 'Modern', 'Minimalist', 'Nature', 'Artistic'];

  // Handlers
  const handleDarkModeChange = () => setDarkMode(!darkMode);
  const handleSetting1Change = () => setSetting1(!setting1);
  const handleSetting2Change = () => setSetting2(!setting2);
  const handleEmailNotificationsChange = () => setEmailNotifications(!emailNotifications);
  const handleLanguageChange = (e) => setSelectedLanguage(e.target.value);
  const handleTreeThemeChange = (e) => setTreeTheme(e.target.value);
  const handleProfilePictureChange = (e) => setProfilePicture(URL.createObjectURL(e.target.files[0]));

  return (
    <div
      className={`w-full min-h-screen transition-colors duration-300 ${
        darkMode ? 'bg-gray-900 text-blue-600' : 'bg-gray-50 text-black'
      }`}
    >
      <div className="py-8 px-6 sm:px-10 lg:px-20">
        <h1 className="text-4xl font-bold text-center mb-8">Family Tree Settings</h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <SectionTitle title="General Settings" icon={<FaRegSun size={24} />} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex gap-2 items-center">
                <FaMoon size={20} />
                <span>Dark Mode</span>
                <FaInfoCircle title="Toggle between dark and light themes." />
              </div>
              <button
                onClick={toggleDarkMode}
                className={`px-4 py-2 rounded-md text-white font-medium transition-all duration-300 ${
                  darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 hover:bg-gray-500'
                }`}
              >
                {darkMode ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            {/* Language Selection */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Select Language</h3>
              <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Settings */}
            <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <span className="text-lg">Reset Tree Settings</span>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8 mr-8">
          {/* Advanced Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 gap-6 mt-8 ">
            <div
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className="flex justify-between items-center cursor-pointer mb-4"
            >
              <h2 className="text-2xl font-semibold">Advanced Settings</h2>
              <span className="text-lg font-medium">{isAdvancedOpen ? '-' : '+'}</span>
            </div>

            {isAdvancedOpen && (
              <div>
                {/* Profile Picture Upload */}
                <div className="mb-4">
                  <label className="block text-lg mb-2">Upload Profile Picture</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700"
                  />
                  {profilePicture && (
                    <img
                      src={profilePicture}
                      alt="Preview"
                      className="mt-4 w-24 h-24 rounded-full shadow-md object-cover"
                    />
                  )}
                </div>

                {/* Tree Theme */}
                <div>
                  <label className="block text-lg mb-2">Tree Theme</label>
                  <select
                    value={treeTheme}
                    onChange={(e) => setTreeTheme(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {themes.map((theme) => (
                      <option key={theme} value={theme}>
                        {theme}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Download Tree */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between mt-8">
            <h2 className="text-2xl font-semibold mb-4">Download Family Tree</h2>
            <p className="text-lg mb-4">
              Download a copy of your family tree in a printable format.
            </p>
            <button
              onClick={() => alert('Downloading family tree...')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="w-full flex justify-between px-6 py-4 sm:px-10 lg:px-20">
        {/* Reset Button */}
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
        >
          <FaRedoAlt /> Reset Settings
        </button>

        {/* Download Button */}
        <button
          onClick={() => alert('Downloading Family Tree...')}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          <FaDownload /> Download Tree
        </button>
      </div>

            {isAdvancedOpen && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Profile Picture Upload */}
                <div>
                  <label className="block text-lg mb-2">Upload Profile Picture</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700"
                  />
                  {profilePicture && (
                    <img
                      src={profilePicture}
                      alt="Preview"
                      className="mt-4 w-24 h-24 rounded-full shadow-md object-cover"
                    />
                  )}
                </div>

                {/* Tree Theme */}
                <div>
                  <label className="block text-lg mb-2">Tree Theme</label>
                  <select
                    value={treeTheme}
                    onChange={(e) => setTreeTheme(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {themes.map((theme) => (
                      <option key={theme} value={theme}>
                        {theme}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
  )

        {/* Bottom Action Buttons */}
        <div className="w-full flex justify-between py-6 px-4 sm:px-10 lg:px-20">
          {/* Reset Button */}
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
          >
            <FaRedoAlt /> Reset Settings
          </button>

          {/* Download Button */}
          <button
           

          onClick={() => alert('Downloading Family Tree...')}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          <FaDownload /> Download Tree
        </button>
      </div>
    
  
};

export default Settings;