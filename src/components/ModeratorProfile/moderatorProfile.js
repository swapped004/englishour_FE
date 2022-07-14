import React, { useState } from 'react'

import "./moderatorProfileCss.css"
import "./editProfileCss.css"
import 'font-awesome/css/font-awesome.min.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';









const ModeratorProfile = () => {
    // state = { 
    //     id: "",
    //     firstName: "Camila",
    //     lastName: "Smith",
    //     email: "camilaSmith@gmail.com",
    //     mobile: "01998801231",
    //     date_of_birth: " 13 July 1983",
    //     designation: "Lecturer",
    //     join_date: "18 Aug 2021",
    //     current_institute: "BUET",
    //     req_date: "11 Aug 2021",
    //     join_status: "accepted",
    //     rating: "8/10",
    //     profileImgUrl: "https://bootdey.com/img/Content/avatar/avatar3.png"

    //  } 

        const id = "1";
        const navigate = useNavigate();

        const [formValues, setFormValues] = useState({ 
            firstName: "Camila",
            lastName: "Smith",
            password: "1234",
            email: "camilaSmith@gmail.com",
            mobile: "01998801231",
            date_of_birth: " 13 July 1983",
            designation: "Lecturer",
            join_date: "18 Aug 2021",
            current_institute: "BUET",
            req_date: "11 Aug 2021",
            join_status: "accepted",
            rating: "8",
            ex_count: 12,
            tutorial_count: 15,
            profileImgUrl: "https://bootdey.com/img/Content/avatar/avatar3.png"

        
        });

        const handleChange = (e) => {

            const item = e.target.name;
            const updatedValue = {item:e.target.value};
            setFormValues(formValues => ({
                ...formValues,
                ...updatedValue
                }));

            // const { name, value } = e.target
            // const list = [...formValues]
            // list[index][name] = value
            // setFormValues(list)
        }

        // const removeFormFields = (index) => {


        //     let copyOfObject = { ...formValues }
        //     delete copyOfObject['propertyToRemove']
            
        //     setShopCart( shopCart => ({
        //           ...copyOfObject
        //         }));


        //     console.log(index)
        //     const list = [...formValues]
        //     list.splice(index, 1)
        //     setFormValues(list)
        // }

        const handleSubmit = async (e) => {
            e.preventDefault();
            console.log(formValues);
            await axios.post("http://localhost:8248/moderator/insertProfile", {
                firstName: formValues.firstName,
                lastName: formValues.lastName,
                email: formValues.email,
                password: formValues.password,
                mobile: formValues.mobile,
                designation: formValues.designation,
                join_date: formValues.join_date,
                current_institute: formValues.current_institute,
                rating: formValues.rating,
                profileImgUrl: formValues.profileImgUrl
                
          })
          .then(function (response) {
            console.log(response);
            alert("Profile Updated");
          });
          navigate('/profile');
        }


        const addFormFields = () => {
            // location.href='#';
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
              <li className="active"><a href="#"> <i className="fa fa-user"></i> Profile</a></li>
              <li><a href="#"> <i className="fa fa-calendar"></i> Recent Activity <span className="label label-warning pull-right r-activity">9</span></a></li>
              <li>
                <a className="button" href="#popup"> <i className="fa fa-edit"></i> Edit profile</a>
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

                          

                            <label>Password</label>
                            <input type="text" name="password" defaultValue={formValues.password || ""} onChange={e => handleChange(e)} />
                            <br/>

                            <label>Profile Image</label>
                            <input type="text" name="profileImgUrl" defaultValue={formValues.profileImgUrl || ""} onChange={e => handleChange(e)} />
                            <br/>
                            
                            
                            {/* {
                                index ? 
                                <button type="button"  classNameName="button remove" onClick={() => removeFormFields(index)}>Remove</button> 
                                : null
                            } */}
                            </div>
                        {/* ))} */}
                        <div className="button-section">
                            <button className="button cancel-btn" type="button" onClick={() => addFormFields()}>Cancel

                            </button>
                            <button className="button update-btn" type="submit" onClick={() => handleSubmit()}>Update</button>
                        </div>
                    </form>


                        {/* <label>Name:</label> */}
                        {/* <h1>Lorem ipsum dolor sit amet</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ex velit, viverra non vulputate vitae, blandit vitae nisl. Nullam fermentum orci et erat viverra bibendum. Aliquam sed varius nibh, vitae mattis purus. Mauris elementum sapien non ullamcorper vulputate. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed eget felis sit amet eros viverra pulvinar.</p> */}
                    </div>
                    <a className="popup__close" href="#">X</a>
                    </div>
                </div>
            </li>
          </ul>
      </div>
  </div>
  <div className="profile-info col-md-9">
      {/* <div className="panel">
          <form>
              <textarea placeholder="Whats in your mind today?" rows="2" className="form-control input-lg p-text-area"></textarea>
          </form>
          <footer className="panel-footer">
              <button className="btn btn-warning pull-right">Post</button>
              <ul className="nav nav-pills">
                  <li>
                      <a href="#"><i className="fa fa-map-marker"></i></a>
                  </li>
                  <li>
                      <a href="#"><i className="fa fa-camera"></i></a>
                  </li>
                  <li>
                      <a href="#"><i className=" fa fa-film"></i></a>
                  </li>
                  <li>
                      <a href="#"><i className="fa fa-microphone"></i></a>
                  </li>
              </ul>
          </footer>
      </div> */}
      <div className="panel">
          <div className="bio-graph-heading">
              Aliquam ac magna metus. Nam sed arcu non tellus fringilla fringilla ut vel ispum. Aliquam ac magna metus.
          </div>
          <div className="panel-body bio-graph-info">
              <h1>Bio Graph</h1>
              <div className="row">
                  <div className="bio-row">
                      <p><span>First Name </span>: {formValues.firstName}</p>
                  </div>
                  <div className="bio-row">
                      <p><span>Last Name </span>: {formValues.lastName}</p>
                  </div>
                  <div className="bio-row">
                      <p><span>Designation </span>: {formValues.designation}</p>
                  </div>
                  <div className="bio-row">
                      <p><span>Date of Birth</span>: {formValues.date_of_birth}</p>
                  </div>
                  <div className="bio-row">
                      <p><span>Current Institute </span>: {formValues.current_institute}</p>
                  </div>
                  <div className="bio-row">
                      <p><span>Email </span>: {formValues.email}</p>
                  </div>
                  <div className="bio-row">
                      <p><span>Mobile </span>: (880) {formValues.mobile}</p>
                  </div>
                  <div className="bio-row">
                      <p><span>Joining Date </span>: {formValues.join_date}</p>
                  </div>
                  <div className="bio-row">
                      <p><span>Rating </span>: {formValues.rating}</p>
                  </div>
                  <div className="bio-row">
                      <p><span>Added Exercise </span>: {formValues.ex_count}</p>
                  </div>
                  <div className="bio-row">
                      <p><span>Added Tutorial </span>: {formValues.tutorial_count}</p>
                  </div>
              </div>
          </div>
      </div>
      <div>
          <div className="row">
              <div className="col-md-6">
                  <div className="panel">
                      <div className="panel-body">
                          <div className="bio-chart">
                              <div style={{display:"inline", width:"100px", height:"100px"}}><canvas width="100" height="100px"></canvas>
                              {/* <input className="knob" data-width="100" data-height="100" data-displayprevious="true" data-thickness=".2" value="35" data-fgcolor="#e06b7d" data-bgcolor="#e8e8e8" style="width: 54px; height: 33px; position: absolute; vertical-align: middle; margin-top: 33px; margin-left: -77px; border: 0px; font-weight: bold; font-style: normal; font-variant: normal; font-stretch: normal; font-size: 20px; line-height: normal; font-family: Arial; text-align: center; color: rgb(224, 107, 125); padding: 0px; -webkit-appearance: none; background: none;"> */}

                              </div>
                          </div>
                          <div className="bio-desk">
                              <h4 className="red">Envato Website</h4>
                              <p>Started : 15 July</p>
                              <p>Deadline : 15 August</p>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="col-md-6">
                  <div className="panel">
                      <div className="panel-body">
                          <div className="bio-chart">
                              <div style={{display:"inline", width:"100px", height:"100px"}}><canvas width="100" height="100px"></canvas>
                              <form>
                                {/* <input className="knob" style={{width: "54px", height: "33px", position: "absolute", "vertical-align": "middle", "margin-top": "33px", "margin-left": "-77px", border: "0px", "font-weight": "bold", "font-style": "normal", "font-variant": "normal", "font-stretch": "normal", "font-size": "20px", "line-height": "normal", "font-family": "Arial", "text-align": "center", color: "rgb(76, 197, 205)", padding: "0px", "-webkit-appearance": "none", background: "none"}}> */}
                              </form>
                              </div>
                          </div>
                          <div className="bio-desk">
                              <h4 className="terques">ThemeForest CMS </h4>
                              <p>Started : 15 July</p>
                              <p>Deadline : 15 August</p>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="col-md-6">
                  <div className="panel">
                      <div className="panel-body">
                          <div className="bio-chart">
                              <div style={{display:"inline", width:"100px", height:"100px"}}><canvas width="100" height="100px"></canvas>
                                {/* <input className="knob" data-width="100" data-height="100" data-displayprevious="true" data-thickness=".2" value="75" data-fgcolor="#96be4b" data-bgcolor="#e8e8e8" style="width: 54px; height: 33px; position: absolute; vertical-align: middle; margin-top: 33px; margin-left: -77px; border: 0px; font-weight: bold; font-style: normal; font-variant: normal; font-stretch: normal; font-size: 20px; line-height: normal; font-family: Arial; text-align: center; color: rgb(150, 190, 75); padding: 0px; -webkit-appearance: none; background: none;"> */}

                              </div>
                          </div>
                          <div className="bio-desk">
                              <h4 className="green">VectorLab Portfolio</h4>
                              <p>Started : 15 July</p>
                              <p>Deadline : 15 August</p>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="col-md-6">
                  <div className="panel">
                      <div className="panel-body">
                          <div className="bio-chart">
                              <div style={{display:"inline", width:"100px", height:"100px"}}>
                                <canvas width="100" height="100px"></canvas>
                                {/* <input className="knob" data-width="100" data-height="100" data-displayprevious="true" data-thickness=".2" value="50" data-fgcolor="#cba4db" data-bgcolor="#e8e8e8" style="width: 54px; height: 33px; position: absolute; vertical-align: middle; margin-top: 33px; margin-left: -77px; border: 0px; font-weight: bold; font-style: normal; font-variant: normal; font-stretch: normal; font-size: 20px; line-height: normal; font-family: Arial; text-align: center; color: rgb(203, 164, 219); padding: 0px; -webkit-appearance: none; background: none;"> */}

                                </div>
                          </div>
                          <div className="bio-desk">
                              <h4 className="purple">Adobe Muse Template</h4>
                              <p>Started : 15 July</p>
                              <p>Deadline : 15 August</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</div>
</div>

            </React.Fragment>

        );
}
 
export default ModeratorProfile;