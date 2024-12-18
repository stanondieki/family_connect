import { useState } from 'react';
import { useRouter } from 'next/router';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'; 
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const RegisterPage = () => {
  const router = useRouter();

  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  // State for password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmationVisible, setIsPasswordConfirmationVisible] = useState(false);

  // State for errors
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { name, email, password } = formData;
  
      const response = await fetch(`${API_URL}/api/register`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', 
        body: JSON.stringify({ name, email, password })
      });
  
      if (!response.ok) {
        throw new Error(`Failed to register: ${response.statusText}`);
      }
  
      showNotification({ title: "Success", message: "Registration successful", color: "green" });
      await router.push(PATH_AUTH.signin);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError(err.message || 'Registration failed. Please check your input.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Create an Account</h1>
        <p className="text-center text-gray-500 mb-6">Join us and start your journey!</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400"
            required
          />
          <div className="relative">
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute right-4 top-3 text-gray-500"
            >
              {isPasswordVisible ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
          <div className="relative">
            <input
              type={isPasswordConfirmationVisible ? 'text' : 'password'}
              name="passwordConfirmation"
              placeholder="Confirm Password"
              value={formData.passwordConfirmation}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400"
              required
            />
            <button
              type="button"
              onClick={() => setIsPasswordConfirmationVisible(!isPasswordConfirmationVisible)}
              className="absolute right-4 top-3 text-gray-500"
            >
              {isPasswordConfirmationVisible ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
          <button
            type="submit"
            className={`w-full py-4 rounded-lg font-semibold transition duration-200 ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {error && <p className="mt-4 text-red-500 text-center font-semibold">{error}</p>}

        <p className="mt-8 text-center text-gray-600">Already have an account? 
          <a href="/Auth/signin" className="text-blue-500 font-semibold hover:underline"> Log in</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
