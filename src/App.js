import './App.css';
import NavBar from './components/Navbar/index';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';


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
      //window.location.href = "/";
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
    setUser({username: "", email: "", logged_in: false});
    console.log("Logout");
  }




  return (
    <Router>
      <>	
        <NavBar logged_in={user.logged_in} Logout_func={Logout}/>
        <Routes>
          <Route path="/" element={< Register />} />
          <Route path="/login" element={< Login Login_func={Login_func} error={error}/>} />
          <Route path="/register" element={< Register />} />
          <Route path="/help" element={< Register />} />
          <Route path="/about" element={< Register />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;