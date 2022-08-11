import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import "./button.css"; 

const useStyles = makeStyles({
  table: {
    minWidth: 1080,
  }
});


export default function Grid({token, col, row, tutorial_id, setTables}) {
  const classes = useStyles();
  
  const parentValue = row;
  const childValue = col;

  const [data, setdata] = React.useState("");

  const [tableCellsData, setTableCellsData] = useState({});

  const getUniqueKeyFromArrayIndex = (rowNum, columnNum) => {
    return `${rowNum}-${columnNum}`;
  };

  const onChangeHandler = (e) => {
   

    console.log(e.target.name, e.target.value);

    setTableCellsData({
      ...tableCellsData,
      [e.target.name]: e.target.value
    });

    setTables(tableCellsData);
    console.log(tableCellsData);
  };

  const disable_cell = (e) => {
    
    console.log(e.target.name, e.target.value);
    
    if(e.target.readOnly == true){
        
        //change placeholder to "disabled"
        e.target.placeholder = "input";
        //change the color to gray
        e.target.style.backgroundColor = "white";
        //change the background color to light gray
        e.target.style.backgroundColor = "white";

        //make the cell editable
        e.target.readOnly = false;
    }
    else
    {
        setTableCellsData({
            ...tableCellsData,
            [e.target.name]: ""
          });
        
        //change placeholder to "disabled"
        e.target.placeholder = "";
        e.target.value = "";
        //change the color to gray
        e.target.style.backgroundColor = "gray";
        //change the background color to light gray
        e.target.style.backgroundColor = "lightgray";

        //make the cell not editable
        e.target.readOnly = true;
        
    }
    

   

   
  };

  const generateTable = () => {
    let table = [];
    // Outer loop to create parent
    for (let i = 0; i <= parentValue ; i++) {
      let children = [];
      //Inner loop to create children
      for (let j = 0; j <= childValue ; j++) {
       

        children.push(
          <td>
            <InputBase
              className={!(i == 0 && j == 0)? "input-base": "input-base-first"}
              name={getUniqueKeyFromArrayIndex(i, j)}
              placeholder={!(i == 0 && j==0) ? ((i == 0)?"verb":((j==0)?"name": "input")): ""}
              Value={data}
              onDoubleClick={(i == 0 || j == 0) ? null : disable_cell}
              onChange={onChangeHandler}
              disabled = {(i == 0 && j==0) ? true : false}
            />
          </td>
        );
      }
      table.push(
        <TableRow key={i}>
          <TableCell>{children}</TableCell>
        </TableRow>
      );
    }
    return table;
  };

  useEffect(() => {
    const keys = Object.keys(tableCellsData);
    keys.forEach((item) => {
      const indexes = item.split("-");

      console.log(
        `value of the item in index ${indexes} is  `,
        tableCellsData[item]
      );
    });
  }, [tableCellsData]);

  const sendToParent = () => {
    setTables(tableCellsData);
    console.log(tableCellsData);
    }

  return (
    <div>
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
    <div className="grid-button">
        <button className="button-85" onClick={sendToParent}>
            Save Table
        </button>
    </div>
    </div>
  );
}
