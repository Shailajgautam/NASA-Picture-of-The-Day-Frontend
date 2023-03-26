
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import DashBoard from '@/components/DashBoard';


export default function Index() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/verify', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            setLoggedIn(true);
          } else {
            localStorage.removeItem('token');
            router.push('/login');
          }
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem('token');
          router.push('/login');
        });
    } else {
      router.push('/login');
    }
  }, []);
  

  function handleLogout() {
    localStorage.removeItem('token');
    router.push('/login');
  }

  return (   
        <div  className="bg-gray-900 p-3  text-white min-h-screen" >

        <button onClick={handleLogout}>Logout</button>
        <DashBoard />
       
        </div>
  )  
};