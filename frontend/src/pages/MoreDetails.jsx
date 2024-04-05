import React from 'react';

const MoreDetails = () => {
  // Sample property details
  const propertyDetails = {
    title: 'Beautiful Home for Sale',
    price: '$500,000',
    bedrooms: 3,
    bathrooms: 2,
    area: '2000 sqft',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor lectus nec lorem gravida, nec bibendum mi ullamcorper.',
    image: 'https://via.placeholder.com/800x400/FF5733/FFFFFF/?text=Property+Image',
  };

  return (
    <div className="container mx-auto p-4  flex">
      <div className="">
        {/* Left side for the image */}
        <div className="bg-gray-100 rounded-lg shadow-md ">
          <img
            src={propertyDetails.image}
            alt="Property"
            className="w-full h-auto rounded-t-lg"
          />
        </div>
        {/* Right side for property details */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h1 className="text-3xl font-bold mb-4">{propertyDetails.title}</h1>
          <p className="text-lg mb-2">Price: {propertyDetails.price}</p>
          <p className="text-lg mb-2">Bedrooms: {propertyDetails.bedrooms}</p>
          <p className="text-lg mb-2">Bathrooms: {propertyDetails.bathrooms}</p>
          <p className="text-lg mb-2">Area: {propertyDetails.area}</p>
          <p className="text-lg mb-4">Description: {propertyDetails.description}</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
          Map
        </div>
    </div>
  );
};

export default MoreDetails;
