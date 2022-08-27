import axios from 'axios';
import React from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { PieChart } from "react-minimal-pie-chart";
import "./styles.css"

const randomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const TopicStat = ({token}) => {

    
    //randomly generate 100 colors and store in array
    // const COLORS = Array.from({ length: 100 }, () => randomColor());
    //20 different colors
    const COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF", "#FF0000", "#FF00FF", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF"];

    const [TopicStat, setTopicStat] = React.useState([]);
    const [pieData, setPieData] = React.useState([]);

    //get all stats from database with axios
    //when page loads get stats
    React.useEffect(() => {
    const getStats = async () => {
        console.log('get stats');
        const result = await axios.get(
            "http://localhost:8248/moderator/getTopicStats?token="+token
        );
        
        console.log(result.data);
        setTopicStat(result.data);

        //set pieData
        var temp=[]
        for(var i = 0; i < result.data.length; i++){
            temp.push({
                title: result.data[i].topic_name + " (" + result.data[i].category_name + ")",
                value: result.data[i].no_of_attempts,
                color: COLORS[i%COLORS.length]
            });
        }

        console.log("temp");
        console.log(temp);
        setPieData(temp);
    }

    getStats();
    }, [] );
  
  return (
    <div className='topic_stat_container'>
        <div className="legends_container">
            {pieData.map((entry, index) => (
                <div className="legends">
                    <div className='legend_title'>
                        {entry.title.split('(')[0]}: &nbsp;&nbsp;
                    </div>
                    <div className='legend_color'>
                    <span style={{ backgroundColor: entry.color }}>
                    &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    </div>
                </div>
            ))}
        </div>
        
        <PieChart
                    animate
                    animationDuration={500}
                    animationEasing="ease-in-out"
                    center={[50, 30]}
                    data={pieData}
                    
                    
                    lengthAngle={360}
                    lineWidth={15}
                    paddingAngle={0}
                    radius={25}
                    rounded
                    startAngle={0}
                    viewBoxSize={[100, 60]}

                    label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
                    labelPosition={80}
                    labelStyle={{
                        fontSize: "3px",
                        fontColor: "FFFFFA",
                        fontWeight: "800",
                      }}
                >
                    
        </PieChart>

        <div className='exercise-stat-content-right'>
        {TopicStat.map((topic, index) => (
                <div className='exercise-stat-content-right-box'>
                 <h3><b>No</b>:  &nbsp; {index+1}</h3>
                 <h3><b>Topic name</b>:  &nbsp; {topic.topic_name}</h3>
                 <h3><b>Category</b>:  &nbsp; {topic.category_name}</h3>
                 <h3><b>No of attempts</b>:  &nbsp; {topic.no_of_attempts}</h3>
                 <h3><b>No of Solves:</b>  &nbsp; {topic.no_of_solved}</h3>
                 <h3><b>No of ReadComplete:</b>  &nbsp; {topic.no_of_readComplete}</h3>
                 <h3><b>No of GroupWords:</b>  &nbsp; {topic.no_of_groupWords}</h3>
                 <h3><b>No of ShuffledSentence:</b>  &nbsp; {topic.no_of_shuffledSentence}</h3>
                 <h3><b>No of LetterChange:</b>  &nbsp; {topic.no_of_letterChange}</h3>
                 <h3><b>No of FillInTheGaps:</b>  &nbsp; {topic.no_of_fillInTheGaps}</h3>
                 </div>
        ))}
        </div>
       </div>

      
        
  )
}

export default TopicStat