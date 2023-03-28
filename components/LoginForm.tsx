import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';


export default function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
        email: email,
        password: password
      });
  
      // Store JWT token in localStorage
      localStorage.setItem('token', response.data.token);
      router.push("/")
  
      // Alert user of successful login
    } catch (error:any) {
      // Alert user of error
      alert(error.response.data.message);
    }
  };
  
  



  const handleGoogleSign = () => {
    router.push(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`);
  };



  return (
    <div className="min-h-screen flex pl-4 pt-4 pb-4 pr-4 bg-cover bg-center bg-gradient-to-r from-gray-900 via-gray-900 to-transparent" style={{ backgroundImage: "url('1.jpg')" }}>
      <div className="max-w-md w-full space-y-6 p-8 bg-gray-900 bg-opacity-60 rounded-lg shadow-lg">
        <div>
          <h2 className="text-2xl font-bold text-white text-left">Login To See NASA Astronomy Picture</h2>
        </div>
        <form className="  mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <input type="email" id="email" name="email" placeholder="Email" className="w-full rounded-md border-gray-300 shadow-sm p-3 mt-1 text-white bg-gray-900 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="relative">

            <input type="password" id="password" name="password" placeholder="Password" className="w-full rounded-md border-gray-300 shadow-sm p-3 mt-1 text-white bg-gray-900 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className=" flex text-right">
            <p className='text-sm text-white'>Don't have an account?</p>
            <Link href="/signup" passHref className="text-sm text-white pl-1 font-bold hover:text-gray-400"> Signup
            </Link>
          </div>
          <div className='pt-2'>
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">
              Login
            </button>
          </div>
        </form>
        <div className="flex  items-center justify-center mt-4">
          <span className="border-b border-gray-600 text-white font-bold text-sm leading-5 px-4">OR</span>
        </div>
        <div className="mt-4">
          <button className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleGoogleSign}>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
//hedgehog
