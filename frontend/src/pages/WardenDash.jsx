import {useState, useEffect} from 'react';
// import MapContainer from '../components/Map';
import PropertyCard from '../components/PropertyCardll';
import WardenCard from '../components/WardenCard';
import WardenACard from '../components/WardenACard';
import WardenRCard from '../components/WardenRCard';

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
          Approved
        </button>
        <button
          className={`mr-2 px-4 py-2 ${
            activeTab === 'tab3' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => handleTabChange('tab3')}
        >
          Rejected
        </button>
      </div>

      <div className="border rounded p-4">
        {activeTab === 'tab1' && <Pending />}
        {activeTab === 'tab2' && <Approved />}
        {activeTab === 'tab3' && <Rejected />}
      </div>
    </div>
  );
};



const Pending = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch('http://localhost:3000/wardens/pending');
      if (response.ok) {
        const data = await response.json();
        setProperties(data);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-white">Pending List</h1>
      <div className="grid grid-cols-1 gap-4">
         {properties.map(property => (
          <WardenCard key={property.propid} property={property} />
        ))}
      </div>
    </div>
  );
};

const Approved = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Fetch property data from PostgreSQL database
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch('http://localhost:3000/wardens/approved');
      if (response.ok) {
        const data = await response.json();
        setProperties(data);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-white">Properties</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-screen">
         {properties.map(property => (
          <WardenACard key={property.propid} property={property} />
        ))} 
      </div>
    </div>
  );
};

const Rejected = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Fetch property data from PostgreSQL database
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch('http://localhost:3000/wardens/rejected');
      if (response.ok) {
        const data = await response.json();
        setProperties(data);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-white">Rejected</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-screen">
         {properties.map(property => (
          <WardenRCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default WardenDash;
