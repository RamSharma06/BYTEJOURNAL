import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
    toast.success('Redirecting to home...');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-6">Sorry, the page you are looking for does not exist.</p>
        <button
          onClick={handleGoHome}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
