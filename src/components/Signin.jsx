import React, { useState } from 'react'; // 1. Added missing React imports
import { Link, useNavigate } from 'react-router-dom'; // 2. Added missing React Router imports
import { UserAuth } from '../context/AuthContext'; // 3. Added missing Context import

const Signin = () => {
  // 4. Added all the missing local state trackers
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 5. Connect to your Supabase login context function and page navigator
  const { signInUser } = UserAuth();
  const navigate = useNavigate();

  // 6. Moved the function INSIDE the component where it belongs
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); 
    
    try {
      // Changed from signUpNewUser to signInUser since this is the login page!
      const result = await signInUser(email, password);
      if (result.success) {
        navigate('/dashboard'); 
      } else {
        // If Supabase sends back an error string, apply it to our error box
        setError(result.error);
      }
    } catch (err) {
      setError("An unexpected login error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don't have an account yet?{' '}
          <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-150 underline">
            Register here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-gray-100">
          {/* Linked the corrected function name here */}
          <form onSubmit={handleSignIn} className="space-y-6">
            
            {/* Email Field Group */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-150"
                />
              </div>
            </div>

            {/* Password Field Group */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-150"
                />
              </div>
            </div>

            {/* Error Alert Box */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                <div className="flex">
                  <div className="text-sm text-red-700 font-medium">{error}</div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed transition-all duration-150"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

// Now this line works perfectly because the file compiled successfully!
export default Signin;
