import React, { useState } from 'react'
import Yamde from 'yamde'
import { Link } from "react-router-dom";
import "./button.css";
// import { PropTypes } from 'prop-types';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';

const Add_tutorial = () => {

    //get token
    function useQuery() {
        const { search } = useLocation();
      
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    let query = useQuery();
    const token = query.get('token');
    var decoded_token = jwt_decode(token);

    //get topic id from url
    function useQuery2() {
        const { search } = useLocation();

        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    let query2 = useQuery2();
    const topic_id = query2.get('topic_id');
    console.log(topic_id);

    //get moderator_id
    const moderator_id = decoded_token.moderator_id;
    console.log("moderator_id:" + moderator_id);


    const[tutorial_title, setTutorialTitle] = useState('');
    const [text, setText] = useState('')
    const [isLightMode, setIsLightMode] = useState(true);


    const SubmitHandler = async (e) => {
        e.preventDefault();
        console.log(text);
        console.log(tutorial_title);

        await axios.post("http://localhost:8248/moderator/addTutorial?token="+token, {
            tutorial_title: tutorial_title,
            topic_id: topic_id,
            moderator_id: moderator_id,
            content: text,
          })
          .then(function (response) {
            console.log(response.data);
        })
        .catch((err) => {
          alert("Invalid data");
      });

    };

    const ChangeMode = () => {
        setIsLightMode(!isLightMode);
    };

    return(
        <>
        <div className="pageHeader">Add Tutorial</div>
         <button
            className={!isLightMode ? "light-mode" : "dark-mode"}
            onClick={ChangeMode}>
            {!isLightMode ? "Dark Mode" : "Light Mode"}
        </button>

    

        <div className='tutorial-title'>
            <input type="text" placeholder="Title" value={tutorial_title} onChange={(e) => setTutorialTitle(e.target.value)}/>
        </div>
            <Yamde
            value={text}
            handler={setText}
            theme={isLightMode ? "light" : "dark"}></Yamde>

            <Link to="#" className="button-54" onClick={SubmitHandler}>Submit</Link>

            {/* render markdown text

            <div className="tutorial-content">
                <ReactMarkdown remarkPlugins={[[remarkGfm], {singleTilde: false}]}>{text}</ReactMarkdown>
            </div> */}
        </>


    );
  }

export default Add_tutorial;


