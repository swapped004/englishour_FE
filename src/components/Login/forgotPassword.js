import React from 'react';
import "./Login.css";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./button.css";
import axios from 'axios';

const ForgotPassword = () => {

    const [email, setEmail] = useState({Email: ""});

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await axios.post("http://localhost:8248/moderator/forgotPassword", {
            Email: email.Email,
        });
        console.log(response);
        alert(response.data);
        if(response.data === "Please check your email"){
            navigate("/login");
        }
    }


  return (
    <div className="login-container">
        <form onSubmit={submitHandler}>
          <div className="form-inner">
            <h2>Reset Password</h2>
            <div className="form-group">
              <label htmlFor="username">Email Address:</label>
              <input type="text" name="email" id="email" onChange={e => setEmail({...email, Email: e.target.value})} value={email.Email}/>
            </div>
            <button type="Submit" className="button-40">
              Send Code
            </button>
            </div>
        </form>

        

    </div>
  )
}

export default ForgotPassword;