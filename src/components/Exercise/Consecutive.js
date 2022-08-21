import axios from 'axios';
import React, { useEffect } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Dropdown } from 'reactjs-dropdown-component';
import { TreeView } from '@material-ui/lab';

import "./Consecutive.css"
import "./button.css"


function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

const Consecutive = () => {

  const navigate = useNavigate();

  let query = useQuery();
  const token = query.get('token');

  var decode = jwt_decode(token);

  const moderator_id = decode.moderator_id;
  console.log(moderator_id);

  const level = query.get('level');
  console.log(level);

  const tutorial_id = query.get('tutorial');
  console.log(tutorial_id);

  const type = query.get('type');


  const [exercise_type, setExerciseType] = React.useState(type);
  const type_options = [
    {
      label: 'Table Completion',
      value: 'tablecompletion',
    },
    {
        label: 'Change Letter',
        value: 'changeletter',
    },
    {
        label: 'Categorize Words',
        value: 'categorizewords',
    },
    {
        label: 'Sentence Shuffling',
        value: 'sentenceshuffling',
    },
    {
      label: 'Fill in the Gaps',
      value: 'fillgaps',
    },
  ];

  const [exercise_details, setExerciseDetails] = React.useState({
    tutorial_name: "",
    topic_name: "",
    category_name: "",
  });

  React.useEffect(() => {

    //get all stats from database with axios
    const getDetails = async () => {
        console.log('get exercise details');
        const result = await axios.get(
            "http://localhost:8248/moderator/getConsecutiveDetails?token="+token+"&tutorial_id="+tutorial_id
        );
        
        console.log(result.data);
        setExerciseDetails(result.data);
    }

    getDetails();
  }, [] );

  const handleClick = (e) => {
    console.log("clicked");
    console.log("value:"+exercise_type);

    if(exercise_type!=""){
        navigate("/"+exercise_type+"?token="+token+"&tutorial_id="+tutorial_id+"&level="+level);
    }

    else
    {
        alert("Please select an exercise type");
    }
  }




  //return a dropdown to choose type
  return (
    <div className='consecutive_container'>
      {/* show hierarchy with category, topic, level */}
      <div className='hierarchy'>
        <h1>  {exercise_details.category_name} &nbsp;&nbsp;</h1>
        <h3> &#8594;{exercise_details.topic_name} &nbsp;&nbsp;</h3>
        <h3> &#8594; {exercise_details.tutorial_name} &nbsp;&nbsp;</h3>
        <h3> &#8594; level =  {level}</h3>
      </div>

      <div className='dropdown_type'>
        <Dropdown
            name="Exercise Type"
            titleSingular="Type"
            title="Exercise Type"
            list={type_options}
            //on change, set the exercise type to the value of the dropdown
            onChange={(e) => setExerciseType(e.value)}
        />
      </div>

      <div className='button-54'>
        < button onClick={() => handleClick()}>
          Next
        </button>
      </div>
      

    </div>
  )
}

export default Consecutive