import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import "./Form.css"
import "./sideByside.css"
import "./button.css";
// import { useNavigate, useLocation } from "react-router-dom";

// function useQuery() {
//   const { search } = useLocation();

//   return React.useMemo(() => new URLSearchParams(search), [search]);
// }

const useStyles = () => ({})

const SentenceShuffling = () => {
  const classes = useStyles()

//   let query = useQuery();
//   const navigate = useNavigate();
  // console.log(query.get("level"));
  
  const [formData, setFormData] = useState([
    {
      description: '',
      correct: '',
      shuffled: '',
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
        shuffled: '',
      },
    ])
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
              <Row className='mt-2' key={index}>
                <Col>
                  <Form.Group>
                    <Form.Label>Correct Sentence</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter Correct Sentence'
                      name='correct'
                      onChange={(e) => handleinputchange(e, index)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Shuffled Sentence</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter Shuffled Sentence'
                      name='shuffled'
                      onChange={(e) => handleinputchange(e, index)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <div>
                    <span>
                      {' '}
                      ++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
                      </div>
                    </span>
                  </div>
                {/* </Col> */}
              {/* </Row> */}
              {/* <Row className='mt-2'> */}
                {/* <Col> */}
                  {formData.length - 1 === index && (
                    <button
                      className="button-54v2"
                      onClick={handleaddclick}
                    >
                      Add
                    </button>
                  )}
                </Col>
              </Row>
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
              <Row>
                <Col xs={8}><h3><span style={{fontWeight: 'bold'}}>{index+1}.</span> {" "+item.shuffled}</h3></Col>
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
