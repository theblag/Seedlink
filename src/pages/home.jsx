import { signOut } from 'firebase/auth';
import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { auth, database } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

const Home = () => {
    const navigate = useNavigate()
    const [username, setUserName]=useState('')
    const [email, setEmail]=useState('')
    useEffect(() => {
        const fetchUserData = async () => {
          const currentUser = auth.currentUser;
    
          if (currentUser) {
            const userRef = doc(database, "Users", currentUser.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              const userData = userSnap.data();
              setUserName(userData.username || 'No Username');
              setEmail(userData.email || 'No email found');
            } else {
              navigate("/signin");
            }
          } else {
            navigate("/signin");
          }
        };
    
        fetchUserData();
      }, [navigate]);
    const logout = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome, {username}</h1>
        <p className="text-gray-400">Manage your VisioBiz AI experience</p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-black/30 p-6 rounded-xl border border-gold-primary/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white">Shops</h3>
            <span className="text-gold-primary text-2xl font-bold">0</span>
          </div>
          <p className="text-gray-400 text-sm">Create your first shop to get started</p>
        </div>
        
        <div className="bg-black/30 p-6 rounded-xl border border-gold-primary/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white">Products</h3>
            <span className="text-gold-primary text-2xl font-bold">0</span>
          </div>
          <p className="text-gray-400 text-sm">Add products to your catalog</p>
        </div>
        
        <div className="bg-black/30 p-6 rounded-xl border border-gold-primary/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white">AR Views</h3>
            <span className="text-gold-primary text-2xl font-bold">0</span>
          </div>
          <p className="text-gray-400 text-sm">Track customer AR interactions</p>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/create-shop" className="bg-black/20 hover:bg-black/40 p-4 rounded-lg border border-gray-700 flex flex-col items-center justify-center transition-all">
            <div className="w-12 h-12 bg-gold-primary/20 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <span className="text-white font-medium">Create Shop</span>
          </Link>
          
          <Link to="/add-product" className="bg-black/20 hover:bg-black/40 p-4 rounded-lg border border-gray-700 flex flex-col items-center justify-center transition-all">
            <div className="w-12 h-12 bg-gold-primary/20 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <span className="text-white font-medium">Add Product</span>
          </Link>
          
          <Link to="/ar-setup" className="bg-black/20 hover:bg-black/40 p-4 rounded-lg border border-gray-700 flex flex-col items-center justify-center transition-all">
            <div className="w-12 h-12 bg-gold-primary/20 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-white font-medium">Setup AR View</span>
          </Link>
          
          <div onClick={logout} className="bg-black/20 hover:bg-black/40 p-4 rounded-lg border border-gray-700 flex flex-col items-center justify-center transition-all cursor-pointer">
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <span className="text-white font-medium">Logout</span>
          </div>
        </div>
      </div>
      
      {/* User Profile */}
      <div className="bg-black/30 p-6 rounded-xl border border-gold-primary/30">
        <h2 className="text-xl font-bold text-white mb-4">Your Profile</h2>
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-20 h-20 bg-gold-primary/20 rounded-full flex items-center justify-center text-gold-primary text-2xl font-bold">
            {username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">{username}</h3>
            <p className="text-gray-400">{email}</p>
            <button className="mt-3 text-sm text-gold-primary hover:text-gold-light">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
