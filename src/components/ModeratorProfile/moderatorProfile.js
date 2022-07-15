import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


import "./moderatorProfileCss.css"
import "./editProfileCss.css"
import 'font-awesome/css/font-awesome.min.css'
import ProfileInfo from './profileInfo'
import ModeratorTimeline from './moderatorTimeline'
import { render } from '@testing-library/react';

const ModeratorProfile = () => {

        const id = "1";

        const navigate = useNavigate();


        const [formValues, setFormValues] = useState({ 
            firstName: "Camila",
            lastName: "Smith",
            email: "camilaSmith@gmail.com",
            mobile: "01998801231",
            date_of_birth: " 13 July 1983",
            designation: "Lecturer",
            join_date: "18 Aug 2021",
            current_institute: "BUET",
            req_date: "11 Aug 2021",
            join_status: "accepted",
            rating: "8/10",
            ex_count: 12,
            tutorial_count: 15,
            profileImgUrl: "https://bootdey.com/img/Content/avatar/avatar3.png"
      
        });

        const [timeline, setTimeline] = useState('profile')

        const subPart = () => {

            return (
                <div>
                {timeline === 'timeline' && (
                     <ModeratorTimeline/>
                )}

                {timeline === 'profile' && <ProfileInfo formValues= {formValues} />}
                </div>
            );
            
        }


        const handleProfileInfo = () => {
            setTimeline('profile');
        }

        const handleTimeline = () => {
         
            setTimeline('timeline');
        }

    

        const handleChange = (e) => {

            const item = e.target.name;
            const updatedValue = {item:e.target.value};
            setFormValues(formValues => ({
                ...formValues,
                ...updatedValue
                }));
        }

        const handleSubmit = () => {

        }


        const handleCancel = () => {
            // const history = useHistory();
            navigate('/profile');




            // console.log("history: ", history);


        }

        return (
            <React.Fragment>

                {/* <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"> */}
                <div className="container bootstrap snippets bootdey">
                <div className="row">
                <div className="profile-nav col-md-3">
                    <div className="panel">
                        <div className="user-heading round">
                            <a href="#">
                                <img src={formValues.profileImgUrl} alt=""/>
                            </a>
                            <h1>{formValues.firstName} {formValues.lastName}</h1>
                            <p>{formValues.email}</p>
                        </div>

                        <ul className="nav nav-pills nav-stacked">
                            <li name="profile"><a href="#" onClick={() => handleProfileInfo()}> <i className="fa fa-user"></i> Profile</a></li>
                            <li name="timeline"><a href="#" onClick={() => handleTimeline()}> <i className="fa fa-calendar"></i> Recent Activity <span className="label label-warning pull-right r-activity">9</span></a></li>
                            <li name="edit">
                                <a className="" href="#popup" > <i className="fa fa-edit"></i> Edit profile</a>
                                <div className="popup" id="popup">
                                    <div className="popup-inner">
                                        <div className="popup-left">
                                            <div className="popup__photo">
                                                {/* <img src="https://images.unsplash.com/photo-1515224526905-51c7d77c7bb8?ixlib=rb-0.3.5&s=9980646201037d28700d826b1bd096c4&auto=format&fit=crop&w=700&q=80" alt=""/> */}
                                                <img src={formValues.profileImgUrl} alt=""/>
                                            </div>
                                        <div className="popup-img-btn"><button>CHANGE</button></div>
                                    </div>
                                    <div className="popup__text">
                                    <form onSubmit={handleSubmit}>
                                        {/* {formValues.map((element, index) => ( */}
                                            <div className="form-inline popup-text-content" key={id}>
                                            <label>First Name: </label>
                                            <input type="text" name="firstName" defaultValue={formValues.firstName || ""}  onChange={e => handleChange(e)} />
                                            <br/>
                                            <label>Last Name: </label>
                                            <input type="text" name="lastName" defaultValue={formValues.lastName || ""} onChange={e => handleChange(e)} />  
                                            <br/>
                                            <label>Email</label>
                                            <input type="text" name="email" defaultValue={formValues.email || ""} onChange={e => handleChange(e)} />
                                            <br/>

                                            <label>Mobile</label>
                                            <input type="text" name="mobile" defaultValue={formValues.mobile || ""} onChange={e => handleChange(e)} />
                                            <br/>

                                            <label>Date of Birth</label>
                                            <input type="text" name="date_of_birth" defaultValue={formValues.date_of_birth || ""} onChange={e => handleChange(e)} />
                                            <br/>

                                            <label>Designation</label>
                                            <input type="text" name="designation" defaultValue={formValues.designation || ""} onChange={e => handleChange(e)} />
                                            <br/>

                                            <label>Current Institute</label>
                                            <input type="text" name="current_institute" defaultValue={formValues.current_institute || ""} onChange={e => handleChange(e)} />
                                            <br/>

                                        

                                            <label>Current Institute</label>
                                            <input type="text" name="current_institute" defaultValue={formValues.current_institute || ""} onChange={e => handleChange(e)} />
                                            <br/>

                                            <label>Profile Image</label>
                                            <input type="text" name="profileImgUrl" defaultValue={formValues.profileImgUrl || ""} onChange={e => handleChange(e)} />
                                            <br/>
                                        
                                            </div>
                                        <div className="button-section">
                                            {/* <button className="button cancel-btn" type="button"> */}
                                                <a href="#" className="button cancel-btn" style={{"text-decoration": "none", color: "#fff"}}>Cancel </a>

                                            {/* </button> */}
                                            <button className="button update-btn" type="submit" onClick={() => handleSubmit()}>Update</button>
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