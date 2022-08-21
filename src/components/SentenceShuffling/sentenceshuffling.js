import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom';
import "./Form.css"
import "./sideByside.css"
import "./button.css";
import "./box_design.css"
import axios from "axios";
import jwt_decode from "jwt-decode";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const useStyles = () => ({})

const SentenceShuffling = () => {
  const classes = useStyles()
  const navigate = useNavigate();

  let query = useQuery();
  const token = query.get('token');

  var decode = jwt_decode(token);
  console.log(decode.moderator_id);
  const id = decode.moderator_id;
  
  const [formData, setFormData] = useState([
    {
      description: '',
      correct: '',
    },
  ])

  const handleinputchange = (e, index) => {
    const { name, value } = e.target
    const list = [...formData]
    list[index][name] = value
    setFormData(list)
  }

  const handleremove = (index) => {
    console.log(index)
    const list = [...formData]
    list.splice(index, 1)
    setFormData(list)
  }

  const handleaddclick = (e) => {
    e.preventDefault()
    setFormData([
      ...formData,
      {
        description: '',
        correct: '',
      },
    ])
  }

  const handleDoneclick = async (e) => {
    e.preventDefault()
    // alert("Exercise saved")

    var i = 0;
    //console.log(formData[0].description)
    let situation = "ok";
    if(formData[0].description === ''){
      situation = "notOk";
      alert("Please enter a description")
    }
    for (i = 0; i < formData.length; i++) {
      //console.log(formData[i].correct);
      //console.log(formData[i].shuffled);
      if (formData[i].correct === "") {
        alert("Please fill up all fields");
        situation = "notOk";
        break;
      }
    }
    if(situation === "ok"){
      let CorrectSentences = "";
      for(i = 0; i < formData.length; i++){
        CorrectSentences = CorrectSentences + formData[i].correct + "#";
      }

      var currentdate = new Date(); 
      var datetime = currentdate.getFullYear() + "-"
              + (currentdate.getMonth()+1)  + "-" 
              + currentdate.getDate() + "T"  
              + currentdate.getHours() + ":"  
              + currentdate.getMinutes() + ":" 
              + currentdate.getSeconds()+".";

      await axios
          .post("http://localhost:8248/moderator/insert?token="+token, {
            type: "sentenceshuffling",
            level: query.get("level"),
            tutorial_id: query.get("tutorial"),
            correct:CorrectSentences,
            description: formData[0].description,
            moderator_id: id,
            content:"A new exercise of 'Sentence Shuffling' has been added",
            date: datetime,
          })
          .then(function (response) {
            var txt="";
            if (window.confirm("Exercise Pending for review! Add more?")) {
              txt = "Yes";
            } else {
              txt = "No";
            }
            if(txt === "Yes"){
              navigate("/consecutive?token="+token+"&tutorial="+query.get("tutorial")+"&level="+query.get("level"))
            }
            else{
              navigate('/tutorial?token='+token);
            }
          });
    }
  }

  const getDescription = () => {
    const description = formData.reduce((acc, curr) => {
      return acc + curr.description + '\n'
    }, '')
    return description
  }

  return (
    <div className="float-container">
      <div className="float-child2">
      <Form>
        {/* <Container> */}
        <Row className='mt-2'>
          <Col>
            <Form.Group className="mb-3">
            <Form.Label><h2>Sentence Shuffling</h2></Form.Label>
            <Form.Control 
              size="lg"
              type='text'
              placeholder='Enter Short Description'
              name='description'
              onChange={(e) => handleinputchange(e, 0)}
            />
            </Form.Group>
          </Col>
        </Row>
        {/* </Container> */}
        {formData.map((item, index) => (
          <>
            {/* <Container> */}
              <Row className='rowHeader'>
                <Col>
                    <h3>Question No: {index+1}</h3> 
                </Col>
              </Row>
              <Row className='mt-2 rowContainer' key={index}>
                <Col>
                  <Form.Group>
                    <Form.Label>Correct Sentence</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter Correct Sentence'
                      style={{width: "80%", margin: "auto"}}
                      name='correct'
                      onChange={(e) => handleinputchange(e, index)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <div>
                    <span>
                      <br/>
                      {/* {' '} */}
                      {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
                      <div id='dropdown-basic'>
                        {formData.length - 1 === index && formData.length > 1 && (
                          <button
                            type='button'
                            className="button-85"
                            onClick={(e) => handleremove(index)}
                          >
                            Delete
                          </button>
                        )}&nbsp;&nbsp;&nbsp;
                      {formData.length - 1 === index && (
                        <button
                          className="button-85"
                          onClick={handleaddclick}
                        >
                        Add
                        </button>
                      )}&nbsp;&nbsp;&nbsp;
                      {formData.length - 1 === index && (
                        <button
                          className="button-85"
                          onClick={handleDoneclick}
                        >
                          Done
                        </button>
                      )}
                      </div>
                    </span>
                  </div>
                </Col>
              </Row>
            {/* </Container> */}
          </>
        ))}
      </Form>
      </div>
      {/* <hr /> */}
      <div className={classes.Totalss}>
        <div className="float-child3">
          <Row>
            <Col><h2><span style={{fontWeight: 'bold'}}>Preview</span></h2></Col>
            <Col>
              <p><h3><span style={{fontWeight: 'bold'}}>{getDescription()}</span></h3></p>
            </Col>
          </Row>
          {formData.map((item, index) => (
            <>
              <Row>
                <Col xs={8}><h3><span style={{fontWeight: 'bold'}}>{index+1}.</span> {" "+item.correct}</h3></Col>
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
  )
}

export default SentenceShuffling;

/* {item.tax === 21 ? (
                  <p> {formData.reduce((acc, curr) => acc + curr.tax, 0)}%</p>
                ) : (
                  <p>{formData.reduce((acc, curr) => acc + curr.tax, 0)}%</p>
                )} */
