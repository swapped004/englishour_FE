import React, { useState } from 'react'
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


    const [moderatorEx, setModeratorEx] = React.useState([{exercise_id:"", exercise_type:"", added_ex_count:"", moderator_name:"", moderator_id:"" }]);
    const [moderatorRating, setModeratorRating] = React.useState([{moderator_id:"", moderator_name:"", rating:"" }]);


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
        // {
        //   label: 'Quantity',
        //   data: [85000, 70000, 67000, 90000, 30400],
        //   backgroundColor: 'orange'
        // }
      ]
      });


    // const [modExGraph, setModExGraph] = React.useState({
    // labels: moderatorEx.map( (data) => data.moderator_name), 
    // datasets: [{
    //     label: "Exercise added by Moderators", 
    //     data: moderatorEx.map( (data) => data.added_ex_count),
    //     backgroundColor: [],
    //     borderColor: "black",
    //     borderWidth: 2,
    // },
    // // {
    // //   label: 'Quantity',
    // //   data: [85000, 70000, 67000, 90000, 30400],
    // //   backgroundColor: 'orange'
    // // }
    // ]
    // });
    
    
    // const [modExGraph, setModExGraph] = React.useState([]);

    const changeToGraph = (graphData, label, type) => {

        let colorList = []
    
        for(let i = 0; i < graphData.length; i++)
        {
            colorList.push("rgba(" + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + ", 0.6)");
        }
        const obj = {
        labels: graphData.map( (data) => type==="modEx"? data.moderator_name: ""), 
        datasets: [{
        label: label, 
        data: graphData.map( (data) => type==="modEx"? data.added_ex_count: type=== "modRating"? data.rating: ""),
        backgroundColor: colorList,
        borderColor: "black",
        borderWidth: 2,
        },
        // {
        //   label: 'Quantity',
        //   data: [85000, 70000, 67000, 90000, 30400],
        //   backgroundColor: 'orange'
        // }
        ]
        };
        return obj;

    }

    // const handleChange =  async (e) => {
    //     e.preventDefault();

    //     const item = e.target.name;
    //     console.log(item);
    //     const updatedValue = { ...info, [item]: e.target.value };
    //     console.log(updatedValue);
    //     setInfo(info => ({
    //         ...info,
    //         ...updatedValue
    //     }));
    // }


    const handleGraphSubmit = async (e) => {
        console.log("token: ", token);
        e.preventDefault();

        console.log("inside graph submit");

        // const response = await fetch("http://localhost:8248/moderator/allGraphs?modEx_graph=true&modRating_graph=true&stdActivity_graph=false&stdJoined_graph=false&token="+token);
        const response = await fetch("http://localhost:8248/moderator/allGraphs?graphType=modEx_graph&token="+token);

        const data = await response.json();
        console.log("got all result");
        console.log(data);

        // setModeratorEx(data['modEx_graph']);
            
        setModExGraph(changeToGraph(data['modEx_graph'], "Exercise Added", "modEx"));
        
        // setModeratorRating(changeToGraph(data['modRating_graph'], "Moderator Rating"));
    
        setModRatingGraph(changeToGraph(data['modRating_graph'], "Moderator Rating", "modRating"));

    }

    

    return (
        <React.Fragment>
            <form class="form" >
                <h2>Check Statistics</h2>
                <div class="inputGroup">
                    {/* <input id="option1" name="option1" type="checkbox" onChange={e => handleChange(e)}/> */}
                    <input id="option1" name="option1" type="checkbox"/>

                    <label for="option1">Moderator exercise added</label>
                </div>
                
                

              
                <div className="inputGroup">
                    <input id="option2" name="option2" type="checkbox"/>
                    <label htmlFor="option2">Moderator Ratings</label>
                </div>

                <div className="inputGroup">
                    <input id="option3" name="option3" type="checkbox"/>
                    <label htmlFor="option3">Student Joined</label>
                </div>


                <div className="inputGroup">
                    <input id="option4" name="option4" type="checkbox"/>
                    <label htmlFor="option4">Student Activity</label>
                </div>

                <div className="inputGroup">
                    <input id="option5" name="option5" type="checkbox"/>
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
                <div className="col-md-12" style={{"margin": "10rem"}}>
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
                </div>


                <div className="col-md-12" style={{"margin": "10rem"}}>
                    <h2 style={{"margin":"0 20rem", "width": "100%"}}>Rating of Moderators</h2>

                    <div style={{width: 700, "margin": "5rem 15rem"}}>
                        {/* <Line data={modExGraph} /> */}
                        <Bar data={modRatingGraph} />
                        {/* <LineChart charData={userData}/> */}
                    </div>
                </div>


                <div className="col-md-12" style={{"margin": "10rem"}}>
                    <h2 style={{"margin":"0 20rem", "width": "100%"}}>Moderator Join last month</h2>

                    <div style={{width: 700, "margin": "5rem 15rem"}}>
                        <Pie data={modExGraph} />
                        {/* <PieChart charData={userData}/> */}
                    </div>
                </div>

              
            </div>



        </React.Fragment>

    );
}
 
export default AllGraphs;