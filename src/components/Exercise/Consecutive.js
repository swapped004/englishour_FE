import React, { Component } from 'react';
import { Dropdown } from 'reactjs-dropdown-component';
import { Link } from "react-router-dom";
import "./button.css";

class Consecutive extends Component {
  constructor() {
    super();
    this.state = {
      Level: [
        {
          label: '1',
          value: 'one',
        },
        {
          label: '2',
          value: 'two',
        },
        {
            label: '3',
            value: 'three',
        },
        {
            label: '4',
            value: 'four',
        },
        {
            label: '5',
            value: 'five',
        },
        {
            label: '6',
            value: 'six',
        },
      ],
      Type: [
        {
            label: 'Table Completion',
            value: 'tablecompletion',
        },
        {
            label: 'Change Letter',
            value: 'changeletter',
        },
        {
            label: 'Categorize Words',
            value: 'categorizewords',
        },
        {
            label: 'Sentence Shuffling',
            value: 'sentenceshuffling',
        },
      ],
      selection: {
        selected_level: "",
        selected_type: "",
        selected_tutorial:"",
        token: "",
      },
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.tabKeyPressed);
    window.addEventListener('mousedown', this.mouseClicked);
  }

  tabKeyPressed = (e) => {
    if (e.keyCode === 9) {
      document.querySelector('body').classList.remove('noFocus');
      window.removeEventListener('keydown', this.tabKeyPressed);
      window.addEventListener('mousedown', this.mouseClicked);
    }
  }

  mouseClicked = () => {
    document.querySelector('body').classList.add('noFocus');
    window.removeEventListener('mousedown', this.mouseClicked);
    window.addEventListener('keydown', this.tabKeyPressed);
  }

  onChange = async (item, name) => { 
    //console.log(item.label);

    if (name === "Level") {
        console.log(window.location.href.split("?")[1].split("=")[1].split("&")[0]);
        console.log(window.location.href.split("?")[1].split("=")[2]);
        const new_selection = {
            selected_level: item.label,
            selected_type: this.state.selection.selected_type,
            token: window.location.href.split("?")[1].split("=")[1].split("&")[0],
            selected_tutorial: window.location.href.split("?")[1].split("=")[2],
        };
        this.setState({ selection: new_selection });
        } else if (name === "Type") {
        const new_selection = {
            selected_level: this.state.selection.selected_level,
            selected_type: item.value,
            token: window.location.href.split("?")[1].split("=")[1],
            selected_tutorial:window.location.href.split("?")[1].split("=")[1],
        };
        this.setState({
            selection: new_selection,
        });
    }
}

  render() {
    const {Level,Type} = this.state;

    return (
      <div className="Content">
        <h1>Exercise Addition</h1>
        <br />
        <h1>Type and Level</h1>
        <br /><br />
        <div className="wrapper">
          <Dropdown
            name="Type"
            searchable={['Search for Type', 'No matching Type']}
            title="Type"
            list={Type}
            // onChange={this.onChange}
            onChange = {this.onChange.bind(this)}
          />

          <Dropdown
            name="Level"
            title="Level"
            list={Level}
            // onChange={this.onChange}
            onChange = {this.onChange.bind(this)}
          />
        </div>
        <br /><br />
        <Link to={"/"+this.state.selection.selected_type+"?token="+this.state.selection.token+"&level="+this.state.selection.selected_level+"&tutorial="+this.state.selection.selected_tutorial} style={{ textDecoration: 'none'}} className="button-54" onClick={this.onChange.bind(this)}>
        Proceed
        </Link>
      </div>
    );
  }
}

export default Consecutive;
