import React, { useState } from 'react';
import './moderatorTimelineCss.css'





// const ModeratorTimeline = ({Exinfo}) => {

const ModeratorTimeline = () => {

    let Exinfo = [{
        updatedAt: '',
        topic_name: '',
        exercise_type: "",
        level: "",
        approval_status: "",
    },]

    const [formData, setFormData] = useState([
        {
            updatedAt: '',
            topic_name: '',
            exercise_type: "",
            level: "",
            approval_status: "",
        },
      ]);

    React.useEffect(() => {
        setFormData(Exinfo);             
    }, []);

    console.log(formData);

    return (
        
        <React.Fragment>


<div class="timeline">
                <ul>
                {formData.map((item, index) => (
                     <li>
                     <span>{item.updatedAt.split("T")[0]}</span>
                     <div class="content">
                     <h3>Content Status: {item.approval_status}</h3>
                     <p>
                         You uploaded an Exercise Of Type: {item.exercise_type} At Level: {item.level}
                     </p>
                     </div>
                 </li>
                ))}
                </ul>
            </div>    

        </React.Fragment>



     );
}
 
export default ModeratorTimeline;