import React from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';
import Notification from "./notification5.png";
import "./notification.css";
import "./Popup.css";
import jwt_decode from "jwt-decode";
import "./moderatorTimelineCss.css"
import axios from 'axios';

const NavBar = ({logged_in, Logout_func, token, isAdmin}) => {
    
    console.log("Navbar isAdmin: ", isAdmin);
    const [open, setOpen] = React.useState(true);
    const [notification, setNotification] = React.useState([{notification_id:"",content:"",date:""}]);
    const [Exercise, setExercise] = React.useState("");

    const getNotification = async (id) => {
        const response = await fetch("http://localhost:8248/moderator/notification/moderator_id?moderator_id="+id+"&token="+token);
        const data = await response.json();
        setNotification(data);
    }
    const handleExerciseInfo = async () => {
        var exId="";
        for(let i=0;i<notification.length;i++){
          exId += notification[i].content.split("#")[1]+"x";
        }
        if(exId!=="undefinedx"){
            const data = await axios.get(
                "http://localhost:8248/moderator/exerciseDetails?token="+window.location.href.split("=")[1]+"&exercise_id="+exId
            );
            setExercise(data.data);
        }
    }

    React.useEffect(() => {
        // console.log("Navbar logged_in: ", logged_in);
        if(logged_in){
            var decode = jwt_decode(token);
            getNotification(decode.moderator_id);
        }             
    }, [logged_in]);

    const Caller = (boolData) => {
        // e.preventDefault();
        setOpen(boolData);
        if(boolData){
            var decode = jwt_decode(token);
            getNotification(decode.moderator_id);
            handleExerciseInfo();
        }
        console.log("Notification in navbar ", notification);
        console.log("Exercise in navbar ", Exercise);
    }

    const displayNotification = (singleNotification) => {
        return (
          <span className="notificationNot">{singleNotification}</span>
        );
    };

    const generateMonth = (TotalTimeStamp) => {
        const m = parseInt(TotalTimeStamp.split("T")[0].split("-")[1]);
        const d = TotalTimeStamp.split("T")[0].split("-")[2]
        const year = TotalTimeStamp.split("T")[0].split("-")[0]
        const monthNames = [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC"
        ];
        return d+" "+monthNames[m-1]+" "+year;
    }
    
    //   const handleRead = () => {
    //     setNotification([{}]);
    //     setOpen(false);
    //   };


    return (
    <div className="navbar-container">

        <div className="navbar-logo">
            <Link to={logged_in ? "/homepage?token="+token : "/"}>
            <img src={require('../../images/logo2.png')} alt="logo" />
            </Link>
        </div>

        <div className="hamburger">
        </div>
        <div className="hamburger">
        </div>

        <div className="navbar-menu">
            <ul>

                <li>
                    <Link to={isAdmin?"/adminprofile?token="+token:"/profile?token="+token} className={logged_in ? "navbar-link" :"hidden" }>Profile</Link>
                </li>

                <li>
                    <Link to={"/about"} className="navbar-link">About</Link>
                </li>

                <li>
                    <Link to="/login" className={logged_in ? "hidden" :"navbar-link" }>Sign In</Link>
                </li>
                <li>
                    <Link to={"/exercise?token="+token} className={logged_in ? "navbar-link" :"hidden" }>Index</Link>
                </li>
                <li>
                    <Link to={"/tutorial?token="+token} className={logged_in ? "navbar-link" :"hidden" }>Tutorial</Link>
                </li>
                <li>
                    <div className={logged_in ? "iconNot" :"hidden" } onClick={() => Caller(!open)}>
                        <img src={Notification} className="iconImgNot" alt="" />
                        {notification.length >0 && <div className="counterNot">{notification.length}</div>}
                    </div>
                </li>
                <li>
                    <Link to="/" className={logged_in ? "navbar-btn" : "hidden"} onClick={Logout_func}>Logout</Link>
                </li>
            </ul>
        </div>
        {open && logged_in ?
            <div className="mainNot">
                <div className="popupNot">
                    <div className="popupNot-header">
                        <h1>popup</h1>
                        <h1 onClick={() => setOpen(!open)}>X</h1>
                    </div>
                {/* <div>
                    <p>This is simple popup in React js</p>
                </div> */}
                {notification.map((item, index) => (
                        <li>
                            <span>{generateMonth(item.date)}</span>
                            <div class="content">
                                <p>
                                    <Link to={"/preview"+Exercise.split("#")[index]+"?token="+token+"&exercise_id="+item.content.split("#")[1]+"&notification_id="+item.notification_id} style={{ fontSize: "18px", fontWeight: 700 }}>{item.content.split("#")[0]}</Link>
                                </p>
                                {/* <span style={{fontSize: "15px",fontWeight: 700,color: "#747474",float: "right"}}>{item.date.split("T")[1].split(".")[0]}</span> */}
                            </div>
                        </li>
                ))}
                </div>
            </div>:""
        }
    </div>
  );
};

export default NavBar;
