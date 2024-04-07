import React, { useEffect } from 'react';


const MoreDetailsModal = ({ propertyDetails, closeModal }) => {
  useEffect(() => {
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-md static">
        <button className="absolute top-0 right-0 p-2 " onClick={closeModal}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-200 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className='flex space-x-4 justify-center'>
          <div className="bg-gray-100 rounded-lg shadow-md ">
            <img src={propertyDetails.image} alt="Property" className="w-full h-auto rounded-lg" />
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 w-1/2">
          <h1 className="text-3xl font-bold mb-4">{propertyDetails.title}</h1>
          <p className="text-lg mb-2 font-semibold">Price: {propertyDetails.price}</p>
          <p className="text-lg mb-4">Description: {propertyDetails.description}</p>
            <p className="text-lg mb-2">Address: {propertyDetails.address}</p>
            <p className="text-lg mb-2">Contact: {propertyDetails.contact}</p>
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default MoreDetailsModal;
