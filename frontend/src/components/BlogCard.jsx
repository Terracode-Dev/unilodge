// BlogCard.js
import React, { useState } from 'react';

const BlogCard = ({ article },onclick) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg m-4 cursor-pointer bg-white">
      <img className="w-full" src={article.image} alt={article.title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{article.title}</div>
        <p className="text-gray-700 text-base">{article.description}</p>
      </div>
    </div>
  );
};

export default BlogCard;
