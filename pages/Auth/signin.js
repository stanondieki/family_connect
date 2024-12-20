import { useState } from 'react';
import axios from 'axios';

const Login = () => {

  const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', formData);
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.error);
        }finally {
          setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Welcome Back</h1>
            <p className="text-center text-gray-600 mb-4">Please enter your credentials to log in</p>
                <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input 
                            id="email" 
                            type="email" 
                            placeholder="Enter your email address" 
                            value={formData.username} 
                            onChange={handleChange} 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            id="password" 
                            name="password" 
                            type="password" 
                            placeholder="Password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
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

export default Login;
