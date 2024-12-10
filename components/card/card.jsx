import React from 'react';

const Card = ({ title, description, buttonText, onClick }) => {
  return (
    <div className="bg-white bg-opacity-20 rounded-lg p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-sm">{description}</p>
      <button
        className="mt-4 bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Card;
