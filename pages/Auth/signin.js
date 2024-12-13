import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { PATH_AUTH } from '@/routes';  // Adjust this if needed

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Placeholder for the form submission functionality
    const submit = (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        
        // Logic for submission will be added later
        
        setIsSubmitting(false);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f4f7fa' }}>
            <Head>
                <title>Sign In - Family Connect Platform</title>
            </Head>

            <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '8px',
                width: '100%',
                maxWidth: '400px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign In to Your Account</h2>
                <form onSubmit={submit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '8px' }}>Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                boxSizing: 'border-box',
                                fontSize: '14px'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '8px' }}>Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                boxSizing: 'border-box',
                                fontSize: '14px'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="checkbox"
                                id="remember"
                                style={{ marginRight: '8px' }}
                            />
                            <label htmlFor="remember" style={{ fontSize: '14px' }}>Remember me</label>
                        </div>
                        <Link href={PATH_AUTH + '/forgot-password'} passHref
                             style={{ fontSize: '14px', color: '#007bff' }}>
                                Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            opacity: isSubmitting ? 0.6 : 1
                        }}
                    >
                        {isSubmitting ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p style={{ fontSize: '14px' }}>
                        Don&apos;t have an account?{' '}
                        <Link href={PATH_AUTH + '/signup'} passHref
                            style={{ color: '#007bff' }}>
                                Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signin;
