import React, { Component } from 'react';
import "./moderatorProfileCss.css"
import 'font-awesome/css/font-awesome.min.css'


class ModeratorProfile extends Component {
    state = { 
        id: "",
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
        profileImgUrl: "https://bootdey.com/img/Content/avatar/avatar3.png"

     } 
    render() { 





        return (
            <React.Fragment>

{/* <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"> */}
<div className="container bootstrap snippets bootdey">
<div className="row">
  <div className="profile-nav col-md-3">
      <div className="panel">
          <div className="user-heading round">
              <a href="#">
                  <img src={this.state.profileImgUrl} alt=""/>
              </a>
              <h1>{this.state.firstName} {this.state.lastName}</h1>
              <p>{this.state.email}</p>
          </div>

          <ul className="nav nav-pills nav-stacked">
              <li className="active"><a href="#"> <i className="fa fa-user"></i> Profile</a></li>
              <li><a href="#"> <i className="fa fa-calendar"></i> Recent Activity <span className="label label-warning pull-right r-activity">9</span></a></li>
              <li><a href="#"> <i className="fa fa-edit"></i> Edit profile</a></li>
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
                      <p><span>First Name </span>: {this.state.firstName}</p>
                  </div>
                  <div className="bio-row">
                      <p><span>Last Name </span>: {this.state.lastName}</p>
                  </div>
                  <div className="bio-row">
                      <p><span>Designation </span>: {this.state.designation}</p>
                  </div>
                  <div className="bio-row">
                      <p><span>Date of Birth</span>: {this.state.date_of_birth}</p>
                  </div>
                  <div className="bio-row">
                      <p><span>Current Institute </span>: {this.state.current_institute}</p>
                  </div>
                  <div className="bio-row">
                      <p><span>Email </span>: {this.state.email}</p>
                  </div>
                  <div className="bio-row">
                      <p><span>Mobile </span>: (880) {this.state.mobile}</p>
                  </div>
                  <div className="bio-row">
                      <p><span>Joining Date </span>: {this.state.join_date}</p>
                  </div>
                  <div className="bio-row">
                      <p><span>Rating </span>: {this.state.rating}</p>
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
}
 
export default ModeratorProfile;