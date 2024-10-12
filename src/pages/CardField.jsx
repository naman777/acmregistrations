import React from 'react';

const CardField = ({ label, value }) => {
  const id = label.toLowerCase().replace(/\s/g, '-');

  return (
    <div className="p-4 mt-6 bg-white shadow-md rounded-lg w-full">
      <label htmlFor={id} className="block text-lg font-semibold mb-2">
        {label}
      </label>
      <div
        id={id}
        className="text-sm text-gray-700 bg-gray-100 p-3 rounded-md border border-gray-300"
        style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
      >
        {value || 'N/A'}
      </div>
    </div>
  );
};

export default CardField;
