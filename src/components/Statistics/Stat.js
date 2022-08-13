import axios from 'axios';
import React from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";


function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }


const Stat = () => {


    //get token and moderator id
    const navigate = useNavigate();

    let query = useQuery();
    const token = query.get('token');

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
    

     //get all stats from database with axios
     const getStats = async () => {
        console.log('get stats');
        const result = await axios.get(
            "http://localhost:8248/moderator/getModStats?token="+token+"&moderator_id="+moderator_id
        );

        console.log(result.data);

        for (let i = 0; i < result.data.length; i++) {
            console.log("backend data",i);
            console.log(result.data[i]);

            setTimeout(() => {
                setExerciseStat(prevState => [...prevState, result.data[i]]);
              }, 10);

            console.log("exercisStat");
            console.log(exerciseStat);
            
        }

        
        
    }

    //when page loads get stats
    React.useEffect(() => {
       

        getStats();

        console.log("final exerciseStat:");
        console.log(exerciseStat);
    }, [] );


    // console.log("final exerciseStat:");
    // console.log(exerciseStat);





  //return the stats with charts

  return (
    <div>
        stat

    </div>
  )
}

export default Stat