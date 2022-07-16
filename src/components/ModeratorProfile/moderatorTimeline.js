import React from 'react';
import './moderatorTimelineCss.css'




const ModeratorTimeline = () => {
    const id="1";
    const [Exinfo, setExInfo] = React.useState({exercise_type:"",updatedAt:"",level:"",approval_status:"",topic_name:""});

    React.useEffect(() => {
        const getExInfo = async (id) => {
            const response = await fetch("http://localhost:8248/moderator/exerciseInfo/moderator_id?moderator_id="+id);
            const data = await response.json();
            //console.log(data);
            setExInfo(data);
        }
        getExInfo(id);            
    }, []);

    console.log(Exinfo[0]);

    return (
        
        <React.Fragment>

            <div class="timeline">
                <ul>

                <li>
                    <span>{Exinfo[0].updatedAt}</span>
                    <div class="content">
                        <h3>Content Status: {Exinfo[0].approval_status}</h3>
                        <p>
                            You uploaded an Exercise Of Type: {Exinfo[0].exercise_type} At Level: {Exinfo[0].level} Under Topic: {Exinfo[0].topic_name}
                        </p>
                    </div>
                </li>
                <li>
                    <span>{Exinfo[1].updatedAt}</span>
                    <div class="content">
                        <h3>Content Status: {Exinfo[1].approval_status}</h3>
                        <p>
                            You uploaded an Exercise Of Type:   {Exinfo[1].exercise_type} At Level:   {Exinfo[1].level} Under Topic: {Exinfo[1].topic_name}
                        </p>
                    </div>
                </li>
                <li>
                    <span>{Exinfo[2].updatedAt}</span>
                    <div class="content">
                        <h3>Content Status: {Exinfo[2].approval_status}</h3>
                        <p>
                            You uploaded an Exercise Of Type:   {Exinfo[2].exercise_type} At Level:   {Exinfo[2].level}  Under Topic: {Exinfo[2].topic_name}
                        </p>
                    </div>
                </li>
                <li>
                    <span>{Exinfo[3].updatedAt}</span>
                    <div class="content">
                        <h3>Content Status: {Exinfo[3].approval_status}</h3>
                        <p>
                            You uploaded an Exercise Of Type:   {Exinfo[3].exercise_type} At Level:   {Exinfo[3].level} Under Topic: {Exinfo[3].topic_name}
                        </p>
                    </div>
                </li>
                {/* <li> */}
                    {/* <span>sadfkasd kasjfdf;kas</span> */}
                    {/* <div class="content"> */}
                        {/* <h3>Content Status:</h3> */}
                        {/* <p> */}
                            {/* You uploaded an exercise of Type: {Exinfo[1].exercise_type} at Level: {Exinfo[1].level} under Topic- {Exinfo[1].topic_name} */}
                        {/* </p> */}
                    {/* </div> */}
                {/* </li> */}
                
                </ul>
            </div>     

        </React.Fragment>



     );
}
 
export default ModeratorTimeline;