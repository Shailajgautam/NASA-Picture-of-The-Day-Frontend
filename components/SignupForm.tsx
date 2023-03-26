import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e :any ) => {
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Signup</button>
    </form>
  );
}
