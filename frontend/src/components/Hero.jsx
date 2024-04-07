import React from 'react';

const Hero = () => {
  return (
    <div className="hero-section relative h-screen flex items-center justify-center">
      {/* Background image */}
      <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('src/assets/bg.png')" }}></div>
      
      {/* Content */}
      <div className="container mx-auto z-10 text-white px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="lg:w-10/12 mb-8 lg:mb-0">
            <h1 className="text-4xl font-bold mb-4">Find Your Perfect Accommodation</h1>
            <p className="text-lg">
              Welcome to our accommodation discovery platform. Whether you're a traveler seeking a cozy hostel for your next adventure, a homeowner looking to rent out your property, or a student searching for the perfect boarding, we've got you covered. Explore a wide range of accommodations tailored to your needs and preferences. With our intuitive search features and extensive database, finding your ideal place to stay has never been easier.
            </p>
          </div>
        </div>
        <div className='mt-8'>
          <a href="/login" className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg focus:outline-none ">
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
