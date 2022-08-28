import React from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import "./style.css"


const useStyles = makeStyles({
    table: {
      minWidth: 1080,
    }
  });


function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const PreviewReadComplete = ({setOpen, setIsClicked}) => {
    const navigate = useNavigate();
    let query = useQuery();
    const classes = useStyles();
    setOpen(false);

    const token = query.get('token');
    const exercise_id = query.get('exercise_id');
    const notification_id = query.get('notification_id');
    console.log(exercise_id);
    console.log(notification_id);

    const [description, setDescription] = React.useState("");
    const [nrows, setNrows] = React.useState(0);
    const [ncols, setNcols] = React.useState(0);
    const [sentence_list, setSentence_list] = React.useState([]);
    const [table, setTable] = React.useState();


    const getUniqueKeyFromArrayIndex = (rowNum, columnNum) => {
        return `${rowNum}-${columnNum}`;
      };


    



    React.useEffect(() => {
        const get_data = async () => {
            const response = await axios.get("http://localhost:8248/moderator/exercisePreview?exercise_id="+exercise_id+"&token="+token+"&exercise_type=readcomplete");
            console.log(response.data);
            setDescription(response.data.description);
            setNrows(response.data.nrows);
            setNcols(response.data.ncols);
            setSentence_list(response.data.sentence_list);
            setTable(response.data.table);


            //make 2D grid from table of (nrows+1, ncols+1)
            let grid = [];
            for(let i = 0; i < response.data.nrows+1; i++){
                let row = [];
                for(let j = 0; j < response.data.ncols+1; j++){
                    let key = i.toString()+"-"+j.toString();
                    console.log("key");
                    console.log(key);

                    //if key is in table, then put value in grid
                    if(response.data.table.hasOwnProperty(key)){
                        console.log("has property");
                        console.log(response.data.table[key]);
                        row.push(response.data.table[key]);
                    }
                    else{
                        row.push("");
                    }
                }
                grid.push(row);
            }

            console.log("grid");
            console.log(grid);

            //set grid to state
            setTable(grid);

            //
        }

        get_data();

        console.log("table after:");
        console.log(table);
        console.log(sentence_list);
        
        } , []);




        const generateTable = () => {
            console.log("generate table");
            console.log(table);
            let tab = [];
            // Outer loop to create parent
            for (let i = 0; i <= nrows ; i++) {
              let children = [];
              //Inner loop to create children
              for (let j = 0; j <= ncols ; j++) {

                //get correct key for table element
                console.log("tab[i][j]");
                console.log(table?.[i]?.[j]);
               
        
                children.push(
                  <td>
                    <InputBase
                      className={!(i == 0 && j == 0)? "input-base": "input-base-first"}
                      name={getUniqueKeyFromArrayIndex(i, j)}
                      
                      //table is a state variable that is set in the useEffect
                      value={(i == 0 || j == 0)? table?.[i]?.[j]: ""}
                      disabled = {true}
                      //set background color to black if value is empty
                      style={{backgroundColor: (table?.[i]?.[j] == "" && !(i ==0 || j == 0)) ? "black" : "white" ,fontWeight: "bold", color: "black", fontSize: "1.5rem"}}
                      //set text to bold
                        
                    />
                  </td>
                );
              }
              tab.push(
                <TableRow key={i}>
                  <TableCell>{children}</TableCell>
                </TableRow>
              );
            }
            return tab;
          };

          const handleApprove = async (e) => {
            e.preventDefault();
            const response = await axios.post("http://localhost:8248/moderator/approveExercise?notification_id="+notification_id+"&token="+token+"&status=approved");
            console.log(response.data)
            alert("Appproved Successfully");
            if(response.data === "Status Updated") {
              navigate('/profile?token='+token);
            }
          }
          const handleDecline = async (e) => {
            e.preventDefault();
            const response = await axios.post("http://localhost:8248/moderator/approveExercise?notification_id="+notification_id+"&token="+token+"&status=declined");
            console.log(response.data);
            alert("Declined Successfully");
            if(response.data === "Status Updated") {
              navigate('/profile?token='+token);
            }
          }

  return (
    <div>
        <div className='readComplete_desc'>
            <h3>{description}</h3>
        </div>
        
       

        {/* the table --show the grid*/}
        {/* <h2>Table</h2>
        <table>
            <tbody>
                {table.map((row, index) => (
                    <tr key={index}>
                        {row.map((col, index) => (
                            <td key={index}>{col}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table> */}

        <div className="grid-container">
            <div>
                <h1>Fill up the Table</h1>
            </div>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableBody>{generateTable()}</TableBody>
            </Table>
            </TableContainer>
        </div>

        <div className='readComplete_sentence_list'>
        {/* the sentence_list */}
            <h2>Hints:</h2>
            
                {sentence_list.map((sentence, index) => (
                    <div className='readComplete_sentence'>
                        {index+1}.&nbsp;&nbsp;&nbsp;{sentence.service}
                    </div>
                ))}
            
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
        <button className="button-85" onClick={handleApprove}>Approve</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button className="button-85"onClick={handleDecline}>Decline</button>

    </div>
  )
}

export default PreviewReadComplete