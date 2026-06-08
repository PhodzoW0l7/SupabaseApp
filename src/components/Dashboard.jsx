import React from 'react'
import {UserAuth} from '../context/AuthContext'
import {useNavigate} from 'react-router-dom';

const Dashboard = () => {
  const {session,signOut}=UserAuth();
  const navigate = useNavigate();

  console.log(session);

  const handleSignOut=async (e) =>{
    e.preventDefault();
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h1>DASHBOARD</h1>
      <h2>Welcome, {session?.user?.email}</h2>
      <div className="">
        <p onClick={handleSignOut} className="hover:cursor-poiinter border inline-block px-4 py-3 mt-4">Sign out</p>
      </div>
    </div>
  )
}

export default Dashboard
