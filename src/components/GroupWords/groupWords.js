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

const GroupWords = () => {
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
      answer: [''],
    },
  ])

  const handleinputchange = (e, index) => {
    const { name, value } = e.target
    const list = [...formData]
    list[index][name] = value
    setFormData(list)
  }
  
  const handlewordinputchange = (e, index, ans_index) => {
    const {name, value} = e.target;
    const ans_list = [...formData];
    ans_list[index][name][ans_index] = value;
    setFormData(ans_list);
  }

  const handleremove = (index) => {
    console.log(index)
    const list = [...formData]
    list.splice(index, 1)
    setFormData(list)
  }

  const handlewordremove = (index, ans_index) => {
    console.log("word index: ", ans_index);

    const list = [...formData];
    list[index].answer.splice(ans_index, 1);
    setFormData(list);
  }

  const handleaddclick = (e) => {
    e.preventDefault()
    setFormData([
      ...formData,
      {
        description: '',
        hint: '',
        answer: [''],
      },
    ])
  }

  const handlewordaddclick = (e, index) => {
    e.preventDefault();

    // const {name, value} = e.target;
    const ans_list = [...formData];
    ans_list[index].answer = [...ans_list[index].answer, ''];
    setFormData(ans_list);

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
      if (formData[i].hint === "" || formData[i].answer[0] === "") {
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
        
        let ans_len = formData[i].answer.length;
        for(let j = 0; j < ans_len - 1; j++){
          answers += formData[i].answer[j] + "#";
        }
        answers += formData[i].answer[ans_len - 1] + "###";
      }
      await axios
          .post("http://localhost:8248/moderator/insert?token="+token, {
            type: "categorizewords",
            level: query.get("level"),
            tutorial_id: query.get("tutorial"),
            hints: hints,
            answers: answers,
            description: formData[0].description,
            moderator_id: id,
            content:"A new exercise of 'Categorize words' has been added",
          })
          .then(function (response) {
            //console.log(response);
            var txt="";
            if (window.confirm("Exercise Pending for review!Add more?")) {
              txt = "Yes";
            } else {
              txt = "No";
            }
            if(txt === "Yes"){
              navigate("/consecutive?token="+token+"&tutorial="+query.get("tutorial")+"&level="+query.get("level"));
            }
            else{
              navigate('/tutorial?token='+token);
            }
          });
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
            <Form.Label><h2>Categorize words</h2></Form.Label>
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
                    <Form.Label>Enter Category</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter Category'
                      style={{width: "80%", margin: "auto"}}
                      name='hint'
                      onChange={(e) => handleinputchange(e, index)}
                    />
                  </Form.Group>
                </Col>
               

                {formData[index].answer.map((item, ans_index) => (
                  <React.Fragment>

                  <Col>
                  <Form.Group>
                    <Form.Label>Enter Word: {ans_index + 1}</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter Word'
                      style={{width: "80%", margin: "auto"}}
                      name='answer'
                      onChange={(e) => handlewordinputchange(e, index, ans_index)}
                    />
                  </Form.Group>  
                </Col>

                <Col>
                <br/>
                {formData[index].answer.length - 1 === ans_index && (
                <button
                      className="button-85"
                      onClick={(e) => handlewordaddclick(e, index)}
                      // onClick={handlewordaddclick}
                    >
                      Add More Word
                    </button>
                  )}

                  {formData[index].answer.length - 1 === ans_index && formData[index].answer.length > 1 && (
                          <button
                            type='button'
                            className="button-85"
                            onClick={(e) => handlewordremove(index, ans_index)}
                          >
                            Delete Word
                          </button>
                        )}
                 </Col>
                 </React.Fragment>
                ))}
               {/* </Col> */}
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
                            className="button-85"
                            onClick={(e) => handleremove(index)}
                          >
                            Delete Category
                          </button>
                        )}
                      {/* </div> */}
                    {/* </span> */}
                  {/* </div> */}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {formData.length - 1 === index && (
                    <button
                      className="button-85"
                      onClick={handleaddclick}
                    >
                      Add Category
                    </button>
                  )}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
            {/* </Container> */}
          </>
        ))}
      </Form>
      </div>
      {/* <hr /> */}
      <div className={classes.Totalss}>
        <div className="float-child" style={{"width": "50%"}}>
          <Row>
            <Col><h2><span style={{fontWeight: 'bold'}}>Words: </span></h2></Col>
            
            <Col>
              <p><h3><span style={{fontWeight: 'bold'}}>{getDescription()}</span></h3></p>
            </Col>
          </Row>
          
          {formData.map((item1, index) => ( 
              <Row style={{display: 'flex', "flex-wrap": "wrap"}}>

          {item1.answer.map((item, ans_index) => (

            <>

            {/* <div style={'display'= 'flex'}>
              <p><h3><span style={{fontWeight: 'bold'}}>Answer:</span> _______________</h3></p>
              <input type="text" id="fname" name="fname">
            </div> */}
                <Col xs={8} >
                  {/* <h3><span style={{fontWeight: 'bold'}}>{index+1}.</span> {" "+item.hint}</h3>    */}
                  <h3 style={{"width":"15rem", height: "3rem", "background-color": "gray", "margin": "1rem", "border-radius": "0.5rem"}}> {" "+item}</h3>   

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
          
          ))}

            <Row>
              <Col><h2><span style={{fontWeight: 'bold'}}>Category: </span></h2></Col>
              <Col>
                {/* <p><h3><span style={{fontWeight: 'bold'}}>{getDescription()}</span></h3></p> */}
              </Col>
          </Row>

          {formData.map((item, index) => ( 
              <Row style={{display: 'flex', "flex-wrap": "wrap"}}>
                  <Col xs={8} >
                  {/* <h3><span style={{fontWeight: 'bold'}}>{index+1}.</span> {" "+item.hint}</h3>    */}
                  {/* <h3 style={{"width":"15rem", height: "3rem", "background-color": "gray", "margin": "1rem", "border-radius": "0.5rem"}}> {" "+item}</h3>    */}

                </Col>
                
                <Col xs={8} >
                {/* <p><h3><span style={{fontWeight: 'bold'}}>Answer:</span> _______________</h3></p> */}
                <p style={{"width": "20rem", "height": "3rem"}}><h3><span style={{fontWeight: 'bold'}}>{index+1}. {item.hint}:</span></h3></p>

                
                  {/* <svg width="100" height="30" style={{"margin-top": "15px", "margin-left": "20px"}}>
                    <rect width="100" height="30" style={{fill: "rgb(255,255,255)", "margin-top": "10" ,"line-height": 40 , "stroke-width": 3, stroke: "rgb(0,0,0)" }} />
                  </svg> */}
                </Col>

                <Col xs={8}>
                  <p style={{"width": "30rem", "height": "4rem", "background-color": "gray", "margin": "1rem 0", "border-radius": "0.5rem"}}></p>
                </Col>

              </Row>
            ))}

        </div>
      </div>
    </div>
  )
}

export default GroupWords;

/* {item.tax === 21 ? (
                  <p> {formData.reduce((acc, curr) => acc + curr.tax, 0)}%</p>
                ) : (
                  <p>{formData.reduce((acc, curr) => acc + curr.tax, 0)}%</p>
                )} */
