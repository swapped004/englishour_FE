import axios from 'axios';
import React, { useEffect } from 'react'
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import { makeStyles } from '@material-ui/core/styles';
// import Popup from './Popup';

import "./ContentTree.css"
// import "./button.css"


function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

const useStyles = makeStyles({
  label: {
    color: "black",
    fontSize: "30px",
    fontFamily:"Roboto",
  },

  container:
  {
    color: "grey",
  }
});

const ContentTree = () => {
  const classes = useStyles();
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

  // const [openPopup, setOpenPopup] = React.useState(false);
  const [exercise_type, setExerciseType] = React.useState(type);
  const type_options = [
    {
      label: 'Fill in the Gaps',
      value: 'Fill in the Gaps',
    },
    {
      label: 'Group Words',
      value: 'Group Words',
    },
    {
      label: 'Read Complete',
      value: 'Read Complete',
    },
    {
      label: 'Change One Letter',
      value: 'Change One Letter',
    },

    {
      label: 'Sentence Shuffling',
      value: 'Sentence Shuffling',
    }
  ];

  const [exercise_details, setExerciseDetails] = React.useState({
    tutorial_name: "",
    topic_name: "",
    category_name: "",
  });

  const [Categories, setCategories] = React.useState([]);
  const [Topics, setTopics] = React.useState([]);
  const [Tutorials, setTutorials] = React.useState([]);
  const [Exercises, setExercises] = React.useState([]);
  const Levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

 


  React.useEffect(() => {

    //get tree_view from database with axios
    const getDetails = async () => {
        console.log('get exercise details');
        const result = await axios.get(
            "http://localhost:8248/moderator/getTreeView?token="+token
        );
        
        console.log(result.data);
        setCategories(result.data.categories);
        setTopics(result.data.topics);
        setTutorials(result.data.tutorials);
        setExercises(result.data.exercises);
    }

    getDetails();
  }, [] );

  const add_tutorial_handler =  (topic_id) => {
    
    console.log("topic_id: " + topic_id);
    navigate("/add_tutorial?token="+token+"&topic_id="+topic_id);
  }

  const add_exercise_handler =  (tutorial_id, level) => {

    console.log("tutorial_id: " + tutorial_id);
    console.log("level: " + level);


    console.log("level: "+level);
    // setOpenPopup(true);
    navigate("/consecutive?token="+token+"&tutorial="+tutorial_id+"&level="+level);
  }



  //make a treeview from categories, topics and tutorials
  return (
    <div>
        <div className="tree-view-container">
            <TreeView
                classes={{label: classes.container}}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}

            >
                {Categories.map((category) => (
                    <TreeItem classes={{label: classes.label}} key={"category_"+category.category_id} nodeId={"category_"+category.category_id} label={category.category_name}>
                    
                        {/* filter topics by category_id */}
                        {Topics.filter(topic => topic.category_id === category.category_id).map((topic) => (
                            <TreeItem classes={{label: classes.label}} key={"topic_"+topic.topic_id} nodeId={"topic_"+topic.topic_id} label={topic.topic_name}>
                                
                                {/* filter tutorials by topic_id */}
                                {Tutorials.filter(tutorial => tutorial.topic_id === topic.topic_id).map((tutorial) => (
                                    <TreeItem classes={{label: classes.label}} key={"tutorial_"+tutorial.tutorial_id} nodeId={"tutorial_"+tutorial.tutorial_id} label={tutorial.tutorial_title} >
                                      {/* Levels 1-10 */}
                                      {Levels.map((level) => (
                                          <TreeItem classes={{label: classes.label}} key={"level_"+level} nodeId={"level_"+level} label={level}>
                                            {/* filter exercises by tutorial_id and level */}
                                            {Exercises.filter(exercise => exercise.tutorial_id === tutorial.tutorial_id && exercise.level === level).map((exercise,index) => (
                                                <Link to={"/tree"+exercise.exercise_type+"?token="+token+"&level="+level+"&tutorial="+tutorial.tutorial_id+"&exercise_id="+exercise.exercise_id}>
                                                <TreeItem classes={{label: classes.label}} key={"exercise_"+exercise.exercise_id} nodeId={"exercise_"+exercise.exercise_id} label={"-  "+(index + 1) + "(" +exercise.exercise_type+")"}>
                                                </TreeItem>
                                                </Link>
                                                
                                            ))}
                                            {console.log(level)}
                                            {/* onClick function depending on button id */}
                                            
                                              <button id={tutorial.tutorial_id+"_"+level} onClick={() => add_exercise_handler(tutorial.tutorial_id, level)}><i className="fa fa-plus-square fa-2x"></i></button>
                                            
                                          </TreeItem>
                                      ))}
                                    </TreeItem>
                                ))}
                                {console.log(topic)}
                                {/* onClick function depending on button id */}
            
                                  <button id={topic.topic_id} onClick={()=>add_tutorial_handler(topic.topic_id)}>
                                    <i  className="fa fa-plus-square fa-2x"></i>
                                  </button>
                                  
                            </TreeItem>
                        ))}
                    </TreeItem>
                ))}
            </TreeView>
        </div>
        {/* <Popup openPopup={openPopup} setOpenPopup = {setOpenPopup}>
            
        </Popup> */}
    </div>
   
  );
}

export default ContentTree;