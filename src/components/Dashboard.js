import React, { useEffect } from 'react'
import { getAuth, signOut } from 'firebase/auth';
import { useHistory } from 'react-router'
function Dashboard() {
    let history = useHistory();


    let logout = () => {
        // wrap our previous code into signOut  to fully logout user
        signOut(auth).then(() => {
            // what logout does it removes token
            // then redirects user to login page

            // if user wants to log in again a token will be set each time he does 
            localStorage.removeItem('token');
            history.push('/');
        }).catch(e => console.log(e))
    }


    useEffect(() => {

        let token = localStorage.getItem('token');
        // checking if there's a token 
        // if not redirect to login
        if (!token) {
            history.push('/')
        }
    }, [])

    let auth = getAuth()
    let user = auth.currentUser
    console.log(user);
    return (
        <div className="w-full h-screen bg-gradient-to-r from-yellow-200 via-red-500 to-pink-500 flex justify-center items-center">
            <div className="w-96 bg-white shadow-lg">
                <div className="m-5">
                    <p>{user && user.displayName}</p>
                </div>
                <div className="m-5">
                    <button
                        onClick={logout}
                        className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-200 text-white px-10 py-2 rounded text-xl font-bold"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
