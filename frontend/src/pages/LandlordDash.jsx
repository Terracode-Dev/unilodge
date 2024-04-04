import {useState, useEffect} from 'react';
import MapContainer from '../components/Map';
import PropertyCard from '../components/PropertyCardll';
import ReservationsCard from '../components/ReservationsCard';

const LandlordDash = () => {
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
          Add Property
        </button>
        <button
          className={`mr-2 px-4 py-2 ${
            activeTab === 'tab2' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => handleTabChange('tab2')}
        >
          Reservations
        </button>
        <button
          className={`mr-2 px-4 py-2 ${
            activeTab === 'tab3' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => handleTabChange('tab3')}
        >
          Properties
        </button>
      </div>

      <div className="border rounded p-4">
        {activeTab === 'tab1' && <AddProperty />}
        {activeTab === 'tab2' && <Reservations />}
        {activeTab === 'tab3' && <Properties />}
      </div>
    </div>
  );
};

const AddProperty = () => {
  const [formData, setFormData] = useState({
    propertyName: '',
    address: '',
    price: '',
    picture: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Now you can send the formData to your backend
  };

  // const handleMarkerCreate = (longitude, latitude) => {
  //   setFormData({
  //     ...formData,
  //     longitude,
  //     latitude
  //   });
  // };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gray-100 rounded-lg p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="propertyName" className="block text-gray-700 font-bold mb-2">Property Name</label>
            <input type="text" id="propertyName" name="propertyName" value={formData.propertyName} onChange={handleInputChange} className="w-full border rounded p-2" />
          </div>
          
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address</label>
            <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} className="w-full border rounded p-2" />
          </div>
          
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price</label>
            <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} className="w-full border rounded p-2" />
          </div>
          
          <div className="mb-4">
            <label htmlFor="picture" className="block text-gray-700 font-bold mb-2">Picture</label>
            <input type="file" id="picture" name="picture" accept="image/*" onChange={handleInputChange} className="w-full border rounded p-2" />
          </div>
          
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Property</button>
        </form>
      </div>
      
      <div className="h-full bg-gray-200 rounded-lg">
        <MapContainer />
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
      <h1 className="text-3xl font-bold mb-4">Reservations</h1>
      <div className="grid grid-cols-1 gap-4">
        {/* {properties.map(property => (
          <ReservationsCard key={property.id} property={property} />
        ))} */}
        <ReservationsCard property={{ thumbnailUrl:'https://via.placeholder.com/500', name: 'Property 1', address: '123 Main St', reservedBy: 'John Doe' }} />
        <ReservationsCard property={{ thumbnailUrl:'https://via.placeholder.com/500', name: 'Property 2', address: '456 Elm St', reservedBy: 'Jane Doe' }} />
        <ReservationsCard property={{ thumbnailUrl:'https://via.placeholder.com/500', name: 'Property 3', address: '789 Oak St', reservedBy: 'John Smith' }} />
        <ReservationsCard property={{ thumbnailUrl:'https://via.placeholder.com/500', name: 'Property 4', address: '101 Pine St', reservedBy: 'Jane Smith' }} />
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


export default LandlordDash;
