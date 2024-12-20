import { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');
        
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Passwords do not match.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/signup/', { 
                username: formData.username, 
                email: formData.email, 
                password: formData.password 
            });
            alert(response.data.message);
            setFormData({ username: '', email: '', password: '', confirmPassword: '' });
        } catch (error) {
            setErrorMessage(error.response?.data?.error || 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-900">Create Your Account</h1>
                <p className="text-center text-gray-600 mb-4">Sign up to get started and explore the platform</p>
                
                {errorMessage && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input 
                        id="username" 
                        name="username" 
                        type="text" 
                        placeholder="Enter Username" 
                        value={formData.username} 
                        onChange={handleChange} 
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
                        required 
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input 
                        id="phone" 
                        name="phone" 
                        type="text" 
                        placeholder="Enter Phone Number" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
                        required 
                        />
                    </div>
                    
                    </div>


                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input 
                            id="email" 
                            name="email" 
                            type="email" 
                            placeholder="Enter your email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
                            required 
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            id="password" 
                            name="password" 
                            type="password" 
                            placeholder="Enter your password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
                            required 
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            type="password" 
                            placeholder="Confirm your password" 
                            value={formData.confirmPassword} 
                            onChange={handleChange} 
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
                            required 
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading} 
                        className={`w-full p-3 text-white font-bold rounded-md ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                    >
                        {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account? <a href="/login" className="text-indigo-600 hover:underline">Login here</a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
