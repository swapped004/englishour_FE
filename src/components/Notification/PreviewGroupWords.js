import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom';
import "./sideByside.css"
import "./button.css";
import axios from 'axios'

const useStyles = () => ({})
function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const PreviewGroupWords = ({setOpen, setIsClicked}) => {
    const classes = useStyles()
    const navigate = useNavigate();
    setOpen(false);

    const [formData, setFormData] = useState({whole:""});
    let query = useQuery();
    const token = query.get('token');
    const exercise_id = query.get('exercise_id');
    const notification_id = query.get('notification_id');
    console.log(exercise_id);

    React.useEffect(() => {
      const getFormData = async (id) => {
          const response = await axios.get("http://localhost:8248/moderator/exercisePreview?exercise_id="+id+"&token="+token+"&exercise_type=categorizewords");
          console.log(response.data);
          setFormData({whole:response.data});
      }
      getFormData(exercise_id);             
    }, []);

    console.log(formData.whole);
    var temp = [];
    let categories = [];
    let answers = [];

    let description = "";
    temp = formData.whole.split("###");
    for(var i = 1; i < temp.length-1; i++) {
        // infos.push(temp[i]);

        let items = temp[i].split("##");
        categories.push(items[0]);
        let item_answers = [];
        if(items.length > 1){
            item_answers = items[1].split("#");
        }

        for(let tempAns of item_answers){
            answers.push(tempAns);
        }        
    }
    description = temp[0];

    const handleApprove = async (e) => {
      e.preventDefault();
      const response = await axios.post("http://localhost:8248/moderator/approveExercise?notification_id="+notification_id+"&token="+token+"&status=approved");
      console.log(response.data)
      alert("Approved Successfully");
      if(response.data === "Status Updated") {
        navigate('/profile?token='+token);
        window.location.reload(true);
      }
    }
    const handleDecline = async (e) => {
      e.preventDefault();
      const response = await axios.post("http://localhost:8248/moderator/approveExercise?notification_id="+notification_id+"&token="+token+"&status=declined");
      console.log(response.data);
      alert("Declined Successfully");
      if(response.data === "Status Updated") {
        navigate('/profile?token='+token);
        window.location.reload(true);
      }
    }

    return (
      <div>
        <div className="float-container">
          <div className={classes.Totalss}>
            <div className="float-child" style={{"padding": "0 10rem"}}>
              <Row>
                <Col><h2><span style={{fontWeight: 'bold'}}>Preview</span></h2></Col>
                <Col>
                  <p><h3><span style={{fontWeight: 'bold'}}>{description}</span></h3></p>
                </Col>
              </Row>




              <Row>
                <Col><h2><span style={{fontWeight: 'bold'}}>Words: </span></h2></Col>
                
                {/* <Col>
                <p><h3><span style={{fontWeight: 'bold'}}>{getDescription()}</span></h3></p>
                </Col> */}
               </Row>


               <Row style={{display: 'flex', "flex-wrap": "wrap"}}>

              {answers.map((item, index) => ( 

                // {item1.answer.map((item, ans_index) => (

                    <> 
                        <Col xs={8} >
                        {/* <h3><span style={{fontWeight: 'bold'}}>{index+1}.</span> {" "+item.hint}</h3>    */}
                        <h3 style={{"width":"15em", height: "4rem", "line-height": "4rem" ,"background-color": "gray", "margin": "1rem", "border-radius": "0.5rem"}}> {" "+item}</h3>   

                        </Col>
                        
                        <Col>

                        {/* <svg width="100" height="30" style={{"margin-top": "15px", "margin-left": "20px"}}>
                            <rect width="100" height="30" style={{fill: "rgb(255,255,255)", "margin-top": "10" ,"line-height": 40 , "stroke-width": 3, stroke: "rgb(0,0,0)" }} />
                        </svg> */}
                        {/* <p><h3><span style={{fontWeight: 'bold'}}>Answer:</span> _______________</h3></p> */}
                        </Col>
                    <hr />
                    </>
                
                ))}
                    </Row>

                    <Row>
                    <Col><h2><span style={{fontWeight: 'bold'}}>Category: </span></h2></Col>
                    <Col>
                        {/* <p><h3><span style={{fontWeight: 'bold'}}>{getDescription()}</span></h3></p> */}
                    </Col>
                </Row>

                {categories.map((item, index) => ( 
                    <Row style={{display: 'flex', "flex-wrap": "wrap"}}>
                        <Col xs={8} >
                        {/* <h3><span style={{fontWeight: 'bold'}}>{index+1}.</span> {" "+item.hint}</h3>    */}
                        {/* <h3 style={{"width":"15rem", height: "3rem", "background-color": "gray", "margin": "1rem", "border-radius": "0.5rem"}}> {" "+item}</h3>    */}

                        </Col>
                        
                        <Col xs={8} >
                        {/* <p><h3><span style={{fontWeight: 'bold'}}>Answer:</span> _______________</h3></p> */}
                        <p style={{"width": "30em", "height": "3rem"}}><h3><span style={{fontWeight: 'bold'}}>{index+1}. {item}:</span></h3></p>

                        
                        {/* <svg width="100" height="30" style={{"margin-top": "15px", "margin-left": "20px"}}>
                            <rect width="100" height="30" style={{fill: "rgb(255,255,255)", "margin-top": "10" ,"line-height": 40 , "stroke-width": 3, stroke: "rgb(0,0,0)" }} />
                        </svg> */}
                        </Col>

                        <Col xs={8}>
                        <p style={{"width": "50em", "height": "4rem", "background-color": "gray", "margin": "1rem 0", "border-radius": "0.5rem"}}></p>
                        </Col>

                    </Row>
                    ))}
            </div>
          </div>
        </div>
        <br/><br/><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button className="button-85" onClick={handleApprove}>Approve</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button className="button-85"onClick={handleDecline}>Decline</button>

        </div>
      )
}
 
export default PreviewGroupWords;