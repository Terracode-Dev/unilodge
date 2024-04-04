import React, { useState } from 'react';
import SearchBar from '../components/Searchbar';

const StudentDash = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState('');

    const handleSearch = (data) => {
        setSearchQuery(data.query);
        setPriceRange(data.priceRange);
        // Handle search functionality here
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Search bar */}
            <div className="bg-gray-200 p-4">
                <SearchBar placeholder="Search properties..." onSearch={handleSearch} />
            </div>

            {/* Content */}
            <div className="flex flex-col md:flex-row flex-1">
                <div className="w-full md:w-1/2 bg-gray-200 p-4 overflow-y-auto">
                    {/* List of properties */}
                    <div className="space-y-4">
                        <div className="bg-white p-4 shadow-md rounded-lg">
                            <h3 className="text-lg font-bold">Property 1</h3>
                            <p>Description of Property 1</p>
                        </div>
                        <div className="bg-white p-4 shadow-md rounded-lg">
                            <h3 className="text-lg font-bold">Property 2</h3>
                            <p>Description of Property 2</p>
                        </div>
                        <div className="bg-white p-4 shadow-md rounded-lg">
                            <h3 className="text-lg font-bold">Property 3</h3>
                            <p>Description of Property 3</p>
                        </div>
                        {/* Add more properties here */}
                    </div>
                </div>
                <div className="w-full md:w-1/2 bg-gray-500">
                    {/* Integrated map */}
                    <h2 className="text-xl font-bold text-white p-4">Map</h2>
                    {/* Add your map component here */}
                </div>
            </div>
        </div>
    );
};

export default StudentDash;
