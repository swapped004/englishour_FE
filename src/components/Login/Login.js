import React from 'react';
import "./Login.css";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./button.css";

const Login = ({Login_func, error}) => {

  const [details, setDetails] = useState({username: "", password: ""});	// Initialise state

  const submitHandler = (e) => {
    e.preventDefault();
    Login_func(details);
    console.log(details.username);
  }

  return (
    <div className="login-container">
        <form onSubmit={submitHandler}>
          <div className="form-inner">
            <h2>User Login</h2>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input type="text" name="username" id="username" onChange={e => setDetails({...details, username: e.target.value})} value={details.username}/>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
            </div>

            {/* <input type="submit" value="Login" /> */}
            <br/>
            <Link to="/exercise" style={{ textDecoration: 'none'}} className="button-40">Login</Link>

            {(error !== "") ? <div className="error">{error}</div> : ""}
            <Link to="/forgot_password" className="forgotpass-link">Forgot Password?</Link>
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