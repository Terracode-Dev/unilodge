// BlogCard.js
import React, { useState } from 'react';

const BlogCard = ({ title, content, image, onClick }) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg m-4 cursor-pointer bg-white" onClick={onClick}>
      <img className="w-full" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{content}</p>
      </div>
    </div>
  );
};

export default BlogCard;
