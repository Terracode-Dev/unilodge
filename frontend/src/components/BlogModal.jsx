// BlogModal.js
import React from 'react';

const BlogModal = ({ title, content, author, date, image, onClose }) => {
  return (
    <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="modal-container bg-white w-5/6 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <h2 className="text-2xl font-bold">{title}</h2>
            <span className="close cursor-pointer" onClick={onClose}>&times;</span>
          </div>
          <img className="w-full mb-4" src={image} alt={title} />
          <p className="text-gray-700 text-base">{content}</p>
          <div className="mt-4">
            <p className="text-gray-600 text-base">Author: {author}</p>
            <p className="text-gray-600 text-base">Date: {date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;
