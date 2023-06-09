
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DashBoard from '@/components/DashBoard';


export default function Index() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);


  useEffect(() => {
    if (!router.isReady) return;
    const { token, _ } = router.query;
    console.log(router.query);
    if (token) {
      console.log("Token found from google");
      localStorage.setItem('token', token as string);
    } else {
      //Get token from localStorage
      const localToken = localStorage.getItem('token');
      if (localToken) {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/verify`, {
          headers: {
            Authorization: `Bearer ${localToken}`,
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
    }
  }, [router.isReady]);

  function handleLogout() {
    localStorage.removeItem('token');
    router.push('/login');
  }


  return (
    <div className="min-h-screen bg-cover bg-center text-white" style={{ backgroundImage: "url('1.jpg')" }} >
      <div className='font-bold p-3'>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <DashBoard />
    </div>
  )


};