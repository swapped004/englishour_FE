import axios from 'axios';
import React, { useEffect } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';

// import "./TreeView.css"
// import "./button.css"


function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

const ContentTree = () => {

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
    }

    getDetails();
  }, [] );

    



  //make a treeview from categories, topics and tutorials
  return (
    <div>
        <div className="tree-view">
            <TreeView
                className="tree-view"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {Categories.map((category) => (
                    <TreeItem key={category.category_id} nodeId={category.category_id} label={category.category_name}>
                    
                        {/* filter topics by category_id */}
                        {Topics.filter(topic => topic.category_id === category.category_id).map((topic) => (
                            <TreeItem key={topic.topic_id} nodeId={topic.topic_id} label={topic.topic_name}>
                                <button><i className="fa fa-plus fa-2x"></i></button>
                                {/* filter tutorials by topic_id */}
                                {Tutorials.filter(tutorial => tutorial.topic_id === topic.topic_id).map((tutorial) => (
                                    <TreeItem key={tutorial.tutorial_id} nodeId={tutorial.tutorial_id} label={tutorial.tutorial_title} >
                                        <button><i className="fa fa-plus fa-2x"></i></button>
                                    </TreeItem>
                                ))}
                            </TreeItem>
                        ))}
                    </TreeItem>
                ))}
            </TreeView>
        </div>
    </div>
   
  );
}

export default ContentTree;