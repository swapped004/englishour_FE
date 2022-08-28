import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom';
import "./sideByside.css"
import "./button.css";
import axios from 'axios'

const useStyles = () => ({})
function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const TreeFillinTheGaps = () => {
    const classes = useStyles()
    const navigate = useNavigate();

    const [formData, setFormData] = useState({passage:""});
    const [DescData, setDescData] = useState({description:""});
    const [answers, setAnswers] = useState([]);
    let query = useQuery();
    const token = query.get('token');
    const exercise_id = query.get('exercise_id');
    const notification_id = query.get('notification_id');
    // console.log(token, exercise_id, notification_id);

    React.useEffect(() => {
      const getPassageData = async (id) => {
          const response = await axios.get("http://localhost:8248/moderator/exercisePreview?exercise_id="+id+"&token="+token+"&exercise_type=fillgaps");
          console.log(response.data);
          setFormData({passage:response.data});
      }
      const getDescriptionData = async (id) => {
        const response = await axios.get("http://localhost:8248/moderator/exercisePreview?exercise_id="+id+"&token="+token+"&exercise_type=fillgapsdescription");
        console.log(response.data);
        setDescData({description:response.data});
      }
      const getAnswerData = async (id) => {
        const response = await axios.get("http://localhost:8248/moderator/exercisePreview?exercise_id="+id+"&token="+token+"&exercise_type=fillgapsanswers");
        console.log(response.data);
        setAnswers(response.data);
      }
      getPassageData(exercise_id);
      getDescriptionData(exercise_id);  
      getAnswerData(exercise_id);           
    }, []);

    console.log(formData.passage);
    console.log(DescData.description);
    console.log(answers);

    return (
      <div>
        <div className="float-container">
          <div className={classes.Totalss}>
            <div className="float-child" style={{"padding": "0 10rem"}}>
              <Row>
                <Col><h2><span style={{fontWeight: 'bold'}}>Preview</span></h2></Col>
                <Col>
                  <p><h3><span style={{fontWeight: 'bold'}}>{DescData.description}</span></h3></p>
                </Col>
              </Row>
              <Row>
                <Col><h2><span style={{fontWeight: 'bold'}}>Words: </span></h2></Col>
               </Row>


               <Row style={{display: 'flex', "flex-wrap": "wrap"}}>

              {answers.map((item, index) => ( 
                    <> 
                        <Col xs={8} >
                        <h3 style={{"width":"15em", height: "4rem", "line-height": "4rem" ,"background-color": "gray", "margin": "1rem", "border-radius": "0.5rem"}}> {" "+item}</h3>   

                        </Col>
                    <hr />
                    </>
                
                ))}
                </Row>

                <Row>
                    <Col><h2><span style={{fontWeight: 'bold'}}>Passage: </span></h2></Col>
                </Row>

                <Row style={{display: 'flex', "flex-wrap": "wrap"}}>
                    
                    <Col xs={8} >
                    <p style={{"width": "110em", "height": "7rem"}}><h4><span style={{fontWeight: 'bold'}}>{formData.passage}</span></h4></p>
                    </Col>

                </Row>
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
        {/* <button className="button-85" onClick={handleApprove}>Approve</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button className="button-85"onClick={handleDecline}>Decline</button> */}

        </div>
      )
}
 
export default TreeFillinTheGaps;