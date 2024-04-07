import React from 'react';

const ReservationsCard = ({ property }) => {
  return (
    <div className="flex bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={property.thumbnailUrl}
        alt="Property Thumbnail"
        className="w-32 h-auto object-cover"
      />
      <div className="p-4 flex-grow">
        <h2 className="text-lg font-semibold mb-2">{property.name}</h2>
        <p className="text-gray-600 mb-2">{property.address}</p>
        <p className="text-sm text-gray-500">Reserved by: {property.reservedBy}</p>
      </div>
    </div>
  );
};

export default ReservationsCard;
