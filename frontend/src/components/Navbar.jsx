import React from 'react';
import { isAuthenticated, logout } from '../utils/authService';

const NavigationBar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-950 p-4">
      <div className="container mx-auto flex justify-between items-center relative">
        <div className="flex items-center">
          <span className="text-white text-4xl font-extrabold">Unilodge</span>
        </div>
        <div className="hidden md:flex">
          <a href="/" className="text-gray-300 hover:text-white font-semibold mr-4">Home</a>
          <a href="#" className="text-gray-300 hover:text-white font-semibold mr-4">About</a>
          <a href="#" className="text-gray-300 hover:text-white font-semibold mr-4">Contact</a>
          <a href="/blog" className="text-gray-300 hover:text-white font-semibold mr-4">Blog</a>
          {isAuthenticated()? 
            <button onClick={handleLogout} className="text-gray-300 font-semibold hover:text-white mr-4">Logout</button> :
            <>
              <a href="/login" className="text-gray-300 hover:text-white font-semibold mr-4">Login</a>
              <a href="/signup" className="text-gray-300 hover:text-white font-semibold mr-4">Signup</a>
            </>
            
          }
          
          
        </div>
        <div className="flex items-center md:hidden">
          <button className="text-white focus:outline-none" onClick={toggleMenu}>
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path
                d="M4 6h16M4 12h16m-7 6h7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className={`${isOpen ? "block" : "hidden"} md:hidden absolute bg-gray-800 top-16 left-0 w-full p-4`}>
          <a href="/" className="block font-semibold text-gray-300 hover:text-white mb-2">Home</a>
          <a href="#" className="block font-semibold text-gray-300 hover:text-white mb-2">About</a>
          <a href="#" className="block font-semibold text-gray-300 hover:text-white mb-2">Contact</a>
          <a href="/blog" className="text-gray-300 font-semibold hover:text-white mr-4">Blog</a>
          {isAuthenticated()?
            (
              <button onClick={handleLogout} className="block font-semibold text-gray-300 hover:text-white mb-2">Logout</button>
            ) :
            <a href="/login" className="block font-semibold text-gray-300 hover:text-white mb-2">Login</a>}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
