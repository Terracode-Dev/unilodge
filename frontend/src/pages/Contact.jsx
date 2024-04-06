import React from 'react';

const ContactUs = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto justify-center flex items-center ">
        <div className="bg-white overflow-hidden w-1/2  shadow-sm sm:rounded-lg">
          <div className="p-6 bg-slate-200 border-b border-gray-200">
            <h1 className="text-3xl font-semibold text-gray-900 mb-6">Contact Us</h1>
            <div className="max-w-lg mx-auto">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm  font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-lg sm:text-sm border-gray-400 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-lg sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-lg sm:text-sm border-gray-300 rounded-md"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
