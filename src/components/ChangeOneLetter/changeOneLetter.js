import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import "./Form.css"
import "./sideByside.css"
import "./button.css";
import "./box_design.css"
import axios from "axios";
import jwt_decode from "jwt-decode";

import { useNavigate, useLocation } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const useStyles = () => ({})

const ChangeOneLetter = () => {
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
      hint: '',
      answer: '',
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
        hint: '',
        answer: '',
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
      if (formData[i].hint === "" || formData[i].answer === "") {
        alert("Please fill up all fields");
        situation = "notOk";
        break;
      }
    }
    if(situation === "ok"){
      let hints = "";
      let answers = "";
      for(i = 0; i < formData.length; i++){
        hints += formData[i].hint + "#";
        answers += formData[i].answer + "#";
      }
      await axios
          .post("http://localhost:8248/moderator/insert?token="+token, {
            type: "changeletter",
            // level: query.get("level"),
            // topic: query.get("topic"),
            level: query.get("level"),
            topic: query.get("topic"),
            hints: hints,
            answers: answers,
            description: formData[0].description,
            moderator_id: id,
          })
          .then(function (response) {
            //console.log(response);
            alert("Exercise pending for review");
          });
          navigate('/exercise')
    }
  }

  // const handlecompute = () => {
  //   const total = formData.reduce((acc, curr) => {
  //     return acc + Number(curr.cost) * Number(curr.quantity)
  //   }, 0)
  //   return total
  // }

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
            <Form.Label><h2>Change One Letter to Make New Word</h2></Form.Label>
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
                    <Form.Label>Enter Hint</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter Hint'
                      style={{width: "80%", margin: "auto"}}
                      name='hint'
                      onChange={(e) => handleinputchange(e, index)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Enter Answer</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter Answer'
                      style={{width: "80%", margin: "auto"}}
                      name='answer'
                      onChange={(e) => handleinputchange(e, index)}
                    />
                  </Form.Group>
                </Col>
                
              </Row>

              <Col>
                  <div>
                    <span>
                      {/* {' '}
                      ++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
                      <div id='dropdown-basic'>
                        {formData.length - 1 === index && formData.length > 1 && (
                          <button
                            type='button'
                            className="button-54v2"
                            onClick={(e) => handleremove(index)}
                          >
                            Delete
                          </button>
                        )}
                      {/* </div> */}
                    {/* </span> */}
                  {/* </div> */}
                  {formData.length - 1 === index && (
                    <button
                      className="button-54v2"
                      onClick={handleaddclick}
                    >
                      Add
                    </button>
                  )}
                  {formData.length - 1 === index && (
                    <button
                      className="button-54v2"
                      onClick={handleDoneclick}
                    >
                      Done
                    </button>
                  )}
                  </div>
                  </span>
                  </div>
                </Col>
            {/* </Container> */}
          </>
        ))}
      </Form>
      </div>
      {/* <hr /> */}
      <div className={classes.Totalss}>
        <div className="float-child">
          <Row>
            <Col><h2><span style={{fontWeight: 'bold'}}>Preview</span></h2></Col>
            <Col>
              <p><h3><span style={{fontWeight: 'bold'}}>{getDescription()}</span></h3></p>
            </Col>
          </Row>
          {formData.map((item, index) => (
            <>

            {/* <div style={'display'= 'flex'}>
              <p><h3><span style={{fontWeight: 'bold'}}>Answer:</span> _______________</h3></p>
              <input type="text" id="fname" name="fname">
            </div> */}
              <Row style={{display: 'flex'}}>
                <Col xs={8} >
                  <h3><span style={{fontWeight: 'bold'}}>{index+1}.</span> {" "+item.hint}</h3>   
                  
                </Col>
                
                <Col>

                  <svg width="100" height="30" style={{"margin-top": "15px", "margin-left": "20px"}}>
                    <rect width="100" height="30" style={{fill: "rgb(255,255,255)", "margin-top": "10" ,"line-height": 40 , "stroke-width": 3, stroke: "rgb(0,0,0)" }} />
                  </svg>
                  {/* <p><h3><span style={{fontWeight: 'bold'}}>Answer:</span> _______________</h3></p> */}
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

export default ChangeOneLetter;

/* {item.tax === 21 ? (
                  <p> {formData.reduce((acc, curr) => acc + curr.tax, 0)}%</p>
                ) : (
                  <p>{formData.reduce((acc, curr) => acc + curr.tax, 0)}%</p>
                )} */
