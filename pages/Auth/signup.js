import { useState } from 'react';
import { useRouter } from 'next/router';
import { signUp } from '@/utils/api';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const validateForm = () => {
        // Check for empty fields
        const requiredFields = ['username', 'phone', 'email', 'password', 'confirmPassword'];
        for (const field of requiredFields) {
            if (!formData[field].trim()) {
                setErrorMessage(`Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                return false;
            }
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setErrorMessage('Please enter a valid email address');
            return false;
        }

        // Validate phone number
        if (!/^\d+$/.test(formData.phone) || formData.phone.length < 10 || formData.phone.length > 15) {
            setErrorMessage('Please enter a valid phone number (10-15 digits)');
            return false;
        }

        // Validate password strength
        if (formData.password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long');
            return false;
        }

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Passwords do not match');
            return false;
        }

        return true;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error message when user starts typing
        setErrorMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setErrorMessage('');

        try {
            const data = await signUp({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                confirm_password: formData.confirmPassword,
                phone: formData.phone
            });
            
            // Store tokens
            localStorage.setItem('accessToken', data.tokens.access);
            localStorage.setItem('refreshToken', data.tokens.refresh);
            
            // Store user data if needed
            localStorage.setItem('userData', JSON.stringify(data.user));
            
            alert('Registration successful!');
            router.push('/homepage'); // Or wherever you want to redirect after login
            
        } catch (error) {
            console.error('Signup error:', error.response?.data);
            
            if (!error.response) {
                setErrorMessage('Network error. Please check your connection and make sure the backend server is running.');
            } else if (error.response?.data?.error) {
                setErrorMessage(typeof error.response.data.error === 'object' 
                    ? Object.values(error.response.data.error).flat().join('\n')
                    : error.response.data.error);
            } else {
                setErrorMessage('Something went wrong. Please try again.');
            }
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
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
                        {errorMessage.split('\n').map((error, index) => (
                            <p key={index} className="text-sm">{error}</p>
                        ))}
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
                                type="tel" 
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
                        className={`w-full p-3 text-white font-bold rounded-md ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200`}
                    >
                        {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account? <a href="/auth/signin" className="text-indigo-600 hover:underline">Login here</a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;