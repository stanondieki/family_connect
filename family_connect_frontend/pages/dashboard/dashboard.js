// pages/dashboard.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const DashboardPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      router.push('/login');  // Redirect to login if no token is found
      return;
    }

    // Optionally, make a request to get user data using the token
    fetch('http://127.0.0.1:8000/api/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((response) => response.json())
    .then((data) => setUser(data))
    .catch((err) => {
      console.error(err);
      router.push('/login');
    });
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      <p>Hi, {user.name}</p>
    </div>
  );
};

export default DashboardPage;
