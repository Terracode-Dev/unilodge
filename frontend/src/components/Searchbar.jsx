import React, { useState } from 'react';

const SearchBar = ({ placeholder, onSearch }) => {
  const [priceRange, setPriceRange] = useState('');

  const handlePriceChange = (e) => {
    setPriceRange(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ priceRange });
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white flex items-center rounded-full shadow-xl">
        <form className="flex" onSubmit={handleSubmit}>
          <input
            className="rounded-l-full w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none"
            type="text"
            placeholder={placeholder}
            onChange={(e) => onSearch({ query: e.target.value })}
          />
          <select
            className="md:ml-2 rounded-full w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none"
            value={priceRange}
            onChange={handlePriceChange}
          >
            <option value="">Price Range</option>
            <option value="<10000">&lt; 10000</option>
            <option value="10000-25000">10000 - 25000</option>
            <option value=">25000">&gt; 25000</option>
          </select>
          <button
            type="submit"
            className="md:ml-2 bg-blue-500 text-white rounded-full px-6 py-2 m-2 hover:bg-blue-400 focus:outline-none flex items-center justify-center"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
