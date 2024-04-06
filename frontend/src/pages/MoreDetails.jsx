'use client';
import React from 'react';
import { useEffect } from 'react';
import { MapShower } from '../utils/mapService';
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

    //methanata add kale ah methanata load krpn en data ek click krm
    latitude : "6.821919023919709",
    longitude : "80.04181147862813"
  };

  useEffect(() => {
    const mapPart = new MapShower();
    let mapDiv = document.getElementById('map');
    if (!mapDiv) {
      // Perhaps handle the error or retry logic
      console.log("there is no any element with id - map")
      return;
    }
  
    const exec = async () => {
      await mapPart.start(mapDiv);
      
        
        const marker = {
          name: propertyDetails.title,
          func: () => { alert("Marker clicked!"); },
          coordinates: { lat: Number(propertyDetails.latitude), long: Number(propertyDetails.longitude) },
        };
  
        mapPart.addMarker(marker);
        
      
    };
  
    exec();
  }, []);

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
      <div id = "map" className="bg-white shadow-md p-4 h-[600px] w-[600px]">
        
        </div>
    </div>
  );
};

export default MoreDetails;
