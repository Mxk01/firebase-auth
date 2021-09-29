import './App.css';
import { useEffect, useState } from 'react';
import Login from './components/Login'
import SignUp from './components/SignUp'
import { initializeApp } from "firebase/app";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Dashboard from './components/Dashboard';
import { getAuth, onAuthStateChanged } from '@firebase/auth';

// Import the functions you need from the SDKs you need

const firebaseConfig = {
  apiKey: "AIzaSyCX9BZM7oYZApWbi_mwcy0eYIvEERXowg0",
  authDomain: "fir-login-a49e1.firebaseapp.com",
  projectId: "fir-login-a49e1",
  storageBucket: "fir-login-a49e1.appspot.com",
  messagingSenderId: "554995243935",
  appId: "1:554995243935:web:2a8aa023234a302d7ebbaa"
};

initializeApp(firebaseConfig)

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    let auth = getAuth();
    // with this we can persist the user
    // user will be auth.currentUser that we have in dashboard
    onAuthStateChanged(auth, (user) => {
      // when we logout user will be null 
      setUser(user);
    })
  }, [])
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
