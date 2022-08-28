import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'

import "./moderatorProfileCss.css"
import "./editProfileCss.css"
import 'font-awesome/css/font-awesome.min.css'
import ProfileInfo from './profileInfo'
import Timeline from './timeline'
import jwt_decode from "jwt-decode";
import Notification from '../Notification/NotificationClone';
import GraphCharts from './graphCharts'

const AdminProfile = () => {

    function useQuery() {
        const { search } = useLocation();
      
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    let query = useQuery();
    const token = query.get('token');
        
        var decode = jwt_decode(token);
        // console.log(decode.moderator_id);
        const id = decode.moderator_id;

        const navigate = useNavigate();
        const [info, setInfo] = React.useState({designation:"", email:"", first_name:"", last_name:"", mobile:"", joinDate:"", profile_picture:"", rating:"", institution:"", isAdmin:"",});
        // const [Exinfo, setExInfo] = React.useState({exercise_type:"",level:"",approval_status:"",tutorial_id:"",updatedAt:""});
        // const [Tutorialinfo, setTutorialInfo] = React.useState({tutorial_title:"",content:"",approval_status:"",topic_id:"",updatedAt:""});
        const [password, setPassword] = React.useState({NewPassword:"", ConfirmPassword:""});
        const [notification, setNotification] = React.useState([{notification_id:"",content:"",date:""}]);

        React.useEffect(() => {
            console.log("admin profile e ashchi");
            const getInfo = async (id) => {
                const response = await fetch("http://localhost:8248/moderator/profileInfo/moderator_id?moderator_id="+id+"&token="+token);
                const data = await response.json();
                setInfo(data);
            }
            // const getExInfo = async (id) => {
            //     const response = await fetch("http://localhost:8248/moderator/exerciseInfo/moderator_id?moderator_id="+id+"&token="+token);
            //     const data = await response.json();
            //     // console.log(data);
            //     setExInfo(data);
            // }
            // const getTutorialInfo = async (id) => {
            //     const response = await fetch("http://localhost:8248/moderator/TutorialInfo/moderator_id?moderator_id="+id+"&token="+token);
            //     const data = await response.json();
            //     // console.log(data);
            //     setTutorialInfo(data);
            // }
            const getNotification = async (id) => {
                const response = await fetch("http://localhost:8248/moderator/notification/moderator_id?moderator_id="+id+"&token="+token);
                const data = await response.json();
                console.log(data[0]);
                setNotification(data);
            }
            getInfo(id); 
            // getExInfo(id);
            // getTutorialInfo(id);
            getNotification(id);             
        }, []);

        const [timeline, setTimeline] = useState('profile')

        console.log("notification info", notification);

        const subPart = () => {
            return (
                <div>
                {timeline === 'timeline' && (<Timeline />)}
                {timeline === 'profile' && <ProfileInfo info= {info}  />}
                {timeline === 'notification' && (<Notification notification={notification}/>)}
                </div>
            );
            
        }


        const handleProfileInfo = () => {
            setTimeline('profile');
        }

        const handleTimeline = () => {
         
            setTimeline('timeline');
        }

        const handleNotification = () => {   
            // console.log("notification call hocche");         
            setTimeline('notification');
        }

    

        const handleChange =  async (e) => {
            e.preventDefault();

            const item = e.target.name;
            console.log(item);
            const updatedValue = { ...info, [item]: e.target.value };
            console.log(updatedValue);
            setInfo(info => ({
                ...info,
                ...updatedValue
            }));
        }

        const handlePasswordChange =  async (e) => {
            e.preventDefault();

            const item = e.target.name;
            const updatedValue = { ...password, [item]: e.target.value };
            setPassword(password => ({
                ...password,
                ...updatedValue
            }));
        }

        const handlePasswordSubmit = async (e) => {
            e.preventDefault();
            console.log(password);
            if(password.ConfirmPassword !== password.NewPassword){
                alert("Password does not match!");
            }
            else{
                const response = await axios.post("http://localhost:8248/moderator/updatePassword?token="+token, {
                    moderator_id: id,
                    password: password.NewPassword
                });
                console.log(response);
                alert("Password updated successfully!");
            }
        }


        const handleSubmit = async (e) => {
            e.preventDefault();

            console.log(info.last_name);
            await axios.post("http://localhost:8248/moderator/insertProfile?token="+token, {
                moderator_id: id,
                firstName: info.first_name,
                lastName: info.last_name,
                email: info.email,
                mobile: info.mobile,
                designation: info.designation,
                join_date: info.joinDate,
                current_institute: info.institution,
                rating: info.rating,
                profileImgUrl: info.profile_picture,
          })
          .then(function (response) {
            console.log(response);
            alert("Profile Updated");
          });
          //navigate('/profile');
          //window.location.reload(true);
          navigate('/profile?token='+token);
        }


            // console.log("history: ", history);



        return (
            <React.Fragment>

            
                {/* <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"> */}
                <div className="container bootstrap snippets bootdey">
                <div className="row">
                <div className="profile-nav col-md-3">
                    <div className="panel">
                        <div className="user-heading round">
                            <a href="#">
                                <img src={info.profile_picture} alt=""/>
                            </a>
                            <h1>{info.first_name} {info.last_name}</h1>
                            <p>{info.email}</p>
                        </div>

                        <ul className="nav nav-pills nav-stacked">
                            <li><a href="#" onClick={handleProfileInfo}> <i className="fa fa-user"></i> Admin Profile</a></li>
                            {/* <li><a href="#" onClick={handleTimeline}> <i className="fa fa-calendar"></i> Recent Activity <span className="label label-warning pull-right r-activity">
                                </span></a></li> */}
                            <li>
                                <a className="button" href="#popup"> <i className="fa fa-edit"></i> Edit profile</a>
                                <div className="popup" id="popup">
                                    <div className="popup-inner">
                                        <div className="popup-left">
                                            <div className="popup__photo">
                                                <img src={info.profile_picture} alt=""/>
                                            </div>
                                        </div>
                                    <div className="popup__text">
                                    <form onSubmit={handleSubmit}>
                                        {/* {formValues.map((element, index) => ( */}
                                            <div className="form-inline popup-text-content" key={id}>
                                            <label>First Name: </label>
                                            <input type="text" name="first_name" defaultValue={info.first_name || ""}  onChange={e => handleChange(e)} />
                                            <br/>
                                            <label>Last Name: </label>
                                            <input type="text" name="last_name" defaultValue={info.last_name || ""} onChange={e => handleChange(e)} />  
                                            <br/>
                                            <label>Email</label>
                                            <input type="text" name="email" defaultValue={info.email || ""} onChange={e => handleChange(e)} />
                                            <br/>

                                            <label>Mobile</label>
                                            <input type="text" name="mobile" defaultValue={info.mobile || ""} onChange={e => handleChange(e)} />
                                            <br/>

                                            <label>Join Date</label>
                                            <input type="text" name="joinDate" defaultValue={info.joinDate || ""} onChange={e => handleChange(e)} />
                                            <br/>

                                            <label>Designation</label>
                                            <input type="text" name="designation" defaultValue={info.designation || ""} onChange={e => handleChange(e)} />
                                            <br/>

                                            <label>Current Institute</label>
                                            <input type="text" name="institution" defaultValue={info.institution || ""} onChange={e => handleChange(e)} />
                                            <br/>

                                            <label>Profile Image</label>
                                            <input type="text" name="profile_picture" defaultValue={info.profile_picture || ""} onChange={e => handleChange(e)} />
                                            <br/>
                                            </div>
                                        <div className="button-section">
                                            <button className="button cancel-btn" type="submit" onClick={e => handleSubmit(e)}>Update</button>                     
                                        </div>
                                    </form>
                                    </div>
                                    </div>
                                    <div>
                                        <a className="popup__close" href="#">X</a>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <a className="button" href="#popupPassword"> <i className="fa fa-edit"></i> Edit Password</a>
                                <div className="popup" id="popupPassword">
                                    <div className="popup-inner">
                                        <div className="popup-left">
                                            <div className="popup__photo">
                                                <img src={info.profile_picture} alt=""/>
                                            </div>
                                        </div>
                                    <div className="popup__text">
                                    <form onSubmit={handlePasswordSubmit}>
                                            <div className="form-inline popup-text-content" key={id}>
                                            <label>New Password: </label>
                                            <input type="password" name="NewPassword" defaultValue={""}  onChange={e => handlePasswordChange(e)} />
                                            <br/>
                                            <label>Confirm New Password: </label>
                                            <input type="password" name="ConfirmPassword" defaultValue={""} onChange={e => handlePasswordChange(e)} />  
                                            <br/>
                                            </div>
                                        <div className="button-section">
                                            <button className="button cancel-btn" type="submit" onClick={e => handlePasswordSubmit(e)}>Update</button>                     
                                        </div>
                                    </form>
                                    </div>
                                </div>
                                <div>
                                    <a className="popup__close" href="#">X</a>
                                </div>
                            </div>
                            </li>
                            {/* <li><a href="#" onClick={handleNotification}> <i className="fa fa-calendar"></i> Notification <span className="label label-warning pull-right r-activity">{notification.length}</span></a></li> */}
                        </ul>
                    </div>
                </div>
                <div className="profile-info col-md-9">
                    {subPart()}   
                </div>
                </div>



                {/* <GraphCharts/> */}

                {/* <div> */}
          
      {/* </div> */}


            </div>

        </React.Fragment>

        );
}
 
export default AdminProfile;