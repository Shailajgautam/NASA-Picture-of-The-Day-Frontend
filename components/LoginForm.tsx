import { useState , useEffect} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';


export default function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });

      console.log(response);
  
      const { token } = response.data;
  
      localStorage.setItem('token', token);
  
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };



  const handleGoogleSign = () => {
    const windowFeatures = 'menubar=no,location=no,resizable=yes,scrollbars=yes,status=no,width=400,height=600';
    const authWindow:any = window.open('http://localhost:5000/auth/google', '_blank', windowFeatures);
  
    // Set up an interval to check for the presence of the access token in localStorage
    const intervalId = setInterval(() => {
      const token = localStorage.getItem('token');
      if (token) {
        clearInterval(intervalId);
        authWindow.close();
        // Redirect the user to the home page or a restricted page that requires authentication
        router.push('/');
      }
    }, 1000);
  }
  
  
  return (
    <div className="min-h-screen flex pl-4 pt-4 pb-4 pr-4 bg-cover bg-center bg-gradient-to-r from-gray-900 via-gray-900 to-transparent" style={{ backgroundImage: "url('1.jpg')" }}>
  <div className="max-w-md w-full space-y-8 p-8 bg-gray-900 bg-opacity-60 rounded-lg shadow-lg">
    <div>
      <h2 className="text-2xl font-bold text-white text-left">Login</h2>
    </div>
    <form className=" pt-4 mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="relative">
        <input type="email" id="email" name="email" placeholder="Email" className="w-full rounded-md border-gray-300 shadow-sm p-3 mt-1 text-white bg-gray-900 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="relative">
      
        <input type="password" id="password" name="password" placeholder="Password" className="w-full rounded-md border-gray-300 shadow-sm p-3 mt-1 text-white bg-gray-900 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="text-right">
        <Link href="/signup" passHref className="text-sm text-white font-bold hover:text-gray-400">Don't have an account? Signup
        </Link>
      </div>
      <div className='pt-4'>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">
          Login
        </button>
      </div>
    </form>
    <div className="flex items-center justify-center mt-4">
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
