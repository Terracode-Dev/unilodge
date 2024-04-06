import React from 'react'
import  developersData  from '../components/developer.jsx';
function About() {
  return (
    <div className='h-screen  bg-fixed bg-center bg-cover custom-img overflow-hidden'>
    <div className="container mx-auto p-8 "> 
      <h1 className="text-3xl font-bold mb-4 text-white">"StayFinder: Your Ultimate Guide to Boarding Houses and Hostels"</h1>
      <p className="text-lg text-white">
      Discover the perfect boarding house or hostel for your next adventure with StayFinder. Our platform provides a comprehensive database of accommodations tailored to your needs and preferences. Whether you're a budget traveler seeking affordable dormitory-style lodging or a student looking for a cozy room near campus, StayFinder has you covered. Explore user reviews, compare prices, and book directly through our secure platform. Say goodbye to endless searching and let StayFinder simplify your accommodation search today!

      </p>

      {/* Developer Table */}
      <section className="mt-8"> 
        <h2 className="text-2xl font-bold mb-4 text-white">Our Team</h2>
        <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="table-auto w-full min-w-max">
          <thead>
            <tr className='odd:bg-white'>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Skills</th>
            </tr>
          </thead>
          <tbody>
            {developersData.map((developer) => (
              <tr className='odd:bg-white even:bg-gray-100' key={developer.name}>
                <td className="border px-4 py-2">{developer.name}</td>
                <td className="border px-4 py-2">{developer.role}</td>
                <td className="border px-4 py-2">{developer.skills}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </section>
    </div>
    </div>
  );
};

export default About
