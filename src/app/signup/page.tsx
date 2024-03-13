"use client"

import React, { useState } from 'react';

enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.USER);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can implement your signup logic
    console.log('Signup with:', email, password, selectedRole);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">Sign up for an account</h2>
        </div>
        <form className="mt-8" onSubmit={handleSignup}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm">
            <div>
              <input aria-label="Email address" name="email" type="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="-mt-px">
              <input aria-label="Password" name="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="role" className="block text-sm font-medium leading-5 text-gray-700">Select Role</label>
            <select id="role" name="role" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value as UserRole)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 rounded-md">
              <option value={UserRole.USER}>Land Loard</option>
              <option value={UserRole.ADMIN}>Student</option>
            </select>
          </div>
          <div className="mt-6">
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 10a7 7 0 1 1 14 0 7 7 0 0 1-14 0zm2 0a5 5 0 1 0 10 0 5 5 0 0 0-10 0zm11-4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-5 8.586V14a1 1 0 0 1-2 0v-1.414A2 2 0 0 1 7.414 11H6a1 1 0 0 1 0-2h1.414A2 2 0 0 1 10 8.586V10a1 1 0 0 1 2 0v1.414A2 2 0 0 1 14.586 13H16a1 1 0 0 1 0 2h-1.414A2 2 0 0 1 11 13.414z" clipRule="evenodd" />
                </svg>
              </span>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
