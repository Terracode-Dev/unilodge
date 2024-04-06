import React from 'react';
import { Link } from 'react-router-dom';

const WardenRCard = ({ property }) => {
  return (
    <div className="flex bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={property.picture}
        alt="Property Thumbnail"
        className="w-32 h-auto object-cover"
      />
      <div className="p-4 flex-grow">
        <h2 className="text-lg font-semibold mb-2">{property.name}</h2>
        <p className="text-gray-600 mb-2">{property.address}</p>
        <div className="mt-4 flex justify-end">
          <Link to={property.link}>
            <button className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-950">View More</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WardenRCard;
