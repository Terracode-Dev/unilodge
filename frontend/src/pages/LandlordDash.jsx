import {useState, useEffect} from 'react';
import ReservationsCard from '../components/ReservationsCard';
import { isAuthenticated } from '../utils/authService';
import UnauthorizedPage from './UnAuth';
import Properties from '../components/PropertiesLandlord';
import { MapShower, PinSelectMap } from '../utils/mapService';
import { getToken, getUserIdFromToken } from '../utils/authService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const token = getToken();
const userid = getUserIdFromToken(token);

const mapPart = new PinSelectMap();


const LandlordDash = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // This ensures markers are added once the component and map are ready

  return (
    isAuthenticated()?
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
          Reservation
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
    </div>: <div>
      <UnauthorizedPage />
    </div>
  );
};


const AddProperty = () => {

  const [formData, setFormData] = useState({
    propertyName: '',
    address: '',
    price: '',
    description: '',
    picture: null,
  });
  
  //const mapPart = new PinSelectMap();

  useEffect(() => {
    const exec = async () => {
      const mapDiv = document.getElementById('map');
      if (mapDiv) {
        await mapPart.start(mapDiv);
      }
    };
    exec();
  }, []); 

  useEffect(() => {
    const previewBeforeUpload = (id) => {
      const inputElement = document.querySelector(`#${id}`);
      if (!inputElement) return;
      
      inputElement.addEventListener("change", function(e) {
        if (e.target.files.length === 0) {
          return;
        }
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        const previewDivElement = document.querySelector(`#${id}-preview div`);
        if (previewDivElement) {
          previewDivElement.innerText = file.name;
        }
        const previewImgElement = document.querySelector(`#${id}-preview img`);
        if (previewImgElement) {
          previewImgElement.src = url;
        }
        setFormData({ ...formData, picture: file });
      });
    };
    
    previewBeforeUpload("picture");
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //console.log("location data: " , mapPart.getCapturedLocation())
    const { lat, lng } = mapPart.getCapturedLocation();
    // formData.lat = lat;
    // formData.lng = lng;

    try {
      // Upload image to ImageBB
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('image', formData.picture);

      const imagebbResponse = await fetch('https://api.imgbb.com/1/upload?key=9cc677417b95856e79018a9a63248658', {
        method: 'POST',
        body: formDataToSubmit
      });

      const imagebbData = await imagebbResponse.json();
      const imageUrl = imagebbData.data.display_url;
      console.log('Image uploaded successfully:', imageUrl);

      // Prepare data to send to your backend API
      const propertyData = {
        price: formData.price,
        address: formData.address,
        lat: lat,
        lng: lng,
        picture: imageUrl,
        name: formData.propertyName,
        description: formData.description,
        userid: userid
      };

      // Send property data (including image URL) to your backend API
      const backendResponse = await fetch('http://localhost:3000/property/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(propertyData)
      });

      if(backendResponse.status === 201) {
        toast.success('Property added successfully');
      }

      // Clear form fields after successful submission
      setFormData({
        propertyName: '',
        address: '',
        price: '',
        description: '',
        picture: null
      });

    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 bg-slate">
      <div className="bg-gray-100 rounded-lg p-4">
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="propertyName" className="block text-gray-700 font-bold mb-2">Property Name</label>
            <input type="text" id="propertyName" name="propertyName" value={formData.propertyName} onChange={handleInputChange} className="w-full border rounded p-2" required />
          </div>
          
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address</label>
            <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} className="w-full border rounded p-2" required />
          </div>
          
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price</label>
            <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} className="w-full border rounded p-2" required />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} className="w-full border rounded p-2" rows="4"></textarea>
          </div>
          
          <div className="relative p-3">
            <input type="file" id="picture" accept="image/*" name="picture" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
            <label htmlFor="picture" id="picture-preview" className="relative block w-full h-full">
              <img src="https://bit.ly/3ubuq5o" alt="" className="w-[150px] h-[100px] object-cover"/>
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-20 text-white font-semibold w-[150px]">
                <span>+</span>
              </div>
            </label>
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Property</button>
        </form>
      </div>
      
      <div className="h-full bg-gray-200 rounded-lg">
        <div id="map" className='rounded-lg' style={{ height: '100%', width: '100%' }}></div>
      </div>
    </div>
  );
};

const Reservations = () => {
  const [properties, setProperties] = useState([]);
  let [count, setCount] = useState(0);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      if (count === 0) {
      fetch(`http://localhost:3000/reserve/${userid}`)
            .then(response => response.json())
            .then(data => {
              setProperties(data);
              console.log("property list: ", data);
              setCount(1);
            })
            .catch(error => console.error('Error fetching properties:', error));

          }


      // const response = await fetch(`http://localhost:3000/reserve/${userid}`);
      // if (response.ok) {
      //   const data = await response.json();
      //   setProperties(data);
      //   console.log("property list: ", data);
      // } else {
      //   throw new Error('Failed to fetch data');
      // }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-white">Reservations</h1>
      <div className="grid grid-cols-1 gap-4">
        {properties.map(property => (
          console.log("single property: ", property),
          <ReservationsCard key={property.resID} property={property} />
          //<ReservationsCard property={{ thumbnailUrl:'https://via.placeholder.com/500', name: 'Property 2', address: '456 Elm St', reservedBy: 'Jane Doe' }} />
        ))}
        {/* <ReservationsCard property={{ thumbnailUrl:'https://via.placeholder.com/500', name: 'Property 1', address: '123 Main St', reservedBy: 'John Doe' }} />
        <ReservationsCard property={{ thumbnailUrl:'https://via.placeholder.com/500', name: 'Property 2', address: '456 Elm St', reservedBy: 'Jane Doe' }} />
        <ReservationsCard property={{ thumbnailUrl:'https://via.placeholder.com/500', name: 'Property 3', address: '789 Oak St', reservedBy: 'John Smith' }} />
        <ReservationsCard property={{ thumbnailUrl:'https://via.placeholder.com/500', name: 'Property 4', address: '101 Pine St', reservedBy: 'Jane Smith' }} /> */}
      </div>
    </div>
  );
};




export default LandlordDash;
