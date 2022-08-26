import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import axios from "axios";
import "./moderatorProfileCss.css"
import "./editProfileCss.css"
import 'font-awesome/css/font-awesome.min.css'
import './moderatorTimelineCss.css'
/** Notification released*/
class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleNotification: true,
      notification: [],
      Exercise:""
    };
  }
  componentDidMount() {
    console.log("Mount: ", this.props.notification);
    this.setState({ notification: this.props.notification});
    this.handleExerciseInfo();
  }
  componentDidUpdate(previousProps) {
    if (previousProps.notification !== this.props.notification) {
      this.setState({ notification: this.props.notification });
    }
  }
  toggleNotification = () => {
    const { toggleNotification } = this.state;
    this.setState({ toggleNotification: !toggleNotification });
  };
  clearAllMessage = () => {
    this.props.onClearAll && this.props.onClearAll();
  };

  generateMonth = (TotalTimeStamp) => {
    const m = parseInt(TotalTimeStamp.split("T")[0].split("-")[1]);
    const d = TotalTimeStamp.split("T")[0].split("-")[2]
    const year = TotalTimeStamp.split("T")[0].split("-")[0]
    const monthNames = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC"
    ];
    return d+" "+monthNames[m-1]+" "+year;
  }

  handleExerciseInfo = async () => {
    console.log(this.props.notification.length);
    var exId="";
    for(let i=0;i<this.props.notification.length;i++){
      exId += this.props.notification[i].content.split("#")[1]+"x";
    }
    console.log(exId);
    const data = await axios.get(
      "http://localhost:8248/moderator/exerciseDetails?token="+window.location.href.split("?")[1].split("=")[1].split("#")[0]+"&exercise_id="+exId
    );
    console.log(data.data);
    this.setState({Exercise:data.data});
  }

  render() {
    const { notification } = this.state;
    console.log(this.state.Exercise);
    if (notification.length === 0) {
        return (
            <React.Fragment>
                <div class="timeline">
                        <ul>
                            <li>
                             <div class="content">
                             <p>
                                No New Content to Review!!
                             </p>
                             </div>
                         </li>
                        </ul>
                    </div>    
        
                </React.Fragment>
              );
            }
    else{
    return (
        
        <React.Fragment>
            <div class="timeline">
                    <ul>
                    {notification.map((item, index) => (
                         <li>
                         <span>{this.generateMonth(item.date)}</span>
                         <div class="content">
                         <p>
                         <Link to={"/preview"+this.state.Exercise.split("#")[index]+"?token="+window.location.href.split("?")[1].split("=")[1].split("#")[0]+"&exercise_id="+item.content.split("#")[1]+"&notification_id="+item.notification_id} style={{ fontSize: "18px", fontWeight: 700 }}>{item.content.split("#")[0]}</Link>
                         </p>
                         <span style={{fontSize: "15px",fontWeight: 700,color: "#747474",float: "right"}}>
                            {item.date.split("T")[1].split(".")[0]}
                        </span>
                         </div>
                     </li>
                    ))}
                    </ul>
                </div>    
    
            </React.Fragment>
          );
    }
  }
}

export default Notification;
