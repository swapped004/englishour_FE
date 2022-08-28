import React from 'react';
import "./Navbar.css";
import "../ModeratorProfile/editProfileCss.css"

import { Link, useNavigate } from 'react-router-dom';
import Notification from "./notification5.png";
import "./notification.css";
import "./Popup.css";
import jwt_decode from "jwt-decode";
import "./moderatorTimelineCss.css"
import axios from 'axios';



const NavBar = ({logged_in, Logout_func, token, isAdmin, setOpen, open, setIsClicked, isClicked}) => {
    
    console.log("Navbar isAdmin: ", isAdmin, open);
    const navigate = useNavigate();
    
    const [notification, setNotification] = React.useState([{notification_id:"",content:"",date:""}]);
    const [Exercise, setExercise] = React.useState("");
    

    const getNotification = async (id) => {
        const response = await fetch("http://localhost:8248/moderator/notification/moderator_id?moderator_id="+id+"&token="+token);
        const data = await response.json();
        // console.log("Notification in navbar first call",data);
        setNotification(data);
        // await delay(5000);
        // handleExerciseInfo(token);
    }
    
    const handleExerciseInfo = async (token1) => {
        var exId="";
        // console.log("Notification in navbar",notification);
        for(let i=0;i<notification.length;i++){
          exId += notification[i].content.split("#")[1]+"x";
        }
        console.log("combined exid",exId);
        if(exId!=="undefinedx"){
            const data = await axios.get(
                "http://localhost:8248/moderator/exerciseDetails?token="+token1+"&exercise_id="+exId
            );
            setExercise(data.data);
        }
    }
    
    React.useEffect(() => {
        setOpen(true);
        if(logged_in){
            var decode = jwt_decode(token);
            console.log("I am getting called continuously");
            getNotification(decode.moderator_id);
        }
        if(logged_in && notification.length !== 0){
            console.log("I too am getting called continuously");
            handleExerciseInfo(token);
        }             
    }, [logged_in]);

    const Caller = (boolData1) => {
        // e.preventDefault();
        setOpen(boolData1);
        isClicked = isClicked + 1;
        setIsClicked(isClicked);
        if(boolData1){
            var decode = jwt_decode(token);
            getNotification(decode.moderator_id);
            handleExerciseInfo(token);
        }
        console.log("Notification in navbar ", notification);
        console.log("Exercise in navbar ", Exercise);
    }
    

    const [categories, setCategories] = React.useState([]);
    const [topics, setTopics] = React.useState([{"category_name": "", "topics_list": ['',]},]);

    const [newCategory, setNewCategory] = React.useState({category_name:""});
    
    // React.useEffect(() => {
    //     console.log("admin profile e ashchi");
    //     const getCategories = async () => {
    //         const response = await fetch("http://localhost:8248/moderator/categoryDetails?token="+token);
    //         const data = await response.json();
    //         // setInfo(data);

    //         setCategories(data);
    //     }

    //     const getTopics = async (category_name) => {

    //         const response = await fetch("http://localhost:8248/moderator/topicDetails?category_name="+category_name + "&token="+token);
            
    //         setTopics([...topics, {category_name: response}]);
    //     }
    //    
    //     getCategories(); 
    //     // getExInfo(id);
    //     // getTutorialInfo(id);

    //     categories.map(category => getTopics(category.category_name))

    //     console.log("categories", categories);
    //     console.log("topics", topics);

    // }, []);
    

    const getTopics = async (category_name) => {

        const response = await fetch("http://localhost:8248/moderator/topicDetails?category_name="+category_name + "&token="+token);
        const data = await response.json();
        
        setTopics([{"category_name": category_name, "topics_list": data}]);
    }

    const getCategories = async () => {
        const response = await fetch("http://localhost:8248/moderator/categoryDetails?token="+token);
        const data = await response.json();

        setCategories(data);
    }

    const fetchCategory = async () => {

        getCategories();

        console.log("categories", categories);

        fetchTopics();

        console.log("topics", topics);
    }

    const fetchTopics = async () => {

        console.log("inside fetch topics");

        for(let category of categories)
        {
            getTopics(category.category_name);
        }

        categories.map(category => getTopics(category.category_name))

    }


    const handleCategoryChange =  async (e) => {
        e.preventDefault();

        const item = e.target.name;

        console.log("change value: ", e.target.value);

        setNewCategory({"category_name": e.target.value});

        // const updatedValue = { ...newCategory, [item]: e.target.value };
        // setNewCategory(newCategory => ({
        //     ...newCategory,
        //     ...updatedValue
        // }));
    }

    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        let category_id = -1
        if(newCategory.category_name === ""){
            alert("Category name cannot be empty");
        }
        else{

            await axios.post("http://localhost:8248/moderator/setCategory?token="+token, {
                newCategory: newCategory,
                
              })
              .then(function (response) {
                console.log(response.data);
                category_id = response.data.category_id
            })
            .catch((err) => {
                console.log(err);
              alert("Invalid data");
          });

          if(category_id !== -1)
          {
            alert("successful");
          }

        }
    }
    
    console.log("Navbar isAdmin: ", isAdmin);

    // const viewGraphFunc = () => {
    //     if(isAdmin)
    //     {
    //         return 
    //     }
    // }


    const generateMonth = (TotalTimeStamp) => {
        const m = parseInt(TotalTimeStamp.split("T")[0].split("-")[1]);
        const d = TotalTimeStamp.split("T")[0].split("-")[2]
        const year = TotalTimeStamp.split("T")[0].split("-")[0]
        const monthNames = [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC"
        ];
        return d+" "+monthNames[m-1]+" "+year;
    }
    
    //   const handleRead = () => {
    //     setNotification([{}]);
    //     setOpen(false);
    //   };


    return (
    <div className="navbar-container">

        <div className="navbar-logo">
            <Link to={logged_in ? "/homepage?token="+token : "/"}>
            <img src={require('../../images/logo2.png')} alt="logo" />
            </Link>
        </div>

        <div className="hamburger">
        </div>
        <div className="hamburger">
        </div>

        <div className="navbar-menu">
            <ul>

                <li>
                    <Link to={"/viewgraph?token="+token} className={(logged_in && isAdmin) ? "navbar-link" : "hidden"}>View Stat</Link>
                </li>

                <li>
                    <Link to={isAdmin?"/adminprofile?token="+token:"/profile?token="+token} className={logged_in ? "navbar-link" :"hidden" }>Profile</Link>
                </li>

                <li>
                    <Link to={"/about"} className="navbar-link">About</Link>
                </li>

                <li>
                    <Link to="/login" className={logged_in ? "hidden" :"navbar-link" }>Sign In</Link>
                </li>

                {isAdmin &&
                <li>

                    <Link to={"/addcategory?token="+token} className={logged_in ? "navbar-link" :"hidden" }>Add</Link>
                    {/* <a className="button" href="#popupPassword" onClick={fetchCategory}> <i className="fa fa-key"></i> Add</a> */}

                    {/* <div className="popup" id="popupPassword">
                                    <div className="popup-inner">
                                    <div className="popup__text" style={{width:"100%"}}>
                                    <form onSubmit={handleCategorySubmit}>
                                            <div className="form-inline popup-text-content">
                                            <label style={{width: "20rem"}}>Existing Categories: </label><br/>
                                            {topics.map(topic_dict => (
                                                <>
                                                <label>{topic_dict.category_name}</label><br/>
                                                &nbsp;
                                                Topics: &nbsp;&nbsp;
                                                {topic_dict.topics_list.map(topic =>
                                                    <>
                                                    <label>{topic.topic_name}</label><br/>
                                                    </>
                                                    )}
                                                    </>
                                                )

                                            )}

                                            <label>New Category: </label>
                                            <input type="text" name="NewCategory" defaultValue={""}  onChange={e => handleCategoryChange(e)} />
                                            <br/>
                                         
                                            </div>
                                        <div className="button-section">
                                            <button className="button cancel-btn" type="submit" onClick={e => handleCategorySubmit(e)}>Update</button>                     
                                        </div>
                                    </form>
                                    </div>
                                </div>
                                <div>
                                    <a className="popup__close" href="#">X</a>
                                </div>
                            </div>
                 */}
                
                </li>
                }

                {!isAdmin &&
                <li>
                    <Link to={"/exercise?token="+token} className={logged_in ? "navbar-link" :"hidden" }>Index</Link>
                </li>
                }
                {!isAdmin &&
                <li>
                    <Link to={"/tutorial?token="+token} className={logged_in ? "navbar-link" :"hidden" }>Tutorial</Link>
                </li>
                }   
                <li>
                    <div className={logged_in ? "iconNot" :"hidden" } onClick={() => Caller(!open)}>
                        <img src={Notification} className="iconImgNot" alt="" />
                        {notification.length > 0 && <div className="counterNot">{notification.length}</div>}
                    </div>
                </li>
                <li>
                    <Link to="/" className={logged_in ? "navbar-btn" : "hidden"} onClick={Logout_func}>Logout</Link>
                </li>
            </ul>
        </div>
        {open && logged_in && (notification.length > 0) ?
            <div className="mainNot">
                <div className="popupNot">
                    <div className="popupNot-header">
                        <h1>Notifications!</h1>
                        <h1 onClick={() => setOpen(!open)}>X</h1>
                    </div>
                {/* <div>
                    <p>This is simple popup in React js</p>
                </div> */}
                {notification.map((item, index) => (
                        <li>
                            <span>{generateMonth(item.date)}</span>
                            <div class="content">
                                <p>
                                    {/* <Link to={"/preview"+Exercise.split("#")[index]+"?token="+token+"&exercise_id="+item.content.split("#")[1]+"&notification_id="+item.notification_id} style={{ fontSize: "18px", fontWeight: 700 }}>{item.content.split("#")[0]}</Link> */}
                                    {isClicked > 0 ? <Link to={"/preview"+Exercise.split("#")[index]+"?token="+token+"&exercise_id="+item.content.split("#")[1]+"&notification_id="+item.notification_id} style={{ fontSize: "18px", fontWeight: 700 }}>{item.content.split("#")[0]}</Link> : item.content.split("#")[0]}
                                </p>
                            </div>
                        </li>
                ))}
                </div>
            </div>:""
        }
    </div>
  );
};

export default NavBar;
