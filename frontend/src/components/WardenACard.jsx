import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MoreDetailsModal from './MoreDetails';

const WardenACard = ({ title, description, imageURL, link, property }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
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
        <p className="text-sm text-gray-500"> Approved: {property.reservedBy}</p>
        <div className="mt-4 flex justify-end">
            <button className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-950" onClick={openModal}>View More</button>
        </div>
        {modalOpen && (
        <MoreDetailsModal
          propertyDetails={{
            title: title,
            description: description,
            image: imageURL,
            link: link,
          }}
          closeModal={closeModal}
        />
      )}
      </div>
    </div>
  );
};

export default WardenACard;