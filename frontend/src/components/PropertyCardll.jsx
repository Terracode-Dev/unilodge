import React,{useState} from 'react';
import EditPropertyModal from './EditPropertyModal';

const PropertyCard = ({ property }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
      <img
        src={property.picture}
        alt="Property"
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{property.name}</h2>
        <p className="text-gray-600 mb-2">{property.address}</p>
        <div className="text-sm">
          Status:{' '}
          <span
            className={`${
              property.status === 'approved'
                ? 'text-green-600'
                : property.status === 'declined'
                ? 'text-red-600'
                : 'text-yellow-600'
            } font-bold`}
          >
            {property.status.toUpperCase()}
          </span>
        </div>
        <button
          className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-md"
          onClick={toggleModal}
        >
          Edit
        </button>
      </div>
      {showModal && (
        <EditPropertyModal
          property={property}
          closeModal={toggleModal}
        />
      )}
    </div>
  );
};

export default PropertyCard;
