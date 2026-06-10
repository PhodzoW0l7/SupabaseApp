import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 

  const { signUpNewUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await signUpNewUser(email, password);
      if (result.success) {
        navigate('/dashboard'); 
      } else {
        setError(result.error.message);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
    {/* Left / Top Aesthetic Showcase Column (Hidden on mobile) */}
    <div className="hidden md:flex flex-1 relative bg-slate-900 items-center justify-center p-12 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-md text-center z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 mb-6 shadow-inner">
          🚀 Instant Deployment
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white lg:text-5xl">
          Get started with your project dashboard.
        </h1>
        <p className="mt-4 text-base text-slate-400 leading-relaxed">
          Create a unified space for your engineering telemetry, data layers, and visual charts.
        </p>
      </div>
    </div>

    {/* Right / Bottom Content Column */}
    <div className="flex-1 flex flex-col justify-center py-12 px-6 sm:px-12 lg:px-20 bg-white">
      <div className="mx-auto w-full max-w-sm xl:max-w-md">
        
        {/* Header Block */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Create an account
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/signin" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
              Sign in here
            </Link>
          </p>
        </div>

        {/* Form Container */}
        <div className="mt-10">
          <form onSubmit={handleSignup} className="space-y-5">
            
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
            </div>

            {/* Error Message UI */}
            {error && (
              <div className="rounded-xl bg-rose-50 border border-rose-100 p-4">
                <p className="text-sm font-medium text-rose-600 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                  {error}
                </p>
              </div>
            )}

            {/* Submit CTA Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-600/10 active:scale-[0.99] transition-all"
              >
                {loading ? (
                  <div className="flex items-center space-x-2.5">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Generating Account...</span>
                  </div>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
);

};

export default Signup;
