import { useState } from 'react';
import { login } from '../utils/authService' 

const SigninPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const formData  = {
        username,
        password,
        userType: selectedRole,
      }

      const response = await fetch('http://localhost:3000/login',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      if (response.ok){
        const data  = await response.json();
        login(data.token);

        switch(data.user.role){
          case 'landlord':
            window.location.href = '/landlord';
            break;
          case 'student':
            window.location.href = '/student';
            break;
          case 'warden':
            window.location.href = '/warden';
            break;
          case 'admin':
            window.location.href = '/admin';
            break;
          default:
            window.location.href = '/';
            break;
        }
        
      }

      // TODO redirect to the appropriate page based on the selected role
    } catch (error) {
      console.error('An error occurred', error);
    }


  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to Unilodge</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Email address</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-12">
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700">Login as</label>
              <select
                id="userType"
                name="userType"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="">Select a role</option>
                <option value="student">Student</option>
                <option value="warden">Warden</option>
                <option value="landlord">Landlord</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SigninPage;
