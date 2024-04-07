import React from 'react';
import { Link } from 'react-router-dom';
import MoreDetailsModal from '../components/MoreDetails';

const WardenCard = ({ property }) => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleAccept = async () => {
    await updateStatus(property.propid, 'approved');
  }

  const handleDecline = async() => {
    await updateStatus(property.propid, 'declined');
  }

  const updateStatus = async (propid, status) => {
    await fetch(`http://localhost:3000/wardens/updatestat/${propid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: status })
    })
    .then(response => {
      if (response.ok) {
        // Handle success
        console.log(`Property status updated to ${status}`);
      } else {
        // Handle error
        console.error('Failed to update property status');
      }
    })
    .catch(error => {
      console.error('Error updating property status:', error);
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
        <h2 className="text-lg font-semibold mb-2">{property.name}</h2>
        <p className="text-gray-600 mb-2">{property.address}</p>
        <div className="mt-4 flex justify-end">
          <button className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600" onClick={handleAccept}>Accept</button>
          <button className="bg-red-500 text-white px-4 py-2 mr-2 rounded hover:bg-red-600" onClick={handleDecline}>Decline</button>
          
          <button className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-950" onClick={openModal}>View More</button>
        </div>
        {modalOpen && (
                <MoreDetailsModal
                    propertyDetails={{
                        title: property.title,
                        description: property.description,
                        image: property.picture,
                        price: property.price,
                        address: property.address,
                        contact: property.contact
                    }}
                    closeModal={closeModal}
                />
            )}
      </div>
    </div>
  );
};

export default WardenCard;
