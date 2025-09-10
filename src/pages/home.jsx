import { signOut } from 'firebase/auth';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
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
    <div>
      Hello {username}
      welcome to seedlink
      <button onClick={()=>logout()}>Logout</button>
    </div>
  )
}

export default Home
