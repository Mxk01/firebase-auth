import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
// get authentication stuff
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
const Signup = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    // SO WHEN USER TRIES TO ACCESS THIS ROUTE IF HE IS LOGGED IN AND HAS A TOKEN REDIRECT
    useEffect(() => {

        let token = localStorage.getItem('token');
        // so this means after we logged in
        // if we try to click login again we'll be redirected to dashboard
        if (token) {
            history.push('/dashboard')
        }
    }, [])
    const onSignup = () => {
        console.log(name, email, password)
        const auth = getAuth();
        // 1. create user  2. add name field with updateProfile function
        // 3.userCredential.user  is our current user 
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // update user 
                // so by default user won't be created with a name (only with email and password)
                // so we call this updateProfile function to also add displayName field
                updateProfile(userCredential.user, { displayName: name }).then(() => history.push('/'))
            }).catch(e => console.log(e));
    }

    return (
        <div className="w-full h-screen bg-gradient-to-r from-yellow-200 via-red-500 to-pink-500 flex justify-center items-center">
            <div className="w-96 bg-white shadow-lg">
                <div className="m-5">
                    <label className="block text-xl font-bold mb-2">Name</label>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        name="name"
                        type="name"
                        className="border-grey-200 border-2 rounded w-full p-2 h-10"
                    />
                </div>
                <div className="m-5">
                    <label className="block text-xl font-bold mb-2">Email</label>
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        name="email"
                        type="email"
                        className="border-grey-200 border-2 rounded w-full p-2 h-10"
                    />
                </div>
                <div className="m-5">
                    <label className="block text-xl font-bold mb-2">Password</label>
                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        name="password"
                        type="password"
                        className="border-grey-200 border-2 rounded w-full p-2 h-10"
                    />
                </div>
                <div className="m-5">
                    <button
                        onClick={onSignup}
                        className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-200 text-white px-10 py-2 rounded text-xl font-bold"
                    >
                        {loading ? 'Creating user ...' : 'Signup'}
                    </button>
                </div>
                <div className="m-5">
                    <Link to="/">
                        Already have an account?
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Signup;