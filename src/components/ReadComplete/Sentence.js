import React, { Component, useState } from 'react';
import { Dropdown } from 'reactjs-dropdown-component';
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./button.css";
import jwt_decode from "jwt-decode";
import axios from "axios";


function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

const SentenceInput = ({onDelete, key}) => {
    return( 
        <div>
            <input placeholder="sentence" className='inputList' id={key}/>
            <div className='grid-button'>
            <button className= "btn btn-primary" onClick={onDelete}>Delete</button>
            </div>
        </div>
    );
};


const Sentence = ({token, col, row, tutorial_id,}) => {

    const [sentenceList, setSentenceList] = useState([ 
        {
          id: 1,
          value: ""
        }
      ]);

    //initially 1 sentence input field with id 0
    const [SentenceInputList, setSentenceInputList] = useState([<SentenceInput key='0' onDelete={onDeleteSentenceBtnClick()}/>]);

    const onAddSentenceBtnClick = event => {
        setSentenceInputList(SentenceInputList.concat(<SentenceInput key={SentenceInputList.length} onDelete={onDeleteSentenceBtnClick} />));
        console.log(getSentences());
      };

    //on delete button click on each sentence input
    const onDeleteSentenceBtnClick = (event, index) => {
        setSentenceInputList(SentenceInputList.filter((sentence, i) => i !== index));
      };

    //get all the sentences from sentenceInput list
    const getSentences = () => {

        let sentences = [];
        for(let i = 0; i < SentenceInputList.length; i++){
            sentences.push(SentenceInputList[i].value);
        }
        return sentences;
    }

  //return two inputList, one for name and one for verb with add button
  return (
    <div>
        <div>
            {SentenceInputList}
            <div className='grid-button'> <button className= "btn btn-primary" onClick={onAddSentenceBtnClick}>Add Sentence</button></div>
           
        </div>

    </div>
  )
}

export default Sentence