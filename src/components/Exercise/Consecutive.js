import axios from 'axios';
import React, { useEffect } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Dropdown } from 'reactjs-dropdown-component';
import { TreeView } from '@material-ui/lab';
import FileUpload from './fileUpload'
import FileList  from './fileList';
import Papa from 'papaparse';


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
  const [files, setFiles] = React.useState([])
  const [fromTutorial, setFromTutorial] = React.useState(false);

  const removeFile = (filename) => {
    setFiles(files.filter(file => file.name !== filename))
  }


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

  const [Level, setLevel] = React.useState(level);
  const level_options = [
    {
      label: '1',
      value: '1',
    },
    {
      label: '2',
      value: '2',
    },
    {
      label: '3',
      value: '3',
    },
    {
      label: '4',
      value: '4',
    },
    {
      label: '5',
      value: '5',
    },
    {
      label: '6',
      value: '6',
    },
    {
      label: '7',
      value: '7',
    },
    {
      label: '8',
      value: '8',
    },
    {
      label: '9',
      value: '9',
    },
    {
      label: '10',
      value: '10',
    }
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

    //if level is blank or undefined, set level to 1
    if(level === undefined || level === ""){
      setFromTutorial(true);
    }
    getDetails();
  }, [] );

  const handleClick = (e) => {
    console.log("clicked");
    console.log("value:"+exercise_type);

    if(exercise_type!==""){
        navigate("/"+exercise_type+"?token="+token+"&tutorial="+tutorial_id+"&level="+Level);
    }

    else
    {
        alert("Please select an exercise type");
    }
  }

  const handleClickFile = async (e) => {
    // e.preventDefault();
    console.log("clicked file add, ", files[0].name);
    const formData = new FormData();
    formData.append(
        "newFile",
        files[0],
        files[0].name
    )
    
    Papa.parse(files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        for(let i=0;i<results.data.length;i++){
          if(results.data[i].type === "sentenceshuffling"){
            axios
            .post("http://localhost:8248/moderator/insert?token="+token, {
              type: "sentenceshuffling",
              level: query.get("level"),
              tutorial_id: query.get("tutorial"),
              correct: results.data[i].CorrectSentences,
              description: results.data[i].Description,
              moderator_id: moderator_id,
              content:"A new exercise of 'Sentence Shuffling' has been added",
            })
            .then(function (response) {
              console.log(response);
            });
          }
          else if(results.data[i].type === "tablecompletion"){

          }
          else if(results.data[i].type === "changeletter"){
            axios
            .post("http://localhost:8248/moderator/insert?token="+token, {
              type: "changeletter",
              level: query.get("level"),
              tutorial_id: query.get("tutorial"),
              hints: results.data[i].Hints,
              answers: results.data[i].Answers,
              description: results.data[i].Description,
              moderator_id: moderator_id,
              content:"A new exercise of 'Change One letter To Make New Word' has been added",
            })
            .then(function (response) {
              console.log(response);
              
            });
          }
          else if(results.data[i].type === "categorizewords"){
            axios
            .post("http://localhost:8248/moderator/insert?token="+token, {
              type: "categorizewords",
              level: query.get("level"),
              tutorial_id: query.get("tutorial"),
              hints: results.data[i].Category,
              answers: results.data[i].CatWords,
              description: results.data[i].Description,
              moderator_id: moderator_id,
              content:"A new exercise of 'Categorize words' has been added",
            })
            .then(function (response) {
              console.log(response);
            });

          }
          else if(results.data[i].type === "fillgaps"){
            axios
            .post("http://localhost:8248/moderator/insert?token="+token, {
              type: "fillgaps",
              level: query.get("level"),
              tutorial_id: query.get("tutorial"),
              passage: results.data[i].Passage,
              description: results.data[i].Description,
              moderator_id: moderator_id,
              content:"A new exercise of 'Fill in the Gaps' has been added",
            })
            .then(function (response) {
              console.log(response);
            });
          }
        }
      },
    });
  }




  //return a dropdown to choose type
  return (
    <div className='consecutive_container'>
      {/* show hierarchy with category, topic, level */}
      <div className='hierarchy'>
        <h1>  {exercise_details.category_name} &nbsp;&nbsp;</h1>
        <h3> &#8594;&nbsp;&nbsp;{exercise_details.topic_name} &nbsp;&nbsp;</h3>
        <h3> &#8594;&nbsp;&nbsp;{exercise_details.tutorial_name} &nbsp;&nbsp;</h3>
        {fromTutorial? null : <h3> &#8594;&nbsp;&nbsp;level =  {level}</h3>}
      </div>

      <div className='dropdown_consecutive_container'>
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

        {fromTutorial? 
        <div className='dropdown_type'>
          <Dropdown
              name="Level"
              titleSingular="Level"
              title="Level"
              list={level_options}
              //on change, set the exercise type to the value of the dropdown
              onChange={(e) => setLevel(e.value)}
          />
        </div>
        :
          null
        }
      </div>

      <div className='button-85'>
        < button onClick={() => handleClick()}>
          Manual Input
        </button>
      </div>
      <div><h1>OR</h1></div>
        <div className="titlefile">Upload file</div>
        <FileUpload files={files} setFiles={setFiles} removeFile={removeFile}/>
        <FileList files={files} removeFile={removeFile} />
        <div className='button-85'>
        < button onClick={() => handleClickFile()}>
          UPLOAD FILE
        </button>
      </div>
    </div>
  )
}

export default Consecutive;