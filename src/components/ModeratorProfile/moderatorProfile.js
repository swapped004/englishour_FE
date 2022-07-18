import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'

import "./moderatorProfileCss.css"
import "./editProfileCss.css"
import 'font-awesome/css/font-awesome.min.css'
import ProfileInfo from './profileInfo'
import Timeline from './timeline'
import jwt_decode from "jwt-decode";

const ModeratorProfile = () => {

    function useQuery() {
        const { search } = useLocation();
      
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    let query = useQuery();
    const token = query.get('token');
        
        var decode = jwt_decode(token);
        console.log(decode.moderator_id);
        const id = decode.moderator_id;

        const navigate = useNavigate();
        const [info, setInfo] = React.useState({designation:"", email:"", first_name:"", last_name:"", mobile:"", joinDate:"", profile_picture:"", rating:"", institution:""});
        const [Exinfo, setExInfo] = React.useState({exercise_type:"",level:"",approval_status:"",topic_name:"",updatedAt:""});

        React.useEffect(() => {
            const getInfo = async (id) => {
                const response = await fetch("http://localhost:8248/moderator/profileInfo/moderator_id?moderator_id="+id+"&token="+token);
                const data = await response.json();
                setInfo(data);
            }
            const getExInfo = async (id) => {
                const response = await fetch("http://localhost:8248/moderator/exerciseInfo/moderator_id?moderator_id="+id+"&token="+token);
                const data = await response.json();
                console.log(data);
                setExInfo(data);
            }
            getInfo(id); 
            getExInfo(id);             
        }, []);

        const [timeline, setTimeline] = useState('profile')
        console.log("Profile info",info)

        const subPart = () => {

            return (
                <div>
                {timeline === 'timeline' && (
                    //  <ModeratorTimeline Exinfo = {Exinfo}/>
                    <Timeline Exinfo = {Exinfo}/>
                )}

                {timeline === 'profile' && <ProfileInfo info= {info} Exinfo = {Exinfo} />}
                </div>
            );
            
        }


        const handleProfileInfo = () => {
            setTimeline('profile');
        }

        const handleTimeline = () => {
         
            setTimeline('timeline');
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
                            <li><a href="#" onClick={handleProfileInfo}> <i className="fa fa-user"></i> Profile</a></li>
                            <li><a href="#" onClick={handleTimeline}> <i className="fa fa-calendar"></i> Recent Activity <span className="label label-warning pull-right r-activity">{Exinfo.length}</span></a></li>
                            <li>
                                <a className="button" href="#popup"> <i className="fa fa-edit"></i> Edit profile</a>
                                <div className="popup" id="popup">
                                    <div className="popup-inner">
                                        <div className="popup-left">
                                            <div className="popup__photo">
                                                {/* <img src="https://images.unsplash.com/photo-1515224526905-51c7d77c7bb8?ixlib=rb-0.3.5&s=9980646201037d28700d826b1bd096c4&auto=format&fit=crop&w=700&q=80" alt=""/> */}
                                                <img src={info.profile_picture} alt=""/>
                                            </div>
                                        <div className="popup-img-btn"><button>CHANGE</button></div>
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

                                        

                                            {/* <label>Password</label>
                                            <input type="text" name="password" defaultValue={info.password || ""} onChange={e => handleChange(e)} />
                                            <br/> */}

                                            <label>Profile Image</label>
                                            <input type="text" name="profile_picture" defaultValue={info.profile_picture || ""} onChange={e => handleChange(e)} />
                                            <br/>
                                            </div>
                                        {/* ))} */}
                                        <div className="button-section">
                                            <a href="#" className="button cancel-btn" style={{"text-decoration": "none", color: "#fff"}}>Apply </a>

                                            <button className="button update-btn" type="submit" onClick={e => handleSubmit(e)}>Update</button>
                                            {/* <a href='#' className="button update-btn" type="submit" onClick={e => handleSubmit(e)}>Update</a> */}
                     
                                        </div>
                                    </form>

                                    </div>
                                    {/* <a className="popup__close" href="#">X</a> */}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="profile-info col-md-9">
                    
                    {subPart()}   
                </div>
                </div>
            </div>

        </React.Fragment>

        );
}
 
export default ModeratorProfile;