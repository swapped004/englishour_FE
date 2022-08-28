
import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'

import {Bar} from 'react-chartjs-2';
import {Line} from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';

import {Chart as ChartJS} from 'chart.js/auto';



import "../ViewGraph/graphCss.css";   


  function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
 }
const AddCategory = () => {
    let query = useQuery();
    const token = query.get('token');
    console.log("token in graph: ", token);

    // const [modExGraph, setModExGraph] = useState({});

    // const [moderatorEx, setModeratorEx] = React.useState([{exercise_id:"", exercise_type:"", added_ex_count:"", moderator_name:"", moderator_id:"" }]);


    const [categories, setCategories] = React.useState([]);
    const [topics, setTopics] = React.useState([{"category_name": "", "topics_list": ['',]},]);

    const [newCategory, setNewCategory] = React.useState({category_name:""});



    React.useEffect(() => {
        console.log("admin profile e ashchi");
        const getCategories = async () => {
            const response = await fetch("http://localhost:8248/moderator/categoryDetails?token="+token);
            const data = await response.json();
            // setInfo(data);

            setCategories(data);
        }

        const getTopics = async (category_name) => {

            const response = await fetch("http://localhost:8248/moderator/topicDetails?category_name=all&token="+token);

            const data = await response.json();
        
            // setTopics([...topics, {"category_name": category_name, "topics_list": data}]);

            setTopics(data);
        }
       
        // console.log("cate")
        getCategories(); 
        // getExInfo(id);
        // getTutorialInfo(id);

        // categories.map(category => getTopics(category.category_name))

        getTopics();
        

    }, []);


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

        for(let category of categories)
        {
            if(category.category_name === newCategory.category_name)
            {
                alert("Category already exists");
                return;
            }
        }



        console.log("categories", categories);
        console.log("topics", topics);



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


 
    return (
        <React.Fragment>

            <div className="row">
                <div className="col-md-12" style={{"margin": "10rem 0"}}>
                    <h2 style={{"text-align":"center", "width": "100%"}}>Exercise Added by Moderators</h2>
                    <div style={{width: 700, "margin": "auto"}}>

                        <form onSubmit={handleCategorySubmit}>
                            <div className="form-inline popup-text-content" style={{"background": "#ddd", padding: "2rem", "border-radius": "1rem"}}>
                            <label style={{"font-size": "2rem", display: "block",width: "25rem"}}>Existing Categories: </label><br/>
                            {topics.map(topic_dict => (
                                <>
                                <label style={{"font-size": "1.8rem", display:"block"}}>{topic_dict.category_name}</label>
                                
                                <label style={{"margin-left": "2rem", "font-size": "1.8rem", display:"block"}}>Topics:</label>
                                {topic_dict.topics_list.map(topic_name =>
                                    <>
                                    &nbsp;&nbsp;&nbsp;&nbsp; <label style={{"font-size": "1.6rem", "margin-left": "2rem",display:""}}>{topic_name}</label><br/>
                                    </>
                                    )}
                                    <br/>
                                    </>
                                )

                            )}

                            <label style={{"font-size": "1.8rem"}}>New Category: </label>
                            <input type="text" style={{"background": "#fff"}} name="NewCategory" defaultValue={""}  onChange={e => handleCategoryChange(e)} />
                            <br/>
                            
                            </div>
                            <div className="button-section">
                                <button className="button cancel-btn" type="submit" onClick={e => handleCategorySubmit(e)}>Update</button>                     
                            </div>
                        </form>
                    </div>
                </div>
            </div>
                 
              {/* <div className="col-md-6">
                  <div className="panel">
                      <div className="panel-body">
                          <div className="bio-chart">
                              <div style={{display:"inline", width:"100px", height:"100px"}}><canvas width="100" height="100px"></canvas>
                              <input className="knob" data-width="100" data-height="100" data-displayprevious="true" data-thickness=".2" value="35" data-fgcolor="#e06b7d" data-bgcolor="#e8e8e8" style="width: 54px; height: 33px; position: absolute; vertical-align: middle; margin-top: 33px; margin-left: -77px; border: 0px; font-weight: bold; font-style: normal; font-variant: normal; font-stretch: normal; font-size: 20px; line-height: normal; font-family: Arial; text-align: center; color: rgb(224, 107, 125); padding: 0px; -webkit-appearance: none; background: none;">

                              </div>
                          </div>
                          <div className="bio-desk">
                              <h4 className="red">Envato Website</h4>
                              <p>Started : 15 July</p>
                              <p>Deadline : 15 August</p>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="col-md-6">
                  <div className="panel">
                      <div className="panel-body">
                          <div className="bio-chart">
                              <div style={{display:"inline", width:"100px", height:"100px"}}><canvas width="100" height="100px"></canvas>
                              <form>
                                <input className="knob" style={{width: "54px", height: "33px", position: "absolute", "vertical-align": "middle", "margin-top": "33px", "margin-left": "-77px", border: "0px", "font-weight": "bold", "font-style": "normal", "font-variant": "normal", "font-stretch": "normal", "font-size": "20px", "line-height": "normal", "font-family": "Arial", "text-align": "center", color: "rgb(76, 197, 205)", padding: "0px", "-webkit-appearance": "none", background: "none"}}>
                              </form>
                              </div>
                          </div>
                          <div className="bio-desk">
                              <h4 className="terques">ThemeForest CMS </h4>
                              <p>Started : 15 July</p>
                              <p>Deadline : 15 August</p>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="col-md-6">
                  <div className="panel">
                      <div className="panel-body">
                          <div className="bio-chart">
                              <div style={{display:"inline", width:"100px", height:"100px"}}><canvas width="100" height="100px"></canvas>
                                <input className="knob" data-width="100" data-height="100" data-displayprevious="true" data-thickness=".2" value="75" data-fgcolor="#96be4b" data-bgcolor="#e8e8e8" style="width: 54px; height: 33px; position: absolute; vertical-align: middle; margin-top: 33px; margin-left: -77px; border: 0px; font-weight: bold; font-style: normal; font-variant: normal; font-stretch: normal; font-size: 20px; line-height: normal; font-family: Arial; text-align: center; color: rgb(150, 190, 75); padding: 0px; -webkit-appearance: none; background: none;">

                              </div>
                          </div>
                          <div className="bio-desk">
                              <h4 className="green">VectorLab Portfolio</h4>
                              <p>Started : 15 July</p>
                              <p>Deadline : 15 August</p>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="col-md-6">
                  <div className="panel">
                      <div className="panel-body">
                          <div className="bio-chart">
                              <div style={{display:"inline", width:"100px", height:"100px"}}>
                                <canvas width="100" height="100px"></canvas>
                                <input className="knob" data-width="100" data-height="100" data-displayprevious="true" data-thickness=".2" value="50" data-fgcolor="#cba4db" data-bgcolor="#e8e8e8" style="width: 54px; height: 33px; position: absolute; vertical-align: middle; margin-top: 33px; margin-left: -77px; border: 0px; font-weight: bold; font-style: normal; font-variant: normal; font-stretch: normal; font-size: 20px; line-height: normal; font-family: Arial; text-align: center; color: rgb(203, 164, 219); padding: 0px; -webkit-appearance: none; background: none;">

                                </div>
                          </div>
                          <div className="bio-desk">
                              <h4 className="purple">Adobe Muse Template</h4>
                              <p>Started : 15 July</p>
                              <p>Deadline : 15 August</p>
                          </div>
                      </div>
                  </div>
              </div> */}
          {/* </div> */}

        </React.Fragment>

    )
}


export default AddCategory;