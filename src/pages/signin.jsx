import { auth, database, googleprovider } from '../config/firebase';
import { useState, useEffect, useRef } from "react";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import googlepic from '../assets/googlepic.png';
import { addDoc, collection } from 'firebase/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';
const Signin = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/home");
            }
        });

        return () => unsubscribe();
    }, [navigate]);


    const signInWithGoogle = async () => {
        if (!username) {
            alert("Please enter username");
            return;
        }
        try {
            await signInWithPopup(auth, googleprovider);
            addUser();
            navigate("/home");
        } catch (error) {
            console.error("Error signing in with Google:", error.message);
            alert("Error signing in with Google. Please try again.");
        }
    };
    const [username, setusername] = useState("");
    const addUser = async () => {
        const userRef = collection(database, "Users");
        const userDocRef = doc(userRef, auth.currentUser.uid);

        try {
            const docSnap = await getDoc(userDocRef);

            if (!docSnap.exists()) {
                await setDoc(userDocRef, {
                    username: username,
                    email: auth.currentUser.email,
                });
            }
        } catch (err) {
            console.error("Error adding user:", err);
        }
    };
    return (
        <div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#000328] to-[#00458e] h-full w-full"></div>
            <div className="signin-head w-full text-center relative z-20 opacity-0">
                <h2 className='lexend text-5xl mt-2 md:mb-3 text-white'>Sign In</h2>
            </div>
            <div className="flex justify-center relative z-20 items-center ">
                <div className='md:w-[35%] bg-white md:mt-4 p-10 rounded-lg shadoww m-2'>
                    <h2 className='lexend text-xl mb-0'>User name</h2>
                    <input type="text" placeholder='Enter your Username here' className='w-full my-2 mb-5 p-1 rounded-lg border' onChange={(e) => setusername(e.target.value)} />
                    <div className="buttons flex flex-col justify-center items-center mx-auto mt-10 codepen-button before:-z-10  md:w-3/4 rounded-full">
                        <button className='text-white bg-black russo w-full rounded-full py-1 text-l md:w-full flex justify-center items-center gap-2 hover:scale-105 transition-all' onClick={signInWithGoogle}><img className='w-10' src={googlepic} />  Sign in with Google</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;