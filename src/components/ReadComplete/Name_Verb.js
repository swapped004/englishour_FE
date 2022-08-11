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

const NameInput = () => {
    return( 
        <div>
            <input placeholder="Name" className='inputList' />
        </div>
    );
};

const VerbInput = () => {
    return( 
        <div>
            <input placeholder="Verb" />
        </div>
    );
};

const Name_Verb = ({token, col, row, tutorial_id}) => {

    // const navigate = useNavigate();

    // let query = useQuery();
    // const token = query.get('token');

    // const tutorial_id = query.get('tutorial');
    // const row = query.get('row');
    // const col = query.get('col');

    const [nameList, setNameList] = useState([ 
        {
          type: "text",
          id: 1,
          value: ""
        }
      ]);

    const [verbList, setVerbList] = useState([
        {
            type: "text",
            id: 1,
            value: ""
          }
    ]);

    const [NameInputList, setNameInputList] = useState([<NameInput/>]);
    const [VerbInputList, setVerbInputList] = useState([<VerbInput/>]);

    const onAddNameBtnClick = event => {
        setNameInputList(NameInputList.concat(<NameInput key={NameInputList.length} />));
      };

    const onAddVerbBtnClick = event => {
        setVerbInputList(VerbInputList.concat(<VerbInput key={VerbInputList.length} />));
    };



  //return two inputList, one for name and one for verb with add button
  return (
    <div>
        <div>
            {NameInputList}
            <button onClick={onAddNameBtnClick}>Add Name</button>
        </div>

        <div>
            {VerbInputList}
            <button onClick={onAddVerbBtnClick}>Add Verb</button>
        </div>

    </div>
  )
}

export default Name_Verb