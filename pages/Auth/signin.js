import { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const validateForm = () => {
        // Check for empty fields
        const requiredFields = ['email', 'password'];
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
            const response = await fetch('http://127.0.0.1:8000/api/auth/signin/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.email, // Using email as username
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }
            
            // Store tokens
            localStorage.setItem('accessToken', data.tokens.access);
            localStorage.setItem('refreshToken', data.tokens.refresh);
            
            // Store user data if needed
            localStorage.setItem('userData', JSON.stringify(data.user));
            
            alert('Login successful!');
            router.push('/homepage');
            
        } catch (error) {
            console.error('Login error:', error);
            
            if (!error.response) {
                setErrorMessage('Network error. Please check your connection and try again.');
            } else {
                setErrorMessage(error.message || 'Invalid credentials. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-900">Welcome Back</h1>
                <p className="text-center text-gray-600 mb-4">Please enter your credentials to log in</p>
                
                {errorMessage && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
                        {errorMessage.split('\n').map((error, index) => (
                            <p key={index} className="text-sm">{error}</p>
                        ))}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
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

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>

                        <a href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
                            Forgot your password?
                        </a>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading} 
                        className={`w-full p-3 text-white font-bold rounded-md ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200`}
                    >
                        {isLoading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account? <a href="/auth/signup" className="text-indigo-600 hover:underline">Sign up here</a>
                </p>

                <div className="mt-6 relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 bg-white p-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <img src="/icons/google.png" alt="Google Icon" className="w-5 h-5" />
                        Continue with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;