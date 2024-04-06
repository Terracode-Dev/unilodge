import React, { useState, useEffect } from 'react';
import { getUserIdFromToken, getToken } from '../utils/authService';
import PropertyCard from '../components/PropertyCardll';

const token = getToken();
const userid = getUserIdFromToken(token);
const Properties = () => {
  const [properties, setProperties] = useState([]);

    useEffect(() => {
      // Fetch property data from PostgreSQL database
      fetchProperties();
    }, []);
  
    const fetchProperties = async () => {
      try {
        const response = await fetch(`http://localhost:3000/property/${userid}`);
        if (response.status === 200) {
          const data = await response.json();
          setProperties(data);
          console.log(data);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    console.log(properties);
    console.log(userid);
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Properties</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-screen">
          {properties.map(property => (
            <PropertyCard key={property.propid} property={property} />
          ))}
        </div>
      </div>
    );
  };

  export default Properties;
