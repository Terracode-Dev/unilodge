"use client";

import React from 'react'
import Link from 'next/link';

type Props = {}

function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleNavbar = () => {
      setIsOpen(!isOpen);
    };
  return (
    <div>
        <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-white font-bold text-3xl">Unilodge</div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium text-lg" href="/">Home</Link>
                <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium text-lg" href="/about">About</Link>
                <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium text-lg" href="/blog">Blog</Link>
                <div className="relative">
                  <button onClick={toggleNavbar} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium text-lg focus:outline-none">
                    Account
                  </button>
                  <div className={`${isOpen ? 'block' : 'hidden'} absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10`}>
                    <Link href="/login" passHref legacyBehavior>
                      <a className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Login</a>
                    </Link>
                    <Link href="/login" passHref legacyBehavior>
                      <a className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Sign Up</a>
                    </Link>
                    {/* Add more dropdown items as needed */}
                  </div>
                </div>
                {/* Add more links as needed */}
                
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={toggleNavbar} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out" aria-label="Main menu" aria-expanded="false">
              <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 sm:px-3">
          <a href="/" className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">Home</a>
          <a href="/about" className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">About</a>
          <a href="/blog" className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">Blog</a>
          <a href="/login" className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">Sign In</a>
          {/* Add more links as needed */}
        </div>
      </div>
    </nav>
    </div>
  )
}

export default Navbar
