import React, { useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { auth, database } from '../../config/firebase.js'
import { useNavigate, Link } from 'react-router-dom';
const Welcome = () => {
    const [username, setUserName]=useState('')
    const navigate = useNavigate()
    useEffect(() => {
        const fetchProfile = async () => {
        const user = auth.currentUser;
        if (user) {
            try {
            const docRef = doc(database, "Users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setUserName(userData.username || "");
            }
            } catch (error) {
            console.error("Error fetching user profile:", error);
            }
        }
        };
        fetchProfile();
    }, []);
  return (
    <div>
      Welcome to Seedlink, {username}
      <button onClick={()=>navigate('/businessInfo')}>Continue</button>
    </div>
  )
}

export default Welcome
