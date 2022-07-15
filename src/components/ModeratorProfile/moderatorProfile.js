import React from 'react'

import "./moderatorProfileCss.css"
import "./editProfileCss.css"
import 'font-awesome/css/font-awesome.min.css'
// import { Col, Form, Row } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const ModeratorProfile = () => {

        const id = "7";
        const navigate = useNavigate();
        const [info, setInfo] = React.useState({designation:"", email:"", first_name:"", last_name:"", mobile:"", joinDate:"", password:"", profile_picture:"", rating:"", institution:""});

        
        
        React.useEffect(() => {
            const getInfo = async (id) => {
                const response = await fetch("http://localhost:8248/moderator/profileInfo/moderator_id?moderator_id="+id);
                const data = await response.json();
                //console.log(data);
                setInfo(data);
            }
            getInfo(id);            
        }, []);


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
            await axios.post("http://localhost:8248/moderator/insertProfile", {
                moderator_id: id,
                firstName: info.first_name,
                lastName: info.last_name,
                email: info.email,
                password: info.password,
                mobile: info.mobile,
                designation: info.designation,
                join_date: info.joinDate,
                current_institute: info.institution,
                rating: info.rating,
                profileImgUrl: info.profile_picture
                
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
                  <img src={info.profile_picture} alt=""/>
              </a>
              <h1>{info.first_name} {info.last_name}</h1>
              <p>{info.email}</p>
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

                          

                            <label>Password</label>
                            <input type="text" name="password" defaultValue={info.password || ""} onChange={e => handleChange(e)} />
                            <br/>

                            <label>Profile Image</label>
                            <input type="text" name="profile_picture" defaultValue={info.profile_picture || ""} onChange={e => handleChange(e)} />
                            <br/>
                            </div>
                        {/* ))} */}
                        <div className="button-section">
                            <button className="button cancel-btn" type="button" onClick={() => addFormFields()}>Cancel

                            </button>
                            <button className="button update-btn" type="submit" onClick={e => handleSubmit(e)}>Update</button>
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
      <div className="panel">
          <div className="bio-graph-heading">
              Aliquam ac magna metus. Nam sed arcu non tellus fringilla fringilla ut vel ispum. Aliquam ac magna metus.
          </div>
          <div className="panel-body bio-graph-info">
              <h1>Bio Graph</h1>
              <div className="row">
                  <div className="bio-row">
                      <p><span>First Name </span>: {info.first_name}</p>
                  </div>
                  <div className="bio-row">
                      <p><span>Last Name </span>: {info.last_name}</p>
                  </div>
                  <div className="bio-row">
                      <p><span>Designation </span>: {info.designation}</p>
                  </div>
                  <div className="bio-row">
                      <p><span>Join Date</span>: {info.joinDate}</p>
                  </div>
                  <div className="bio-row">
                      <p><span>Current Institute </span>: {info.institution}</p>
                  </div>
                  <div className="bio-row">
                      <p><span>Email </span>: {info.email}</p>
                  </div>
                  <div className="bio-row">
                      <p><span>Mobile </span>: (880) {info.mobile}</p>
                  </div>
                  <div className="bio-row">
                      <p><span>Rating </span>: {info.rating}</p>
                  </div>
                  <div className="bio-row">
                      <p><span>Added Exercise </span>:</p>
                  </div>
                  <div className="bio-row">
                      <p><span>Added Tutorial </span>:</p>
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