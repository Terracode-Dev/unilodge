import {useState, useEffect} from 'react';
// import MapContainer from '../components/Map';
import PropertyCard from '../components/PropertyCardll';
import WardenCard from '../components/WardenCard';

const WardenDash = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className=" m-6">
      <div className="flex mb-4">
        <button
          className={`mr-2 px-4 py-2 ${
            activeTab === 'tab1' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => handleTabChange('tab1')}
        >
          Pending
        </button>
        <button
          className={`mr-2 px-4 py-2 ${
            activeTab === 'tab2' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => handleTabChange('tab2')}
        >
          Properties
        </button>
      </div>

      <div className="border rounded p-4">
        {activeTab === 'tab1' && <Reservations />}
        {activeTab === 'tab2' && <Properties />}
      </div>
    </div>
  );
};



const Reservations = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch('YOUR_API_ENDPOINT');
      if (response.ok) {
        const data = await response.json();
        setProperties(data.properties);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Pending List</h1>
      <div className="grid grid-cols-1 gap-4">
        {/* {properties.map(property => (
          <ReservationsCard key={property.id} property={property} />
        ))} */}
        <WardenCard property={{ thumbnailUrl:'https://via.placeholder.com/500', name: 'Property 1', address: '123 Main St', reservedBy: 'John Doe', link:'../more' }} />
        <WardenCard property={{ thumbnailUrl:'https://via.placeholder.com/500', name: 'Property 2', address: '456 Elm St', reservedBy: 'Jane Doe', link:'../more' }} />
        <WardenCard property={{ thumbnailUrl:'https://via.placeholder.com/500', name: 'Property 3', address: '789 Oak St', reservedBy: 'John Smith', link:'../more' }} />
        <WardenCard property={{ thumbnailUrl:'https://via.placeholder.com/500', name: 'Property 4', address: '101 Pine St', reservedBy: 'Jane Smith', link:'../more' }} />
      </div>
    </div>
  );
};

const Properties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Fetch property data from PostgreSQL database
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch('YOUR_API_ENDPOINT');
      if (response.ok) {
        const data = await response.json();
        setProperties(data.properties);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Properties</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-screen">
        {/* {properties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))} */}

        <PropertyCard property={{ imageUrl:'https://via.placeholder.com/500', name: 'Property 1', address: '123 Main St', status: 'approved' }} />
        <PropertyCard property={{ imageUrl:'https://via.placeholder.com/500', name: 'Property 2', address: '456 Elm St', status: 'rejected' }} />
        <PropertyCard property={{ imageUrl:'https://via.placeholder.com/500', name: 'Property 3', address: '789 Oak St', status: 'pending' }} />
        <PropertyCard property={{ imageUrl:'https://via.placeholder.com/500', name: 'Property 4', address: '101 Pine St', status: 'approved' }} />
        <PropertyCard property={{ imageUrl:'https://via.placeholder.com/500', name: 'Property 5', address: '112 Birch St', status: 'rejected' }} />
        <PropertyCard property={{ imageUrl:'https://via.placeholder.com/500', name: 'Property 6', address: '131 Cedar St', status: 'pending' }} />
      </div>
    </div>
  );
};


export default WardenDash;
