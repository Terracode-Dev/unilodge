// MoreDetailsModal.jsx
import React from 'react';

const MoreDetailsModal = ({ isOpen, propertyDetails, onClose }) => {
    const handleReservation = async () => {
        let lid = propertyDetails.lid;
        let pid = propertyDetails.pid;
        let uid = propertyDetails.uid;

        const response = await fetch(`http://localhost:3000/reserve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ lid: lid, pid: pid , uid: uid})
    });


        // Handle reservation logic here, such as sending a request to the backend
        console.log(`Reservation button clicked ${lid} ${pid} ${uid}`);
    };

    return (
        <>
            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 shadow-md rounded-lg flex">
                        <div className="w-1/2">
                            <img src={propertyDetails.image} alt={propertyDetails.title} className="w-full h-auto mb-4" />
                        </div>
                        <div className="w-1/2 px-4">
                            <h3 className="text-lg font-bold mb-2">{propertyDetails.title}</h3>
                            <p className="font-bold mb-2">Price: {propertyDetails.price}</p>
                            <p className="mb-4">{propertyDetails.description}</p>
                            <p className="mb-2">Address: {propertyDetails.address}</p>
                            <p className="mb-4">Contact: {propertyDetails.contact}</p>
                            <button className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-950" onClick={handleReservation}>
                                Reserve
                            </button>
                            <button className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-950 ml-2" onClick={onClose}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MoreDetailsModal;
