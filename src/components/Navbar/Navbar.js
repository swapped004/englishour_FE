import React from 'react';
import "./Navbar.css";
import "../ModeratorProfile/editProfileCss.css"

import axios from 'axios'


import { Link } from 'react-router-dom';


const NavBar = ({logged_in, Logout_func, token, isAdmin}) => {
    

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
    //     // const getExInfo = async (id) => {
    //     //     const response = await fetch("http://localhost:8248/moderator/exerciseInfo/moderator_id?moderator_id="+id+"&token="+token);
    //     //     const data = await response.json();
    //     //     // console.log(data);
    //     //     setExInfo(data);
    //     // }
    //     // const getTutorialInfo = async (id) => {
    //     //     const response = await fetch("http://localhost:8248/moderator/TutorialInfo/moderator_id?moderator_id="+id+"&token="+token);
    //     //     const data = await response.json();
    //     //     // console.log(data);
    //     //     setTutorialInfo(data);
    //     // }
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



        //     const response = await axios.post("http://localhost:8248/moderator/updatePassword?token="+token, {
        //         moderator_id: id,
        //         password: password.NewPassword
        //     });
        //     console.log(response);
        //     alert("Password updated successfully!");
        }
    }


    
    
    
    
    console.log("Navbar isAdmin: ", isAdmin);

    // const viewGraphFunc = () => {
    //     if(isAdmin)
    //     {
    //         return 
    //     }
    // }

    return (

    <div className="navbar-container">

        <div className="navbar-logo">
            <Link to={logged_in ? "/homepage" : "/"}>
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

                    {/* <Link to={"/exercise?token="+token} className={logged_in ? "navbar-link" :"hidden" }>Add</Link> */}
                    <a className="button" href="#popupPassword" onClick={fetchCategory}> <i className="fa fa-key"></i> Add</a>

                    <div className="popup" id="popupPassword">
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
                
                
                </li>
                }

                {!isAdmin &&
                <li>
                    <Link to={"/exercise?token="+token} className={logged_in ? "navbar-link" :"hidden" }>Exercise</Link>
                </li>
                }
                {!isAdmin &&
                <li>
                    <Link to={"/tutorial?token="+token} className={logged_in ? "navbar-link" :"hidden" }>Tutorial</Link>
                </li>
                }   
                <li>
                    <Link to="/" className={logged_in ? "navbar-btn" : "hidden"} onClick={Logout_func}>Logout</Link>
                </li>
            </ul>
        </div>
    </div>
  );
};

export default NavBar;
