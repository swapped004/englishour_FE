import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import axios from "axios";
import "./moderatorProfileCss.css"
import "./editProfileCss.css"
import 'font-awesome/css/font-awesome.min.css'
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
        <div className={"notification"} style={{ position: "relative" }}>
          {this.state.toggleNotification && (
            <div
              style={{
                position: "absolute",
                width: "450px",
                border: "0.5px solid #8080803d",
                minHeight: "400px",
                overflowY: "auto",
                top: "1px"
              }}
              className={"notificationBar"}
            >
              <div style={{ display: "flex" }}>
                <p style={{ fontSize: "24px", textAlign: "left", width: "93%" }}>
                  No New Notifications!!
                </p>
              </div>
            </div>
          )}
        </div>
    )}
    else{
    return (
      <div className={"notification"} style={{ position: "relative" }}>
        {this.state.toggleNotification && (
          <div
            style={{
              position: "absolute",
              width: "450px",
              border: "0.5px solid #8080803d",
              minHeight: "400px",
              overflowY: "auto",
              top: "1px"
            }}
            className={"notificationBar"}
          >
            <div style={{ display: "flex" }}>
              <p style={{ fontSize: "24px", textAlign: "left", width: "93%" }}>
                Notifications
              </p>
            </div>
            {notification.map((i, k) => {
              return (
                <div>
                  <p
                    style={{
                      fontSize: "10px",
                      margin: "5px 0",
                      textAlign: "left",
                      color: "#747474",
                      display: "initial"
                    }}
                  >
                    <span style={{ display: "inline-block", width: "50%" }}>
                      {this.generateMonth(i.date)}
                    </span>
                    <span
                      style={{
                        display: "inline-block",
                        width: "50%",
                        textAlign: "right"
                      }}
                    >
                    </span>
                  </p>
                  <div
                    style={{ background: "#fff", padding: "5px" }} className={"lineItmes"}>
                      
                      <Link to={"/preview"+this.state.Exercise.split("#")[k]+"?token="+window.location.href.split("?")[1].split("=")[1].split("#")[0]+"&exercise_id="+i.content.split("#")[1]} style={{ fontSize: "18px", fontWeight: 700 }}>Review</Link>
                        <span
                          style={{
                            fontSize: "10px",
                            fontWeight: 700,
                            color: "#747474",
                            float: "right"
                          }}
                        >{i.date.split("T")[1].split(".")[0]}
                        </span>
                        <div style={{ fontSize: "14px" }}>{i.content.split("#")[0]}</div>
                    </div>
                </div>
              );
            })}
            <button style={{ textAlign: "right", margin: 0, color: "#42A5F5" }}>
              MARK ALL AS READ
            </button>
          </div>
        )}
      </div>
    // </div>
// </div>
    );
  }
  }
}

export default Notification;
