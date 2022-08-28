import React, { useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'

// import "./moderatorProfileCss.css"
// import "./editProfileCss.css"
import 'font-awesome/css/font-awesome.min.css'
// import ProfileInfo from './profileInfo'
// import Timeline from './timeline'
import jwt_decode from "jwt-decode";
// import Notification from '../Notification/NotificationClone';

import "./graphCss.css";   


import {Bar} from 'react-chartjs-2';
import {Line} from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';

import {Chart as ChartJS} from 'chart.js/auto';








// import GraphCharts from './graphCharts'

const AllGraphs = () => {

    function useQuery() {
        const { search } = useLocation();
      
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    let query = useQuery();
    const token = query.get('token');
        
    // var decode = jwt_decode(token);
    // console.log(decode.moderator_id);
    // const id = decode.moderator_id;

    const navigate = useNavigate();

    const refModEx = useRef(null);
    const refModRating = useRef(null);
    const refStdJoined = useRef(null);
    const refStdActivity = useRef(null);
    const refStdSuccess = useRef(null);


    const [moderatorEx, setModeratorEx] = React.useState([{exercise_id:"", exercise_type:"", added_ex_count:"", moderator_name:"", moderator_id:"" }]);
    const [moderatorRating, setModeratorRating] = React.useState([{moderator_id:"", moderator_name:"", rating:"" }]);
    const [studentJoined, setStudentJoined] = React.useState([{month:"", count:""}]);
    const [studentSuccess, setStudentSuccess] = React.useState([{level:"", count:""}]);
    const [studentActivity, setStudentActivity] = React.useState([{active:"", count:""}]);

    const [selectedGraphs, setSelectedGraphs] = React.useState({"modEx":true, "modRating":true, "stdJoined":true, "stdActivity":true, "stdSuccess":true});



    const [modExGraph, setModExGraph] = React.useState({
        labels: moderatorEx.map( (data) => data.moderator_name), 
        datasets: [{
          label: "Exercise added", 
          data: moderatorEx.map( (data) => data.added_ex_count),
          backgroundColor: [],
          borderColor: "black",
          borderWidth: 2,
        },
        // {
        //   label: 'Quantity',
        //   data: [85000, 70000, 67000, 90000, 30400],
        //   backgroundColor: 'orange'
        // }
      ]
      });

      const [modRatingGraph, setModRatingGraph] = React.useState({
        labels: moderatorRating.map( (data) => data.moderator_name), 
        datasets: [{
          label: "", 
          data: moderatorRating.map( (data) => data.rating),
          backgroundColor: [],
          borderColor: "black",
          borderWidth: 2,
        },
      ]
      });

      const [stdJoinedGraph, setStdJoinedGraph] = React.useState({
        labels: studentJoined.map( (data) => data.month), 
        datasets: [{
          label: "", 
          data: studentJoined.map( (data) => data.count),
          backgroundColor: [],
          borderColor: "black",
          borderWidth: 2,
        },
      ]
      });

      const [stdSuccessGraph, setStdSuccessGraph] = React.useState({
        labels: studentSuccess.map( (data) => data.level), 
        datasets: [{
          label: "", 
          data: studentSuccess.map( (data) => data.count),
          backgroundColor: [],
          borderColor: "black",
          borderWidth: 2,
        },
      ]
      });

      const [stdActivityGraph, setStdActivityGraph] = React.useState({
        labels: studentActivity.map( (data) => data.active), 
        datasets: [{
          label: "", 
          data: studentActivity.map( (data) => data.count),
          backgroundColor: [],
          borderColor: "black",
          borderWidth: 2,
        },
      ]
      });

    
    const changeToGraph = (graphData, label, type) => {

        let colorList = []
    
        for(let i = 0; i < graphData.length; i++)
        {
            colorList.push("rgba(" + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + ", 0.6)");
        }
        const obj = {
            labels: graphData.map( (data) => type==="modEx" || type === "modRating"? data.moderator_name: type==="stdJoined"? data.month: type==="stdSuccess"? data.level: type==="stdActivity"? data.active:""), 
            datasets: [{
            label: label, 
            data: graphData.map( (data) => type==="modEx"? data.added_ex_count: type=== "modRating"? data.rating: type==="stdJoined" || type==="stdSuccess" || type==="stdActivity"? data.count: ""),
            backgroundColor: colorList,
            borderColor: "black",
            borderWidth: 2,
            },
            ]
        };
        return obj;

    }

    const handleChange =  async (e) => {
        // e.preventDefault();

        if(e.target.checked)
        {
            console.log("it is checked");
        }
        else{
            console.log("unchecked");
        }

        // console.log("changed: ", e.target.name);

        // const item = e.target.name;
        // console.log(item);
        // const updatedValue = { ...info, [item]: e.target.value };
        // console.log(updatedValue);
        // setInfo(info => ({
        //     ...info,
        //     ...updatedValue
        // }));
    }


    const getModEx = () =>{

        if(selectedGraphs["modEx"] === true)
        {
            return (<div className="col-md-12" style={{"margin": "10rem"}}>
            <h2 style={{"margin":"0 20rem", "width": "100%"}}>Exercise Added by Moderators</h2>
            <div style={{width: 700, "margin": "5rem 15rem"}}>

                <Bar data={modExGraph} 
                // height={400}
                // width={1000}
                // options={{
                //     maintainAspectRatio: true,
                //     scales: {
                //         y: {
                //             beginAtZero: true,
                //         }
                //     },
                //     legend:{
                //         labels:{
                //             fontSize: 20,
                //         }
                //     }
                // }}
                />
                {/* <BarChart charData={userData}/> */}
            </div>
            </div>);
        }
    }

    const getModRating = () =>{
        if(selectedGraphs["modRating"] === true)
        {
            return (
                <div className="col-md-12" style={{"margin": "10rem"}}>
                <h2 style={{"margin":"0 20rem", "width": "100%"}}>Rating of Moderators</h2>

                <div style={{width: 700, "margin": "5rem 15rem"}}>
                    {/* <Line data={modExGraph} /> */}
                    <Bar data={modRatingGraph} />
                    {/* <LineChart charData={userData}/> */}
                </div>
            </div>

            );
        }
    }

    const getStdJoined = () =>{

        if(selectedGraphs["stdJoined"] === true)
        {
            return (
                <div className="col-md-12" style={{"margin": "10rem"}}>
                <h2 style={{"margin":"0 20rem", "width": "100%"}}>Student Joined </h2>

                <div style={{width: 700, "margin": "5rem 15rem"}}>
                    {/* <Pie data={modExGraph} /> */}
                    <Bar data={stdJoinedGraph} />

                    {/* <PieChart charData={userData}/> */}
                </div>
            </div>

            );
        }
    }

    const getStdActivity = () =>{
        
        if(selectedGraphs["stdActivity"] === true)
        {
            return (

                <div className="col-md-12" style={{"margin": "10rem"}}>
                    <h2 style={{"margin":"0 20rem", "width": "100%"}}>Student Activity </h2>

                    <div style={{width: 700, "margin": "5rem 15rem"}}>
                        {/* <Pie data={modExGraph} /> */}
                        <Bar data={stdActivityGraph} />

                        {/* <PieChart charData={userData}/> */}
                    </div>
                </div>

            );
        }

    }

    const getStdSuccess = () =>{
        if(selectedGraphs["stdSuccess"] === true)
        {
            return (
                <div className="col-md-12" style={{"margin": "10rem"}}>
                <h2 style={{"margin":"0 20rem", "width": "100%"}}>Student Success Percentage </h2>

                <div style={{width: 700, "margin": "5rem 15rem"}}>
                    {/* <Pie data={modExGraph} /> */}
                    <Bar data={stdSuccessGraph} />

                    {/* <PieChart charData={userData}/> */}
                </div>
            </div>
            );
        }

    }



    const handleGraphSubmit = async (e) => {
        console.log("token: ", token);
        e.preventDefault();

        console.log("inside graph submit");

        let fetch_url = "http://localhost:8248/moderator/allGraphs?";

        let modEx = false, modRating = false, stdJoined = false, stdActivity = false, stdSuccess = false;

        if(refModEx.current.checked)
        {
            // console.log("modEx checked");
            fetch_url += "modEx_graph=true&";
            modEx = true;
        }

        if(refModRating.current.checked)
        {
            // console.log("modRating checked");
            fetch_url += "modRating_graph=true&";
            modRating = true;
        }

        if(refStdJoined.current.checked)
        {
            // console.log("stdJoined checked");
            fetch_url += "stdJoined_graph=true&month1=6&month2=8&";
            stdJoined = true;
        }

        if(refStdActivity.current.checked)
        {
            // console.log("stdActivity checked");
            fetch_url += "stdActivity_graph=true&";
            stdActivity = true;

        }

        if(refStdSuccess.current.checked)
        {
            // console.log("stdSuccess checked");
            fetch_url += "stdSuccess_graph=true&";  
            stdSuccess = true;
        }

        fetch_url += "token=" + token;


        const response = await fetch(fetch_url);

        // const response = await fetch("http://localhost:8248/moderator/allGraphs?modEx_graph=true&modRating_graph=true&stdActivity_graph=false&stdJoined_graph=false&token="+token);
        // const response = await fetch("http://localhost:8248/moderator/allGraphs?graphType=modEx_graph&token="+token);

        const data = await response.json();
        console.log("got all result");
        console.log(data);

        // setModeratorEx(data['modEx_graph']);
            
        if(modEx === true)
        {
            setModExGraph(changeToGraph(data['modEx_graph'], "Exercise Added", "modEx"));
            setSelectedGraphs({...selectedGraphs, modEx: true});

        }
        else
        {
            setSelectedGraphs({...selectedGraphs, modEx: false});
        }
        
        if(modRating === true)
        {
            setModRatingGraph(changeToGraph(data['modRating_graph'], "Moderator Rating", "modRating"));
            setSelectedGraphs({...selectedGraphs, modRating: true});
        }
        else
        {
            setSelectedGraphs({...selectedGraphs, modRating: false});
        }
        
        if(stdJoined === true)
        {
            setStdJoinedGraph(changeToGraph(data['stdJoined_graph'], "Student Joined", "stdJoined"));
            setSelectedGraphs({...selectedGraphs, stdJoined: true});
        }
        else
        {
            setSelectedGraphs({...selectedGraphs, stdJoined: false});
        }

        if(stdActivity === true)
        {
            setStdActivityGraph(changeToGraph(data['stdActivity_graph'], "Student Activity", "stdActivity"));
            setSelectedGraphs({...selectedGraphs, stdActivity: true});
        }
        else
        {
            setSelectedGraphs({...selectedGraphs, stdActivity: false});
        }

        if(stdSuccess === true)
        {
            setStdSuccessGraph(changeToGraph(data['stdSuccess_graph'], "Student Success Percentage", "stdSuccess"));
            setSelectedGraphs({...selectedGraphs, stdSuccess: true});
        }
        else
        {
            setSelectedGraphs({...selectedGraphs, stdSuccess: false});
        }

        // if(stdJoined == true)
        // {
            
        //     setStdJoinedGraph(changeToGraph(data['stdJoined_graph'], "Student Joined", "stdJoined"));
        // }

    }

    

    return (
        <React.Fragment>
            <form class="form" >
                <h2>Check Statistics</h2>
                <div class="inputGroup">
                    {/* <input id="option1" name="option1" type="checkbox" onChange={e => handleChange(e)}/> */}
                    <input ref={refModEx} id="option1" name="option1" type="checkbox" onChange={handleChange}/>

                    <label for="option1">Moderator exercise added</label>
                </div>
                
                

              
                <div className="inputGroup">
                    <input ref={refModRating} id="option2" name="option2" type="checkbox"/>
                    <label htmlFor="option2">Moderator Ratings</label>
                </div>

                <div className="inputGroup">
                    <input ref={refStdJoined} id="option3" name="option3" type="checkbox"/>
                    <label htmlFor="option3">Student Joined</label>
                </div>


                <div className="inputGroup">
                    <input ref={refStdActivity} id="option4" name="option4" type="checkbox"/>
                    <label htmlFor="option4">Student Activity</label>
                </div>

                <div className="inputGroup">
                    <input ref={refStdSuccess} id="option5" name="option5" type="checkbox"/>
                    <label htmlFor="option5">Student Success Percentage</label>
                </div>

                {/* <div class="inputGroup">
                    <input id="option3" name="option3" type="checkbox"/>
                    <label for="option3">Option One</label>
                </div>
                <div class="inputGroup">
                    <input id="option3" name="option3" type="checkbox"/>
                    <label for="option3">Option One</label>
                </div> */}

                    <button
                      className="button-85"
                      onClick={handleGraphSubmit}
                    >
                      View
                    </button>


            </form>


            <div className="row">
                {selectedGraphs["modEx"] && getModEx()}

                {selectedGraphs["modRating"] && getModRating()}

                {selectedGraphs["stdJoined"] && getStdJoined()}

                {selectedGraphs["stdActivity"] && getStdActivity()}
                
                {selectedGraphs["stdSuccess"] && getStdSuccess()}

              
            </div>



        </React.Fragment>

    );
}
 
export default AllGraphs;