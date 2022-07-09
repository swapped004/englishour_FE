// import './App.css';
import './index.css';
import './styles/global.css';
import NavBar from './components/Navbar/index';
import Login from './components/Login/Login';
import Exercise from './components/Exercise/exercise';
import SentenceShuffling from './components/SentenceShuffling/sentenceshuffling';
import Register from './components/Register/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';

import "bootstrap/dist/css/bootstrap.min.css";


function App() {

  const sample_user = {
    username: "admin",
    password: "admin",
  }

  const [user, setUser] = useState({username: "", email: "", logged_in: false});
  const [error, setError] = useState("");

  const Login_func = (details) => {
    console.log(details);

    //check from backend here
    if(details.username === sample_user.username && details.password === sample_user.password){
      setUser({username: details.username, email: "admin@google.com", logged_in: true});	
      console.log("Login Successful");
      //redirect to home page
      window.location.href = "/";
    }

    else if(details.username === "" || details.password === ""){
      console.log("Username or Password is empty");
      setError("Please enter both username and password");
    }

    else
    {
      console.log("Login Failed");
      setError("Login Failed");
    }
  }

  const Register = (details) => {
    console.log(details);
  }


  const Logout = () => {   
    console.log("Logout");
  }




  return (
    <Router>
      <>	
        <NavBar logged_in={user.logged_in}/>
        <Routes>
          <Route path="/login" element={< Login Login_func={Login_func} error={error}/>} />
          <Route path="/register" element={< Register />} />
          <Route path="/help" element={< Register />} />
          <Route path="/about" element={< Register />} />
          <Route path="/exercise" element={< Exercise />} />
          <Route exact path="/sentenceshuffling" element={< SentenceShuffling />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
