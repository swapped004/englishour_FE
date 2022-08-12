import React from 'react';
import "./Login.css";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./button.css";

const Login = ({Login_func, error, setToken}) => {

  const [details, setDetails] = useState({username: "", password: "", error:""});	// Initialise state

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const msg = Login_func(details);
    console.log(msg);
    msg.then(value => {
      if(value === "failure"){
        navigate("/login");
      }
      else if(value === "0"){
        navigate("/login");
      }
      else{
        //console.log((value));
        navigate("/homepage?token="+value);
      }
    });
  }


  return (
    <div className="login-container">
        <form onSubmit={submitHandler}>
          <div className="form-inner">
            <h2>User Login</h2>
            <div className="form-group">
              <label htmlFor="username">Phone no:</label>
              <input type="text" name="username" id="username" onChange={e => setDetails({...details, username: e.target.value})} value={details.username}/>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
            </div>

            <button type="Submit" className="button-40">
              Login
            </button>
            <Link to="/forgotPassword" className="forgotpass-link">Forgot Password?</Link>
            <p></p>
            <p>Don't have an account?    <Link to="/register" className="register-link">Create new account</Link></p>

            <div className="social-login">
              <p>Or login with:</p>
              <div className="social-login-icons">
                <Link to="/google_login" className="google-link">
                <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="google" />
                </Link>
              </div>
            </div>
    
            </div>

        </form>

        

    </div>
  )
}

export default Login