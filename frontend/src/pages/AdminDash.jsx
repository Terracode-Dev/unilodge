import React,{useEffect,useState} from 'react'
import { isAuthenticated, getToken, getUserIdFromToken } from '../utils/authService';
import UnauthorizedPage from './UnAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const token = getToken();
const userId = getUserIdFromToken(token);

const AdminDash = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
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
        Add Member
      </button>
      <button
        className={`mr-2 px-4 py-2 ${
          activeTab === 'tab2' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
        }`}
        onClick={() => handleTabChange('tab2')}
      >
        Create Blog
      </button>
      
      </div>

      <div className="border rounded p-4">
      {activeTab === 'tab1' && <AddMember />}
      {activeTab === 'tab2' && <CreateBlog />}
      </div>
    </div>: 
    <div>
      <UnauthorizedPage />
    </div>
  )
}

const AddMember = () => {
  const [formData, setFormData] = useState({
    Name: '',
    username: '',
    email: '',
    pwd: '',
    type: '',
    contactNumber: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Determine which API endpoint to call based on the selected type
    let apiEndpoint;
    switch (formData.type) {
      case 'student':
        apiEndpoint = 'http://localhost:3000/students/signup';
        break;
      case 'landlord':
        apiEndpoint = 'http://localhost:3000/landlords/signup';
        break;
      case 'warden':
        apiEndpoint = 'http://localhost:3000/wardens/signup';
        break;
      default:
        // Handle default case
        break;
    }

    // Prepare data to send to the backend
    const requestData = {
      name: formData.Name,
      username: formData.username,
      email: formData.email,
      password: formData.pwd,
      contact: formData.contactNumber
    };

    try {
      // Make API request
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        // Handle success
        console.log('Member added successfully');
        // Clear form data after successful submission
        setFormData({
          Name: '',
          username: '',
          email: '',
          pwd: '',
          type: '',
          contactNumber: ''
        });
        toast.success('Member added successfully');
      } else {
        // Handle error
        console.error('Failed to add member');
        toast.error('Failed to add member');
      }
    } catch (error) {
      console.error('API request error:', error);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gray-100 rounded-lg p-4">
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="Name" className="block text-gray-700 font-bold mb-2">Name</label>
            <input type="text" id="Name" name="Name" value={formData.Name} onChange={handleInputChange} className="w-full border rounded p-2" required />
          </div>
          
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} className="w-full border rounded p-2" required />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full border rounded p-2" required />
          </div>
          
          <div className="mb-4">
            <label htmlFor="pwd" className="block text-gray-700 font-bold mb-2">Password</label>
            <input type="password" id="pwd" name="pwd" value={formData.pwd} onChange={handleInputChange} className="w-full border rounded p-2" required />
          </div>

          <div className="mb-4">
            <label htmlFor="contactNumber" className="block text-gray-700 font-bold mb-2">Contact Number</label>
            <input type="text" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} className="w-full border rounded p-2" required />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Role</label>
            <div>
              <label htmlFor="student" className="mr-2">
                <input type="radio" id="student" name="type" value="student" onChange={handleInputChange} className="mr-1" required />
                Student
              </label>
              <label htmlFor="landlord" className="mr-2">
                <input type="radio" id="landlord" name="type" value="landlord" onChange={handleInputChange} className="mr-1" required />
                Landlord
              </label>
              <label htmlFor="warden" className="mr-2">
                <input type="radio" id="warden" name="type" value="warden" onChange={handleInputChange} className="mr-1" required />
                Warden
              </label>
            </div>
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Member</button>
        </form>
      </div>
      <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center text-center">
        <p className="text-4xl font-bold text-gray-800">Add member to Unilodge Ecosystem</p>
      </div>
    </div>
  );
};

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    image: '', 
  });
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
      });
    };
    
    previewBeforeUpload("image");
    
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    const apiKey = '9cc677417b95856e79018a9a63248658'; 
    const apiUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Image upload failed');
      }

      const data = await response.json();
      const imageUrl = data.data.url;

      setFormData({
        ...formData,
        image: imageUrl
      });
    } catch (error) {
      console.error('Image upload error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/admins/createblog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Blog added successfully!');
        toast.success('Blog added successfully!');
        // Optionally, redirect or perform another action upon success
      } else {
        console.error('Failed to add blog');
        toast.error('Failed to add blog');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to add blog');
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gray-100 rounded-lg p-4">
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} className="w-full border rounded p-2" />
          </div>
          
          <div className="mb-4">
            <label htmlFor="summary" className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea id="summary" name="summary" value={formData.summary} onChange={handleInputChange} className="w-full border rounded p-2" />
          </div>
          
          <div className="relative p-3">
            <input
              type="file"
              id="image"
              accept="image/*"
              name="image"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label htmlFor="image" className="relative block w-full h-full">
              <img
                src={formData.image || 'https://bit.ly/3ubuq5o'}
                alt=""
                className="w-[150px] h-[100px] object-cover"
              />
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-20 text-white font-semibold w-[150px]">
                <span>+</span>
              </div>
            </label>
          </div>
          
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Blog</button>
        </form>
      </div>
    </div>
  );
};


export default AdminDash
