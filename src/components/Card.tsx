import React from 'react';

function Card({ imageSrc, title, description }) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:h-full md:w-48" src={imageSrc} alt="..." />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {title}
          </div>
          <p className="block mt-1 text-sm leading-tight font-normal text-black">
            {description}
          </p>
          <button className="mt-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded text-sm">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;

