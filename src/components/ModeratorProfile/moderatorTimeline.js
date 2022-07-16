import React from 'react';
import './moderatorTimelineCss.css'




const ModeratorTimeline = ({Exinfo}) => {

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
                    <span>{Exinfo[0].updatedAt}</span>
                    <div class="content">
                        <h3>Content Status: {Exinfo[1].approval_status}</h3>
                        <p>
                            You uploaded an Exercise Of Type:   {Exinfo[1].exercise_type} At Level:   {Exinfo[1].level} Under Topic: {Exinfo[1].topic_name}
                        </p>
                    </div>
                </li>
                <li>
                    <span>{Exinfo[0].updatedAt}</span>
                    <div class="content">
                        <h3>Content Status: {Exinfo[2].approval_status}</h3>
                        <p>
                            You uploaded an Exercise Of Type:   {Exinfo[2].exercise_type} At Level:   {Exinfo[2].level}  Under Topic: {Exinfo[2].topic_name}
                        </p>
                    </div>
                </li>
                <li>
                    <span>{Exinfo[0].updatedAt}</span>
                    <div class="content">
                        <h3>Content Status: {Exinfo[3].approval_status}</h3>
                        <p>
                            You uploaded an Exercise Of Type:   {Exinfo[3].exercise_type} At Level:   {Exinfo[3].level} Under Topic: {Exinfo[3].topic_name}
                        </p>
                    </div>
                </li>
                
                </ul>
            </div>     

        </React.Fragment>



     );
}
 
export default ModeratorTimeline;