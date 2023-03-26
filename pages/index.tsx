
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
    <div  className="min-h-screen bg-cover bg-center text-white"style={{ backgroundImage: "url('1.jpg')" }} >
      <div className='font-bold p-3'>
          <button onClick={handleLogout}>Logout</button>
      </div>
      <DashBoard />
    </div>
  )  
};