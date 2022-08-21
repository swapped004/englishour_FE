import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom';
// import TextareaAutosize from '@mui/base/TextareaAutosize';
import TextareaAutosize from 'react-textarea-autosize';
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
// let isGap = 0;

const Preview = () => {
  const classes = useStyles()
  const navigate = useNavigate();
  const { state } = useLocation();
  const { description, passage } = state;
  let answers = []
  const txt = passage;
  const regExp = /\(([^)]+)\)/g;
  const matches = [...txt.match(regExp)];
  console.log(matches);
  for(let i = 0; i < matches.length; i++){
    answers.push(matches[i].replace(/[()]/g, ''));
  }
  console.log(answers);

  const finalPassage = passage.replace(/ *\([^)]*\) */g, " __________ ");
  console.log(finalPassage)

  let query = useQuery();
  const token = query.get('token');

  var decode = jwt_decode(token);
  const id = decode.moderator_id;

  const handleDoneclick = async (e) => {
    e.preventDefault()

      await axios
          .post("http://localhost:8248/moderator/insert?token="+token, {
            type: "fillgaps",
            level: query.get("level"),
            tutorial_id: query.get("tutorial"),
            passage:passage,
            description:description,
            moderator_id: id,
            content:"A new exercise of 'Fill in the Gaps' has been added",
          })
          .then(function (response) {
            var txt="";
            if (window.confirm("Exercise Pending for review! Add more?")) {
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

  const handleDeclineclick = async (e) => {
    e.preventDefault();
    navigate(-1);

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
                <Col><h2><span style={{fontWeight: 'bold'}}>Clues: </span></h2></Col>
               </Row>


               <Row style={{display: 'flex', "flex-wrap": "wrap"}}>

              {answers.map((item, index) => ( 
                    <> 
                        <Col xs={8} >
                        <h3 style={{"width":"10em", height: "4rem", "line-height": "4rem" ,"background-color": "gray", "margin": "1rem", "border-radius": "0.5rem"}}> {" "+item}</h3>   
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
        <button className="button-85" onClick={handleDoneclick}>Done</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button className="button-85" onClick={handleDeclineclick}>Decline</button>

        </div>
  )
}

export default Preview;
