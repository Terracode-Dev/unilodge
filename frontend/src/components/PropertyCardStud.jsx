// PropertyCard.js
import React from 'react';

const PropertyCard = ({ title, description, imageURL }) => {
    return (
        <div className="bg-white p-4 shadow-md rounded-lg">
            <img src={imageURL} alt={title} className="w-full h-20 object-cover mb-4" />
            <h3 className="text-lg font-bold">{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default PropertyCard;
