import axios from 'axios';
import React from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { PieChart } from "react-minimal-pie-chart";
import "./styles.css"


function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }


const Stat = ({token}) => {

    const COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];
    //get token and moderator id
    const navigate = useNavigate();

    // let query = useQuery();
    // const token = query.get('token');

    var decode = jwt_decode(token);
    
    const moderator_id = decode.moderator_id;
    console.log(moderator_id);

    //fetch stats from database
    //aggregate stats
    // const [stats, setStats] = React.useState([
    //     {
    //         id: 1,
    //         name: 'Total Exercises',
    //         value: '0',
    //     },

    //     {
    //         id: 2,
    //         name: 'Total Students',
    //         value: '0',
    //     },
    //     {
    //         id: 3,
    //         name: 'Total approved Exercises',
    //         value: '0',
    //     },
    //     {
    //         id: 4,
    //         name: 'Total pending Exercises',
    //         value: '0',
    //     },
    //     {
    //         id: 5,
    //         name: 'Total attempted Exercises',
    //         value: '0',
    //     },
    //     {
    //         id: 6,
    //         name: 'Total solved Exercises',
    //         value: '0',
    //     },
    // ]);

    //for each exercise type, get the count of exercises of that type
    // const [exerciseTypes, setExerciseTypes] = React.useState([
    //     {
    //         id: 1,
    //         name: 'Total Exercises',
    //         value: '0',
    //     },

    //     {
    //         id: 2,
    //         name: 'Total approved Exercises',
    //         value: '0',
    //     },
    //     {
    //         id: 3,
    //         name: 'Total pending Exercises',
    //         value: '0',
    //     },
    //     {
    //         id: 4,
    //         name: 'Total attempted Exercises',
    //         value: '0',
    //     },
    //     {
    //         id: 5,
    //         name: 'Total solved Exercises',
    //         value: '0',
    //     },
    // ]);

    //initialize state as an empty list
    const [exerciseStat, setExerciseStat] = React.useState([]);
    const [pieData, setPieData] = React.useState([]);

    //when page loads get stats
    React.useEffect(() => {

        //get all stats from database with axios
        const getStats = async () => {
            console.log('get stats');
            const result = await axios.get(
                "http://localhost:8248/moderator/getModStats?token="+token+"&moderator_id="+moderator_id
            );
            
            console.log(result.data);
            setExerciseStat(result.data);

            //set pie data
            var temp = [];
            for (var i = 0; i < result.data.length; i++) {
                temp.push({
                    title: result.data[i].exercise_type + "_" + result.data[i].exercise_id,
                    value: result.data[i].no_of_attempts,
                    color: COLORS[i%COLORS.length]
                });
            }

            console.log("temp");
            console.log(temp);
            setPieData(temp);
        }
    
        getStats();
    }, [] );

    console.log("final exerciseStat:");
    console.log(exerciseStat);

    console.log("pieData:");
    console.log(pieData);


    // console.log("final exerciseStat:");
    // console.log(exerciseStat);

    const updateLevel = (exercise_id, new_level, flag) => {
        console.log("update level");
        console.log(exercise_id);

        if(flag === 0) {
            new_level = new_level - 1;
        }
        else {
            new_level = new_level + 1;
        }
        console.log(new_level);

        if(new_level < 1) {
            new_level = 1;
            alert("Level cannot be less than 1");	
        }
        else if(new_level > 10) {
            alert("Level cannot be greater than 10");	
            new_level = 10;
        }

        
        //set the corresponding level in the state
        for (var i = 0; i < exerciseStat.length; i++) {
            if(exerciseStat[i].exercise_id === exercise_id) {
                setExerciseStat(exerciseStat.map(item => (item.exercise_id === exercise_id ? {...item, level: new_level} : item)));
                break;
            }
        }
    }

    //update the level in the database
    const updateLevelDB = async(exercise_id, new_level) => {
        console.log("update level");
        console.log(exercise_id);
        console.log(new_level);

        //pop up a confirmation box
        if(window.confirm("Are you sure you want to update the level of this exercise?")) {
            
            //post a request to update level

            await axios.post(
                "http://localhost:8248/moderator/updateLevel?token="+token,
                {
                    exercise_id: exercise_id,
                    new_level: new_level
                }
            )
            .then(function (response) {
                console.log(response);
                if(response.status === 200) {
                    alert("Level updated successfully");
                }
                else {
                    alert("Level update failed");
                }
            });
        }
    }



   




  //return the stats with charts

    // for each exercise in exerciseStat, show a chart of attempted and solve for that exercise
  return (
    <div>

        {exerciseStat.length === 0 ? (
            <div>
                <h1>You have not added any exercise</h1>
            </div>
        ) : null
        }
         
       
       {exerciseStat.map((exercise,index) => (
        <>
        
        {/* draw a chart showing percent of attempt and solves */}
        {exercise.no_of_attempts != 0 ? (
            <div className="legends_container_exercise">
            
                <div className="legends">
                    <div className='legend_title'>
                        Attempted % &nbsp;&nbsp;
                    </div>
                    <div className='legend_color'>
                    <span style={{ backgroundColor: "#8884d8" }}>
                    &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    </div>
                </div>

                <div className="legends">
                    <div className='legend_title'>
                        Solved % &nbsp;&nbsp;
                    </div>
                    <div className='legend_color'>
                    <span style={{ backgroundColor:"#82ca9d" }}>
                    &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    </div>
                </div>
            
        </div>
        ) : null
    }
        <div className='exercise-stat-content'>
            <div className='exercise-stat-content-left'>
                <h3><b>No</b>:  &nbsp; {index+1}</h3>
                <h3><b>Exercise Type</b>:  &nbsp; {exercise.exercise_type}</h3>
                <h3><b>Category</b>:  &nbsp; {exercise.category_name}</h3>
                <h3><b>Topic</b>:  &nbsp; {exercise.topic_name}</h3>
                <h3><b>Created at</b>:  &nbsp; {exercise.creation_date}</h3>
                <h3><b>No of attempts</b>:  &nbsp; {exercise.no_of_attempts}</h3>
                <h3><b>No of Solves:</b>  &nbsp; {exercise.no_of_solves}</h3>

                <div className='exercise-stat-level'>
                    <button id={exercise.exercise_id + "_" + exercise.level} onClick={() =>
                        updateLevel(exercise.exercise_id, exercise.level, 0)
                        }><i className="fa fa-minus fa-2x"></i></button>
                    <h3><b>Current Level</b>:  &nbsp; {exercise.level}</h3>
                    <button iden={exercise.exercise_id + "_" + exercise.level} onClick={() =>
                        updateLevel(exercise.exercise_id, exercise.level, 1)
                        }><i className="fa fa-plus fa-2x"></i></button>
                </div>

                <div className='exercise-stat-level-submit'>       
                    <button className="button-85" onClick={() => updateLevelDB(exercise.exercise_id, exercise.level)}>Update Level</button>
                </div>       
            </div>
            
                {exercise.no_of_attempts !=0  ?(
            
                <PieChart
                    animate
                    animationDuration={500}
                    animationEasing="ease-in-out"
                    center={[50, 50]}
                    data={[
                        { title: "Attempted", value: exercise.no_of_attempts/(exercise.no_of_attempts + exercise.no_of_solves), color: "#8884d8" },
                        { title: "Solved", value: exercise.no_of_solves/(exercise.no_of_attempts + exercise.no_of_solves), color: "#82ca9d" },
                    ]}
                    
                    
                    lengthAngle={360}
                    lineWidth={15}
                    paddingAngle={0}
                    radius={30}
                    rounded
                    startAngle={0}
                    viewBoxSize={[100, 100]}

                    label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
                    labelPosition={80}
                    labelStyle={{
                        fontSize: "6px",
                        fontColor: "FFFFFA",
                        fontWeight: "800",
                      }}
                >
                    
                </PieChart>
       ) : <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No attempts to solve yet !</h1>}

       
            
            
        </div>

        </>
        
        ))}


    </div>
  )
}

export default Stat