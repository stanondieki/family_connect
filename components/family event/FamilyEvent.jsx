import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FamilyEventsPage = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        event_date: '',
    });

    useEffect(() => {
        // Fetch events from the backend
        axios.get('/api/events')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({
            ...newEvent,
            [name]: value
        });
    };

    const handleAddEvent = () => {
        axios.post('/api/events', newEvent)
            .then(response => {
                setEvents([...events, response.data]);
                setNewEvent({ title: '', description: '', event_date: '' });
            })
            .catch(error => console.error('Error adding event:', error));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Family Events</h1>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New Event</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        value={newEvent.title}
                        onChange={handleInputChange}
                        placeholder="Event Title"
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        name="description"
                        value={newEvent.description}
                        onChange={handleInputChange}
                        placeholder="Event Description"
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="datetime-local"
                        name="event_date"
                        value={newEvent.event_date}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleAddEvent}
                        className="w-full bg-blue-600 text-white p-3 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300"
                    >
                        Add Event
                    </button>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Upcoming Events</h2>
            <ul className="space-y-6">
                {events.map((event) => (
                    <li key={event.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                        <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
                        <p className="text-gray-600 mt-2">{event.description}</p>
                        <p className="text-gray-500 mt-2">{new Date(event.event_date).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FamilyEventsPage;
