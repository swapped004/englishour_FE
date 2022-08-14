import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom';
// import TextareaAutosize from '@mui/base/TextareaAutosize';
import TextareaAutosize from 'react-textarea-autosize';
import "./Form.css"
import "./sideByside.css"
import "./button.css";
import "./box_design.css"
import jwt_decode from "jwt-decode";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const FillinTheGaps = () => {
  const navigate = useNavigate();

  let query = useQuery();
  const token = query.get('token');
  const level = query.get('level');
  const tutorial = query.get('tutorial');

  var decode = jwt_decode(token);
  // console.log(decode.moderator_id);
  const id = decode.moderator_id;
  
  const [formData, setFormData] = useState([
    {
      description: '',
      passage: '',
    },
  ])

  const handleinputchange = (e, index) => {
    const { name, value } = e.target;
    const list = [...formData]
    list[index][name] = value;
    setFormData(list)
  }

  const handleDoneclick = async (e) => {
    e.preventDefault()

    var i = 0;
    let situation = "ok";
    if(formData[0].description === ''){
      situation = "notOk";
      alert("Please enter a description")
    }
    for (i = 0; i < formData.length; i++) {
      if (formData[i].passage === "") {
        alert("Please fill up all fields");
        situation = "notOk";
        break;
      }
    }
    if(situation === "ok"){
      navigate('/preview?token='+token+"&level="+level+"&tutorial="+tutorial, { state: { description:formData[0].description, passage: formData[0].passage } });
    }
  }

  return (
    <div className="float-container">
      <div className="float-childDup">
      <Form>
        {/* <Container> */}
        <Row className='mt-2'>
          <Col>
            <Form.Group className="mb-3">
            <Form.Label><h2>Fill in the Gaps</h2></Form.Label>
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
                    <Form.Label><h3>Passage</h3></Form.Label>
                    <br/>
                    <TextareaAutosize
                    aria-label="minimum height"
                    minRows={3}
                    placeholder='Enter the Passage(keep the gap words within a first bracket)'
                    name='passage'
                    onChange={(e) => handleinputchange(e, index)}
                    style={{ width: 1800, boxSizing: 'border-box'}}
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
    </div>
  )
}

export default FillinTheGaps;
