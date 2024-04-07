import React from 'react';

const ReservationsCard = ({ property }) => {


  const handleAccept = async () => {
    const response = await fetch(`http://localhost:3000/reserve/${property.resStatid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: 'true' })
    });
  }

  const handleDecline = async () => {
    const response = await fetch(`http://localhost:3000/reserve/${property.resStatid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: 'false' })
    });
  }

  return (
    <div className="flex bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={property.picture}
        alt="Property Thumbnail"
        className="w-32 h-auto object-cover"
      />
      <div className="p-4 flex-grow">
        <h2 className="text-lg font-semibold mb-2">{property.propName}</h2>
        <p className="text-gray-600 mb-2">{property.Address}</p>
        <p className="text-sm text-gray-500">Reserved by: {property.student}</p>
        <div className="mt-4 flex justify-end space-x-4">
          <button onClick={handleAccept} className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:shadow-outline">
            Accept
          </button>
          <button onClick={handleDecline} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:shadow-outline">
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationsCard;

