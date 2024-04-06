import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MoreDetailsModal from './MoreDetails'; // Import the modal component

const PropertyCard = ({ title, description, imageURL, link }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <img src={imageURL} alt={title} className="w-full h-20 object-cover mb-4" />
      <h3 className="text-lg font-bold">{title}</h3>
      <p>{description}</p>
      <div className="mt-4 flex justify-end">
        <button className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-950" onClick={openModal}>
          View More
        </button>
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
  );
};

export default PropertyCard;

