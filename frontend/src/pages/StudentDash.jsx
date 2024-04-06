import React, { useState, useEffect } from 'react';
import SearchBar from '../components/Searchbar';
import Map from '../components/Map';
import PropertyCard from '../components/PropertyCardStud';
import { isAuthenticated } from '../utils/authService';
import UnauthorizedPage from './UnAuth';

const StudentDash = () => {
    const [properties, setProperties] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState('');

    useEffect(() => {
        // Fetch properties from API
        fetch('/api/properties')
            .then(response => response.json())
            .then(data => setProperties(data))
            .catch(error => console.error('Error fetching properties:', error));
    }, []);

    const handleSearch = (data) => {
        setSearchQuery(data.query);
        setPriceRange(data.priceRange);
        // Handle search functionality here
    };

    return (
        isAuthenticated()?
        <div className="flex flex-col h-screen">
            {/* Search bar */}
            <div className="bg-gray-200 p-4">
                <SearchBar placeholder="Search properties..." onSearch={handleSearch} />
            </div>

            {/* Content */}
            <div className="flex flex-col md:flex-row flex-1">
                <div className="w-full md:w-1/2 bg-gray-200 p-4 overflow-y-auto">
                    {/* List of properties */}
                    <div className="space-y-4 h-full overflow-y-auto">
                        {/* {properties.map(property => (
                            <PropertyCard
                                key={property.id}
                                title={property.property_name}
                                description={property.description}
                                imageURL={property.imageURL}
                            />
                        ))} */}
                        <PropertyCard title="Property 1" description="Description 1" imageURL="https://via.placeholder.com/300" />
                        <PropertyCard title="Property 2" description="Description 2" imageURL="https://via.placeholder.com/300" />
                        <PropertyCard title="Property 3" description="Description 3" imageURL="https://via.placeholder.com/300" />
                    </div>
                </div>
                <div id='map' className="w-full md:w-1/2 bg-gray-500">
                    {/* Integrated map */}
                    
                </div>
            </div>
        </div>: <div>
            <UnauthorizedPage />
        </div>
    );
};

export default StudentDash;
