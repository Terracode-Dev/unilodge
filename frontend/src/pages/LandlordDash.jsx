import {useState, useEffect} from 'react';
import MapContainer from '../components/Map';

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
          Create Property
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
        {activeTab === 'tab1' && <Tab1Content />}
        {activeTab === 'tab2' && <Tab2Content />}
        {activeTab === 'tab3' && <Tab3Content />}
      </div>
    </div>
  );
};

const Tab1Content = () => {
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

const Tab2Content = () => {
  return <div>Tab 2 Content</div>;
};

const Tab3Content = () => {
  return <div>Tab 3 Content</div>;
};

export default LandlordDash;
