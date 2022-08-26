import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./homepage.css";

function Home({ history }) {
//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   useEffect(() => {
//     if (userInfo) {
//       history.push("/mynotes");
//     }
//   }, [history, userInfo]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">WELCOME TO ENGLISHOUR</h1>
              <p className="subtitle">Learn English in a Fun Way</p>
            </div>
            <div className="buttonContainer">
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
