import React, { Component, useState } from 'react';
import { Dropdown } from 'reactjs-dropdown-component';
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./button.css";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Grid from './Grid';
import Sentence_add from './Sentence_add';

function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }


const Row_col = () => {

    const navigate = useNavigate();

    let query = useQuery();
    const token = query.get('token');

    var decode = jwt_decode(token);
    console.log(decode.moderator_id);
    const id = decode.moderator_id;

    const tutorial_id = query.get('tutorial');
    const level = query.get('level');


    
  //make 2 dropdowns, one for column and one for row

  //dropdown to select number of rows
    const row_options = [
        
        {
            label: '3',
            value: '3',
        },

        {
            label: '4',
            value: '4',
        },
        {
            label: '5',
            value: '5',
        },
        {
            label: '6',
            value: '6',
        },
        {
            label: '7',
            value: '7',
        },
    ];

    //dropdown to select number of columns
    const col_options = [
        
        {
            label: '3',
            value: '3',
        },

        {
            label: '4',
            value: '4',
        },
        {
            label: '5',
            value: '5',
        },
        {
            label: '6',
            value: '6',
        },
        {
            label: '7',
            value: '7',
        },
    ];

    const [selected_row_col, setRowCol] = useState
    ({
        selected_row: "",
        selected_col: "",
    });

    const [rowcolbtn, setRowColBtn] = useState(false);


    const [inputList, setInputList] = useState();
    const [sentenceList, setSentenceList] = useState();
    

    //write function clickHandler to handle the click event of the button
    const clickHandler = () => {
        console.log("clicked");
        console.log(selected_row_col.selected_row);	
        console.log(selected_row_col.selected_col);
        console.log(tutorial_id);
        setRowColBtn(true);
        setSentenceList(<Sentence_add token={token} tutorial_id={tutorial_id} row={selected_row_col.selected_row.value} col={selected_row_col.selected_col.value} setSentences={setSentences}/>);
        setInputList(<Grid token={token} tutorial_id={tutorial_id} row={selected_row_col.selected_row.value} col={selected_row_col.selected_col.value} setTables={setTables}/>);
        // const link = "/nameverb?token="+token+"&row="+selected_row_col.selected_row.value+"&col="+selected_row_col.selected_col.value+"&tutorial="+tutorial_id;
        // navigate(link);
    }


    //sentences state
    const [sentences, setSentences] = useState({});
    //tables state
    const [tables, setTables] = useState({});
    //description state
    const [description, setDescription] = useState("");

    const descHandler = (e) => {
        console.log(e.target.value);
        setDescription(e.target.value);
    }



    //submit button
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(tables);
        console.log(sentences);

        //send tables and sentences to the server
        await axios
          .post("http://localhost:8248/moderator/insert?token="+token, {
            type: "readcomplete",
            level: level,
            tutorial_id: tutorial_id,
            nrows: selected_row_col.selected_row.value,
            ncols: selected_row_col.selected_col.value,
            table: tables,
            sentence_list: sentences,
            description: description,
            moderator_id: id,
            content:"A new exercise of 'Table Completion' has been added",
          })
          .then(function (response) {
            console.log(response);
            var txt="";
            if (window.confirm("Exercise Pending for review! Add more?")) {
              txt = "Yes";
            } else {
              txt = "No";
            }
            if(txt === "Yes"){
              navigate("/consecutive?token="+token+"&tutorial="+tutorial_id+"&level="+level+"&type=readcomplete");
            }
            else{
              navigate('/tutorial?token='+token);
            }
          });

        

    }
   

  return (
    <div>
        <div className="read-container">  
        
            <div>
                <Dropdown
                    name="row"
                    titleSingular="no of Rows"
                    title="no of rows"
                    list={row_options}
                    onChange = {(selected_row) => setRowCol({...selected_row_col, selected_row})}
                    isDisabled={rowcolbtn? false : true}
                    
                   
                />
            </div>

            <div>
                <Dropdown 
                    name="col"
                    titleSingular="no of Columns"
                    title="no of cols"
                    list={col_options}
                    onChange = {(selected_col) => setRowCol({...selected_row_col, selected_col})}
                    isDisabled={rowcolbtn? false : true}
                    
                />
            </div>
            
            <div>
                <button className= "button-85" onClick={clickHandler}>
                {/* <button className={rowcolbtn? "btn btn-primary":"invisble"} onClick={clickHandler}> */}
                {/* {rowcolbtn? <>Next</>:null} */}
                Next
                </button>
            </div>
            
        </div>
        {sentenceList}
        {inputList}

        
        <div className='description'>
                <input placeholder="description" className='inputList' onChange={descHandler} />
        </div>

        {rowcolbtn ?  (<>
        <div className='grid-button'>
            <button className='button-85' onClick={submitHandler}>
                Add Exercise
            </button>
        </div>
        </>) : null
        }
       

        

    </div>
  )
}

export default Row_col