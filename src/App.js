import './App.css';
import './styles/global.css';
import NavBar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Exercise from './components/Exercise/exercise';
import SentenceShuffling from './components/SentenceShuffling/sentenceshuffling';
import ReadComplete from './components/ReadComplete/Row_col';
import NameVerb  from './components/ReadComplete/Name_Verb';
import LandingPage from './components/LandingPage/landingpage';
import Tutorial from './components/Tutorial/tutorial';
import Add_tutorial from './components/Tutorial/Add_tutorial';
import Home from './components/HomePage/homepage';
import ChangeOneLetter from './components/ChangeOneLetter/changeOneLetter';
import ModeratorProfile from './components/ModeratorProfile/moderatorProfile'
import Consecutive from './components/Exercise/Consecutive';
import ForgotPassword from './components/Login/forgotPassword';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  const [user, setUser] = useState({token:"", logged_in: false});
  const [error, setError] = useState("");

  let tkn = "0";

  const Login_func = async (details) => {

    if(details.username === "" || details.password === ""){
      setError("Please fill all the fields");
      alert("Please fill all the fields");
      return "failure";
    }
    else{
      await axios.post("http://localhost:8248/moderator/login", {
        mobile: details.username.slice(-10),
        password: details.password
      })
      .then(function (response) {
        tkn = response.data;
        console.log(tkn);
        setError("");
    })
    .catch((err) => {
      alert("Invalid Credentials");
  });
  if(tkn !== "0"){
    setUser({token: tkn, logged_in: true});
  }
  return tkn;
  }
}

  const Register = (details) => {
    console.log(details);
  }


  const Logout = () => {   
    setUser({token:"", logged_in: false});
    console.log("Logout");
  }

  return (
    <div>
    <Router>
      <>
        <NavBar logged_in={user.logged_in} Logout_func={Logout} token={user.token}/>
        {/* <LandingPage logged_in={user.logged_in}/> */}
        <Routes>
          <Route path="/" element={< LandingPage />} />
          <Route path="/homepage" element={< Home />} />
          <Route path="/login" element={< Login Login_func={Login_func} error={error}/>} />
          <Route path="/register" element={< Register />} />
          <Route path="/help" element={< Register />} />
          <Route path="/about" element={< Register />} />
          <Route path="/exercise" element={< Exercise />} />
          <Route path="/consecutive" element={< Consecutive />} />
          <Route path="/tutorial" element={< Tutorial />} />
          <Route path="/add_tutorial" element={< Add_tutorial />} />
          <Route exact path="/sentenceshuffling" element={< SentenceShuffling />} />
          <Route exact path="/tablecompletion" element={< ReadComplete />} />
          <Route exact path="/nameverb" element={< NameVerb />} />
          <Route exact path="/changeletter" element={< ChangeOneLetter />} />
          <Route exact path="/profile" element={< ModeratorProfile />} />
          <Route exact path="/forgotPassword" element={< ForgotPassword />} />
          {/* <Route exact path="/profile/timeline" element={< ModeratorTimeline />} /> */}

          {/* <Route exact path="/profile" element={< Profile />} /> */}
        </Routes>
      </>
    </Router>
    </div>
  );
}

export default App;
