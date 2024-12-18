// pages/login.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '../../utils/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const LoginPage = () => {
  const router = useRouter();

  // State for form data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for errors and loading
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = { email, password };

      // Call login API function
      const response = await login(data);

      // If login is successful, store token in localStorage/sessionStorage
      localStorage.setItem('access_token', response.access_token);

      // Redirect user to home or dashboard
      router.push('/dashboard');  
    } catch (err) {
      setError('Login failed. Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white shadow-2xl rounded-lg p-10 w-full max-w-md">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Welcome Back</h1>
        <p className="text-center text-gray-600 mb-4">Please enter your credentials to log in</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <button 
            type="submit" 
            className={`w-full py-3 rounded-lg font-semibold text-white transition duration-200 ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        {error && <p className="mt-6 text-red-500 text-center">{error}</p>}
        
        <div className="mt-6 flex justify-between items-center">
          <a href="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</a>
          <a href="/Auth/signup" className="text-blue-500 hover:underline">Sign up</a>
        </div>

        <div className="mt-8 border-t pt-6">
          <button className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-200 font-semibold flex items-center justify-center">
            <img src="/icons/google.png" alt="Google Icon" className="w-5 h-5 mr-3" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
