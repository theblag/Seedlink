import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = auth.currentUser;
  
  // Don't show navbar on landing page
  if (location.pathname === '/') {
    return null;
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-bg-primary py-4 shadow-md sticky top-0 z-50 border-b-2 border-gold-primary">
      <div className="container mx-auto px-4 flex justify-between items-center max-w-7xl">
        <Link to="/home" className="text-2xl font-bold text-white">
          <span className="tracking-wide">VisioBiz<span className="text-gold-primary font-extrabold">AI</span></span>
        </Link>
        
        <div className="flex gap-6 items-center">
          {isLoggedIn ? (
            <>
              <Link to="/home" className="text-white hover:text-gold-light font-medium relative after:absolute after:w-0 after:h-0.5 after:bg-gold-primary after:bottom-[-4px] after:left-0 hover:after:w-full after:transition-all">
                Dashboard
              </Link>
              <Link to="/shops" className="text-white hover:text-gold-light font-medium relative after:absolute after:w-0 after:h-0.5 after:bg-gold-primary after:bottom-[-4px] after:left-0 hover:after:w-full after:transition-all">
                Discover Shops
              </Link>
              <Link to="/ar-view" className="text-white hover:text-gold-light font-medium relative after:absolute after:w-0 after:h-0.5 after:bg-gold-primary after:bottom-[-4px] after:left-0 hover:after:w-full after:transition-all">
                AR View
              </Link>
              <button onClick={handleLogout} className="bg-teal text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-all hover:-translate-y-0.5">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="text-white hover:text-gold-light font-medium relative after:absolute after:w-0 after:h-0.5 after:bg-gold-primary after:bottom-[-4px] after:left-0 hover:after:w-full after:transition-all">
                Sign In
              </Link>
              <Link to="/signup" className="bg-gold-primary text-black px-4 py-2 rounded-lg font-medium hover:bg-gold-light transition-all hover:-translate-y-0.5">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;