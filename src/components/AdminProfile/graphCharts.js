
import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'

import {Bar} from 'react-chartjs-2';
import {Line} from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';

import {Chart as ChartJS} from 'chart.js/auto';



import "../ViewGraph/graphCss.css";   


const UserData = [
    {
    //   id: 1,
      name: "Towhid",
      userGain: 10,
      userLost: 823,
    },
    {
    //   id: 2,
      name: "Sizvy",
      userGain: 15,
      userLost: 345,
    },
    {
    //   id: 3,
      name: "Swapnil",
      userGain: 25,
      userLost: 555,
    },
    {
    //   id: 4,
      name: "Saiful",
      userGain: 17,
      userLost: 4555,
    },
    {
    //   id: 5,
      name: "Shakil",
      userGain: 18,
      userLost: 234,
    },
  ];




  function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
 }
const GraphCharts = () => {
    let query = useQuery();
    const token = query.get('token');
    console.log("token in graph: ", token);

    // const [modExGraph, setModExGraph] = useState({});

    const [moderatorEx, setModeratorEx] = React.useState([{exercise_id:"", exercise_type:"", added_ex_count:"", moderator_name:"", moderator_id:"" }]);


    

    const [modExGraph, setModExGraph] = useState({
        labels: moderatorEx.map( (data) => data.moderator_name), 
        datasets: [{
          label: "Exercise added by Moderators", 
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
    
    
    // const [modExGraph, setModExGraph] = React.useState([]);

    const changeToGraph = (graphData) => {

        let colorList = []
    
        for(let i = 0; i < graphData.length; i++)
        {
            colorList.push("rgba(" + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + ", 0.6)");
        }
        const obj = {
        labels: graphData.map( (data) => data.moderator_name), 
        datasets: [{
        label: "Exercise added by Moderators", 
        data: graphData.map( (data) => data.added_ex_count),
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


      React.useEffect(() => {
        console.log("graph charts useEffect");
        const getInfo = async () => {
            const response = await fetch("http://localhost:8248/moderator/graphChart?token="+token);
            const data = await response.json();
            setModeratorEx(data);
            
            setModExGraph(changeToGraph(data));

        }
        getInfo(); 
 
    }, []);
    

    console.log("after useEffect: graph charts: ", moderatorEx);
    console.log("after useEffect: user data: ", UserData);

   



    

      const [userData, setUserData] = useState({
        labels: UserData.map( (data) => data.name), 
        datasets: [{
          label: "", 
          data: UserData.map( (data) => data.userGain),
          backgroundColor: [
            "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
          ],
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



    //   console.log("")

    return (
        <React.Fragment>

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
                            <Line data={userData} />
                            {/* <LineChart charData={userData}/> */}
                        </div>
                    </div>


                    <div className="col-md-12" style={{"margin": "10rem"}}>
                        <h2 style={{"margin":"0 20rem", "width": "100%"}}>Moderator Join last month</h2>

                        <div style={{width: 700, "margin": "5rem 15rem"}}>
                            <Pie data={userData} />
                            {/* <PieChart charData={userData}/> */}
                        </div>
                    </div>

                    <form class="form">
  
                        <h2>Checkboxes</h2>
                        <div class="inputGroup">
                            <input id="option1" name="option1" type="checkbox"/>
                            <label for="option1">Option One</label>
                        </div>
                        
                        <div class="inputGroup">
                            <input id="option2" name="option2" type="checkbox"/>
                            <label for="option2">Option Two</label>
                        </div>
                    </form>
                {/* </div> */}
                    
                    {/* <canvas id="myChart" width="400" height="400"></canvas> */}


{/* 
              <div className="col-md-6">
                  <div className="panel">
                      <div className="panel-body">
                          <div className="bio-chart">
                              <div style={{display:"inline", width:"100px", height:"100px"}}><canvas width="100" height="100px"></canvas>
                              <input className="knob" data-width="100" data-height="100" data-displayprevious="true" data-thickness=".2" value="35" data-fgcolor="#e06b7d" data-bgcolor="#e8e8e8" style="width: 54px; height: 33px; position: absolute; vertical-align: middle; margin-top: 33px; margin-left: -77px; border: 0px; font-weight: bold; font-style: normal; font-variant: normal; font-stretch: normal; font-size: 20px; line-height: normal; font-family: Arial; text-align: center; color: rgb(224, 107, 125); padding: 0px; -webkit-appearance: none; background: none;">

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
                                <input className="knob" style={{width: "54px", height: "33px", position: "absolute", "vertical-align": "middle", "margin-top": "33px", "margin-left": "-77px", border: "0px", "font-weight": "bold", "font-style": "normal", "font-variant": "normal", "font-stretch": "normal", "font-size": "20px", "line-height": "normal", "font-family": "Arial", "text-align": "center", color: "rgb(76, 197, 205)", padding: "0px", "-webkit-appearance": "none", background: "none"}}>
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
                                <input className="knob" data-width="100" data-height="100" data-displayprevious="true" data-thickness=".2" value="75" data-fgcolor="#96be4b" data-bgcolor="#e8e8e8" style="width: 54px; height: 33px; position: absolute; vertical-align: middle; margin-top: 33px; margin-left: -77px; border: 0px; font-weight: bold; font-style: normal; font-variant: normal; font-stretch: normal; font-size: 20px; line-height: normal; font-family: Arial; text-align: center; color: rgb(150, 190, 75); padding: 0px; -webkit-appearance: none; background: none;">

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
                                <input className="knob" data-width="100" data-height="100" data-displayprevious="true" data-thickness=".2" value="50" data-fgcolor="#cba4db" data-bgcolor="#e8e8e8" style="width: 54px; height: 33px; position: absolute; vertical-align: middle; margin-top: 33px; margin-left: -77px; border: 0px; font-weight: bold; font-style: normal; font-variant: normal; font-stretch: normal; font-size: 20px; line-height: normal; font-family: Arial; text-align: center; color: rgb(203, 164, 219); padding: 0px; -webkit-appearance: none; background: none;">

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
               */}
          </div>

        </React.Fragment>

    )
}


export default GraphCharts;