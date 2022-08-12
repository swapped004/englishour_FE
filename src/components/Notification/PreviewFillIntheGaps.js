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

const PreviewGroupWords = () => {
    const classes = useStyles()
    const navigate = useNavigate();

    const [formData, setFormData] = useState({whole:""});
    let query = useQuery();
    const token = query.get('token');
    const exercise_id = query.get('exercise_id');
    const notification_id = query.get('notification_id');
    console.log(notification_id);

    React.useEffect(() => {
      const getFormData = async (id) => {
          const response = await axios.get("http://localhost:8248/moderator/exercisePreview?exercise_id="+id+"&token="+token+"&exercise_type=fillinthegaps");
          console.log(response.data);
          setFormData({whole:response.data});
      }
      getFormData(exercise_id);             
    }, []);

    console.log(formData.whole);
    var temp = [];
    let passage = [];
    let clues = [];

    let description = "";
    temp = formData.whole.split("###");
    console.log(temp);
    for(var i = 1; i < temp.length; i++) {
        let items = temp[i].split("##");
        passage.push(items[0]);
        let item_clues = [];
        if(items.length > 1){
            item_clues = items[1].split("#");
        }

        for(let tempclue of item_clues){
            if(tempclue !== ""){
                clues.push(tempclue);
            }
        }        
    }
    description = temp[0];
    const finalPassage = passage[0].replace(/ *\([^)]*\) */g, " __________ ");
    console.log(finalPassage)

    const handleApprove = async (e) => {
      e.preventDefault();
      const response = await axios.post("http://localhost:8248/moderator/approveExercise?notification_id"+notification_id+"&token="+token+"&status=approved");
      console.log(response.data);
      alert("Aproved Successfully");
      if(response.data === "Status Updated") {
        navigate('/profile?token='+token);
      }
    }
    const handleDecline = async (e) => {
      e.preventDefault();
      const response = await axios.post("http://localhost:8248/moderator/approveExercise?notification_id"+notification_id+"&token="+token+"&status=declined");
      console.log(response.data);
      alert("Declined Successfully");
      if(response.data === "Status Updated") {
        navigate('/profile?token='+token);
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
               </Row>


               <Row style={{display: 'flex', "flex-wrap": "wrap"}}>

              {clues.map((item, index) => ( 
                    <> 
                        <Col xs={8} >
                        <h3 style={{"width":"15em", height: "4rem", "line-height": "4rem" ,"background-color": "gray", "margin": "1rem", "border-radius": "0.5rem"}}> {" "+item}</h3>   

                        </Col>
                    <hr />
                    </>
                
                ))}
                </Row>

                <Row>
                    <Col><h2><span style={{fontWeight: 'bold'}}>Category: </span></h2></Col>
                </Row>

                <Row style={{display: 'flex', "flex-wrap": "wrap"}}>
                    
                    <Col xs={8} >
                    <p style={{"width": "110em", "height": "7rem"}}><h4><span style={{fontWeight: 'bold'}}>{finalPassage}</span></h4></p>
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
        <button className="button-85" onClick={handleApprove}>Approve</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button className="button-85"onClick={handleDecline}>Decline</button>

        </div>
      )
}
 
export default PreviewGroupWords;