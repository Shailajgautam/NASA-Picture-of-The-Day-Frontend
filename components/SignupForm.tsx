import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
       axios.post("http://localhost:5000/signup", { email, password })
            .then( res => {
                alert(res.data.message)
                router.push("/login")
            })    
    }catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="min-h-screen flex pl-4 pt-4 pb-4 bg-cover bg-center bg-gradient-to-r from-gray-900 via-gray-900 to-transparent" style={{ backgroundImage: "url('1.jpg')" }}>
  <div className="max-w-md w-full space-y-8 p-8 bg-gray-900 bg-opacity-60 rounded-lg shadow-lg">
    <div>
      <h2 className="text-2xl font-bold text-white text-left">Signup To See NASA Astronomy Picture</h2>
    </div>
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="relative">
        <input type="email" id="email" name="email" placeholder='Enter email'className="w-full rounded-md border-gray-300 shadow-sm p-3 mt-1 text-white bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="relative">
  
        <input type="password" id="password" name="password" 
        placeholder='Password'
        className="w-full rounded-md border-gray-300 shadow-sm p-3 mt-1 text-white bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className='pt-6'>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">
          Signup
        </button>
      </div>
      <div className="flex items-center justify-center mt-4">
      <span className="border-b border-gray-600 text-white font-bold text-sm leading-5 px-4">OR</span>
    </div>
    <div className='flex text-center'>
        <Link href='/login' type="submit" className="w-full bg-blue-500 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">
          Login
        </Link>
      </div>
    </form>
   
  </div>
</div>
  );
}
