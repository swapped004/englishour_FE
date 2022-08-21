import React, { Component } from 'react';



class ProfileInfo extends Component {
    state = {  } 


    render() { 

        const {info, Exinfo, Tutorialinfo} = this.props;

        // console.log("profileInfojs info: ", info);

        return (

            <React.Fragment>
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
                      <p><span>Join Date</span>: {info.joinDate.split("T")[0]}</p>
                  </div>
                  {/* <div className="bio-row">
                      <p><span>Current Institute </span>: {info.institution}</p>
                  </div> */}
                  <div className="bio-row">
                      <p><span>Email </span>: {info.email}</p>
                  </div>
                  <div className="bio-row">
                      <p><span>Mobile </span>: (880) {info.mobile}</p>
                  </div>
                  {/* <div className="bio-row">
                      <p><span>Rating </span>: {info.rating}</p>
                  </div> */}
                  {/* <div className="bio-row">
                      <p><span>Added Exercise </span>: 
                      </p>
                  </div> */}
                  {/* <div className="bio-row">
                      <p><span>Added Tutorial </span>: 
                      </p>
                  </div> */}
              </div>
          </div>
      </div>
      {/* Cut from here 4 boxes */}


            </React.Fragment>


        );
    }
}
 
export default ProfileInfo;