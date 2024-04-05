// PropertyCard.js
import React from 'react';
import { Link } from 'react-router-dom';


const PropertyCard = ({ title, description, imageURL,link }) => {
    return (
        <div className="bg-white p-4 shadow-md rounded-lg">
            <img src={imageURL} alt={title} className="w-full h-20 object-cover mb-4" />
            <h3 className="text-lg font-bold">{title}</h3>
            <p>{description}</p>
            <div className='mt-4 flex justify-end'>
                <Link to={link}>
                <button className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-950">View More</button>
                </Link>
            </div>
        </div>
    );
};

export default PropertyCard;
