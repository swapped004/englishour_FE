import './App.css';
import './styles/global.css';
import NavBar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Exercise from './components/Exercise/exercise';
import SentenceShuffling from './components/SentenceShuffling/sentenceshuffling';
import ReadComplete from './components/ReadComplete/Row_col';
import LandingPage from './components/LandingPage/landingpage';
import Tutorial from './components/Tutorial/tutorial';
import Add_tutorial from './components/Tutorial/Add_tutorial';
import Home from './components/HomePage/homepage';
import ChangeOneLetter from './components/ChangeOneLetter/changeOneLetter';
import GroupWords from './components/GroupWords/groupWords';
import FillinTheGaps from './components/FillinTheGaps/fillinthegaps';
import ModeratorProfile from './components/ModeratorProfile/moderatorProfile'
import AdminProfile from './components/AdminProfile/adminProfile'
import ViewGraph from './components/ViewGraph/allGraphs'


import Consecutive from './components/Exercise/Consecutive';
import ForgotPassword from './components/Login/forgotPassword';
import PreviewChangeOneLetter from './components/Notification/PreviewChangeOneLetter';
import PreviewSentenceShuffle from './components/Notification/PreviewSentenceShuffle';
import PreviewGroupWords from './components/Notification/PreviewGroupWords';
import Preview from './components/FillinTheGaps/preview';
import StatTabs from './components/Statistics/StatTabs';
import PreviewFillGaps from './components/Notification/PreviewFillIntheGaps';
import PreviewReadComplete from './components/Notification/PreviewReadComplete';
import ContentTree from './components/Exercise/ContentTree';

import TreeChangeOneLetter from './components/TreeView/TreeChangeOneLetter';
import TreeSentenceShuffle from './components/TreeView/TreeSentenceShuffle';
import TreeGroupWords from './components/TreeView/TreeGroupWords';
import TreeFillGaps from './components/TreeView/TreeFillIntheGaps';
import TreeReadComplete from './components/TreeView/TreeReadComplete';

import AddCategory from './components/AdminProfile/addCategory'





import React from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

let globalIsAdmin = false;


function App() {

  let query = useQuery();
  const token = query.get('token');

  const [user, setUser] = useState({token:"", logged_in: false, isAdmin: false});
  const [error, setError] = useState("");
  const [open, setOpen] = React.useState(false);
  const [isClicked, setIsClicked] = React.useState(0);
  


  let tkn = "0";

  const Login_func = async (details) => {

    if(details.username === "" || details.password === ""){
      setError("Please fill all the fields");
      alert("Please fill all the fields");
      return "failure";
    }
    else{
      await axios.post("http://localhost:8248/moderator/login", {
        mobile: details.username.slice(-10),
        password: details.password
      })
      .then(function (response) {
        tkn = response.data;
        console.log(tkn);
        setError("");
        setOpen(true);
    })
    .catch((err) => {
      alert("Invalid Credentials");
  });
  if(tkn !== "0"){

    var decode = jwt_decode(tkn);
    // console.log("calling get notifications ", tkn);
    // getNotification(decode.moderator_id);
    const response = await fetch("http://localhost:8248/moderator/profileInfo/moderator_id?moderator_id="+decode.moderator_id+"&token="+tkn);
    const data = await response.json();
    // setInfo(data);
    globalIsAdmin = data.isAdmin;

    setUser({token: tkn, logged_in: true, isAdmin: data.isAdmin});
  }
  // console.log(notification);
  return tkn;
  }
}

  const Register = (details) => {
    console.log(details);
  }


  const Logout = () => {   
    // window.location.reload(true);
    setUser({token:"", logged_in: false, isAdmin: false});
    setOpen(false);
    setIsClicked(0);
    console.log("Logout");
    
  }

  //everytime page reloads, check if user is logged in
  useEffect(() => {
    //check jwt token
    if(token !== null){
      const decoded = jwt_decode(token);
      // console.log(decoded);
      const moderator_id = decoded.moderator_id;

      //if cant decode token, user is not logged in
      if(moderator_id === undefined){
        setUser({token:"", logged_in: false, isAdmin: false});
      }
      else
        setUser({token: token, logged_in: true, isAdmin: globalIsAdmin});
    }
  }, [token]);

  return (
    <div>
        <NavBar logged_in={user.logged_in} Logout_func={Logout} token={user.token} isAdmin={user.isAdmin} setOpen={setOpen} open={open} setIsClicked={setIsClicked} isClicked={isClicked}/>
        <Routes>
          <Route path="/" element={< LandingPage />} />
          <Route path="/homepage" element={< Home />} />
          <Route path="/login" element={< Login Login_func={Login_func} error={error}/>} />
          <Route path="/register" element={< Register />} />
          <Route path="/help" element={< Register />} />
          <Route path="/about" element={< Register />} />
          <Route path="/exercise" element={< ContentTree />} />
          <Route path="/consecutive" element={< Consecutive />} />
          <Route path="/tutorial" element={< Tutorial />} />
          <Route path="/add_tutorial" element={< Add_tutorial />} />
          <Route exact path="/sentenceshuffling" element={< SentenceShuffling />} />
          <Route exact path="/tablecompletion" element={< ReadComplete />} />
          <Route exact path="/changeletter" element={< ChangeOneLetter />} />
          <Route exact path="/categorizewords" element={< GroupWords />} />
          <Route exact path="/fillgaps" element={< FillinTheGaps />} />
          <Route exact path="/profile" element={< ModeratorProfile />} />
          <Route exact path="/adminprofile" element={< AdminProfile />} />
          <Route exact path="/viewgraph" element={< ViewGraph />} />

          <Route exact path="/addcategory" element={< AddCategory />} />



          <Route exact path="/forgotPassword" element={< ForgotPassword />} />
          <Route exact path="/previewchangeletter" element={< PreviewChangeOneLetter setOpen={setOpen} setIsClicked={setIsClicked}/>} />
          <Route exact path="/previewsentenceshuffling" element={< PreviewSentenceShuffle setOpen={setOpen} setIsClicked={setIsClicked}/>} />
          <Route exact path="/previewcategorizewords" element={< PreviewGroupWords setOpen={setOpen} setIsClicked={setIsClicked}/>} />
          <Route exact path="/previewfillgaps" element={< PreviewFillGaps setOpen={setOpen} />} setIsClicked={setIsClicked}/>
          <Route exact path="/previewreadcomplete" element={< PreviewReadComplete setOpen={setOpen} setIsClicked={setIsClicked}/>} />
          <Route exact path="/preview" element={< Preview />} />
          <Route exact path="/stats" element={< StatTabs />} />

          <Route exact path="/treechangeletter" element={< TreeChangeOneLetter />} />
          <Route exact path="/treesentenceshuffling" element={< TreeSentenceShuffle />} />
          <Route exact path="/treecategorizewords" element={< TreeGroupWords />} />
          <Route exact path="/treefillgaps" element={< TreeFillGaps />} />
          <Route exact path="/treereadcomplete" element={< TreeReadComplete />} />
        </Routes>
    </div>
  );
}

export default App;
