import React, { useState } from 'react';

const EditPropertyModal = ({ property, closeModal }) => {
  const [editedProperty, setEditedProperty] = useState({
    name: property.name,
    address: property.address,
    description: property.description
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setEditedProperty({ ...editedProperty, [name]: value });
  };

  const handleSubmit = () => {
    // Perform submit action here, like sending data to server
    console.log("Edited Property:", editedProperty);
    // Close modal
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">Edit Property</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold mb-1">Name:</label>
          <input type="text" id="name" name="name" value={editedProperty.name} onChange={handleChange} className="w-full border rounded-md px-3 py-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-semibold mb-1">Address:</label>
          <input type="text" id="address" name="address" value={editedProperty.address} onChange={handleChange} className="w-full border rounded-md px-3 py-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-semibold mb-1">Description:</label>
          <textarea id="description" name="description" value={editedProperty.description} onChange={handleChange} rows="4" className="w-full border rounded-md px-3 py-2"></textarea>
        </div>
        <div className="flex justify-end">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2" onClick={handleSubmit}>Save</button>
          <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md" onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditPropertyModal;
