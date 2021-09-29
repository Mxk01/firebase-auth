import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useHistory } from 'react-router';

function Login() {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let history = useHistory();
    let [loading, setLoading] = useState(false);

    // so after we logged in we stored  token in localstorage
    // what we want to do next is retrieve it from localStorage

    useEffect(() => {

        let token = localStorage.getItem('token');
        // so this means after we logged in
        // if we try to click login again we'll be redirected to dashboard
        if (token) {
            history.push('/dashboard')
        }
    }, [])

    let onLogin = () => {
        let auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // saving the token user gets when he logs in
                let token = userCredential._tokenResponse.idToken;

                localStorage.setItem('token', token);
                history.push('/dashboard')
            }).catch(e => console.log(e))

    }
    return (
        <div className="w-full h-screen bg-gradient-to-r from-yellow-200 via-red-500 to-pink-500 flex justify-center items-center">
            <div className="w-96 bg-white shadow-lg">
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
                        onClick={onLogin}
                        className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-200 text-white px-10 py-2 rounded text-xl font-bold"
                    >
                        {loading ? 'Logging you in ...' : 'Login'}
                    </button>
                </div>
                <div className="m-5">
                    <Link to="/signup">
                        Don't have an account?
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login
