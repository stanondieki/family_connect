import { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/signup/', formData);
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="username" placeholder="Username" onChange={handleChange} />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUp;