import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'

const useStyles = () => ({})
function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const TreeSentenceShuffle = () => {
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
          const response = await axios.get("http://localhost:8248/moderator/exercisePreview?exercise_id="+id+"&token="+token+"&exercise_type=sentenceshuffling");
          console.log(response.data);
          setFormData({whole:response.data});
      }
      getFormData(exercise_id);             
    }, []);

    var temp = [];
    var infos = [];
    let description = "";
    temp = formData.whole.split("#");
    for(var i = 1; i < temp.length-1; i++) {
      if(temp[i] !== "") {
        infos.push(temp[i]);
      }
    }
    description = temp[0];

    return (
      <div>
        <div className="float-container">
          <div className={classes.Totalss}>
        <div className="float-child">
          <Row>
            <Col><h2><span style={{fontWeight: 'bold'}}>Preview</span></h2></Col>
            <Col>
              <p><h3><span style={{fontWeight: 'bold'}}>{description}</span></h3></p>
            </Col>
          </Row>
          {infos.map((item, index) => (
            <>
              <Row>
                <Col xs={8}><h3><span style={{fontWeight: 'bold'}}>{index+1}.</span> {" "+item}</h3></Col>
                <br />
                <Col>
                  <p><h3><span style={{fontWeight: 'bold'}}>Answer:</span> _______________</h3></p>
                </Col>
              </Row>
              <hr />
            </>
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
    {/* <button className="button-85" onClick={handleApprove}>Approve</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <button className="button-85" onClick={handleDecline}>Decline</button> */}
  </div>
  );
}
 
export default TreeSentenceShuffle;