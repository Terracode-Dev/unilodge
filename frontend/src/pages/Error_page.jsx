import React from 'react';

const ErrorPage = () => {
    const error = React.useRouteError();
    console.error(error);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 to-blue-900">
      <div className="max-w-md w-full text-center p-8 bg-white rounded-lg shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-16 w-16 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <h2 className="mt-6 text-3xl font-bold text-gray-800">Oops! Something went wrong.</h2>
        <p className="mt-2 text-sm text-gray-600">The page you&apos;re looking for couldn&apos;t be found.</p>
        <a href="/" className="mt-4 inline-block bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded">
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
