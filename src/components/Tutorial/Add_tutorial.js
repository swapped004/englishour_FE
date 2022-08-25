import React, { useState } from 'react'
import Yamde from 'yamde'
import { Link } from "react-router-dom";
import "./button.css";
// import { PropTypes } from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';

const Add_tutorial = () => {

    //get token
    const navigate = useNavigate();
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
        var ok = 0;
        var tutorial_id = 0;

        await axios.post("http://localhost:8248/moderator/addTutorial?token="+token, {
            tutorial_title: tutorial_title,
            topic_id: topic_id,
            moderator_id: moderator_id,
            content: text,
          })
          .then(function (response) {
            console.log(response.data);
            tutorial_id = response.data.tutorial_id
            ok = 1;
        })
        .catch((err) => {
          alert("Invalid data");
      });
      console.log(tutorial_id);
      if(ok===1){
        var txt="";
        if (window.confirm("Tutorial Added Successfully! Do you want to add exercise under this tutorial?")) {
            txt = "Yes";
          } else {
            txt = "No";
          }
      }
      if(txt === "No"){
        navigate("/tutorial?token="+token);  
      }
      else{
        navigate("/consecutive?token="+token+"&tutorial="+tutorial_id+"&level=");
      }

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

            <Link to="#" className="button-85" onClick={SubmitHandler}>Submit</Link>
            {/* <a className="button-75" href="#popup" onSubmit={SubmitHandler}> <i className="fa fa-edit"></i> Submit</a> */}
            {/* <div className="popup" id="popup">
                <div className="popup-inner">
                    <div className="popup-left">                        
                        <div className="popup-img-btn"><button>CHANGE</button></div>
                    </div>
                </div>
            </div> */}
        </>
    );
  }

export default Add_tutorial;


