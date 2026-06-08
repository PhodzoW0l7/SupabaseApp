import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Initialised to false boolean

  const { session, signUpNewUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear past errors before attempting a new submit
    
    try {
      const result = await signUpNewUser(email, password);
      if (result.success) {
        navigate('/dashboard'); // Fixed the capital "N" typo here
      } else {
        // If supabase returned a clean error object, capture its message
        setError(result.error.message);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignup} className="max-w-md m-auto pt-24">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Welcome to the Signup Page! Please fill in your details to create an account.
        </h2>
        <p className="text-center">Already have an account? <Link to="/signin" className="text-blue-500 underline">Sign in here</Link></p>
        
        <div className="flex flex-col py-2">
            <input 
              value={email} // Bound to state
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email" 
              className="p-3 mt-6 border rounded" 
              type="email" 
              required
            />
            <input 
              value={password} // Bound to state
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password" 
              className="p-3 mt-6 border rounded" 
              type="password" 
              required
            />
            
            <button 
              type="submit" 
              disabled={loading} 
              className="bg-blue-500 text-white p-3 mt-6 rounded disabled:bg-blue-300"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
            
            {error && <p className='text-red-600 text-center pt-4 font-semibold'>{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default Signup;
