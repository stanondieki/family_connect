import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import axios from 'axios';

const Messages = () => {
  // State for messages
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch messages from the API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/messages'); // Replace with your API endpoint
        setMessages(response.data); // Assuming the API returns an array
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch messages. Please try again.');
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // Filtered messages based on search query
  const filteredMessages = messages.filter((message) =>
    message.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Messages</h1>

      {/* Search Bar */}
      <div className="flex items-center mb-4">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search messages..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Loading/Error */}
      {loading ? (
        <p className="text-center text-gray-600">Loading messages...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        // Message List
        <div className="flex-grow bg-white shadow-md rounded-lg p-4 overflow-y-auto">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((message) => (
              <div
                key={message.id}
                className="flex justify-between items-center p-3 border-b hover:bg-gray-100 cursor-pointer transition"
                onClick={() => setSelectedMessage(message)}
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{message.sender}</h2>
                  <p className="text-sm text-gray-600">{message.subject}</p>
                </div>
                <span className="text-sm text-gray-500">{message.time}</span>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No messages found.</p>
          )}
        </div>
      )}

      {/* Selected Message Display */}
      {selectedMessage && (
        <div className="bg-white mt-4 p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            {selectedMessage.subject}
          </h2>
          <p className="text-gray-600 mb-4">From: {selectedMessage.sender}</p>
          <p className="text-gray-700">
            This is a placeholder message body for "{selectedMessage.subject}" sent by{' '}
            {selectedMessage.sender}.
          </p>
          <button
            onClick={() => setSelectedMessage(null)}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Close
          </button>
        </div>
      )}

      {/* New Message Button */}
      <button
        className="flex items-center justify-center mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        onClick={() => alert('New Message Modal Placeholder')}
      >
        <FaPlus className="mr-2" />
        New Message
      </button>
    </div>
  );
};

export default Messages;
