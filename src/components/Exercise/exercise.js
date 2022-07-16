import React, { Component } from 'react';
import { Dropdown } from 'reactjs-dropdown-component';
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import "./button.css";


class Exercise extends Component {
  constructor() {
    super();
    this.state = {
      Category: [
        {
          label: 'Communicative',
          value: '1',
        },
        {
          label: 'Grammer',
          value: '2',
        },
      ],
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
      Topic: [
        {
          label: 'vocabulary',
          value: '2',
        },
        {
            label: 'word',
            value: '1',
        },
        {
            label: 'sentence',
            value: '3',
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

  onChange = (item, name) => { 
    console.log(name);
    this.setState({ [name]: item });
    console.log(this.state);
   }

  render() {
    const { Category, Level, Topic, Type } = this.state;

    return (
      <div className="Content">

        <h1>Choose Category and Level</h1>
        <br /><br />
        <div className="wrapper">
          <Dropdown
            name="Category"
            titleSingular="Category"
            title="Category"
            list={Category}
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
        <h1>Search Topic and Type</h1>
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
            name="Topic"
            searchable={['Search for Topic', 'No matching Topic']}
            titleSingular="Topic"
            title="Topic"
            list={Topic}
            // onChange={this.onChange}
            onChange = {this.onChange.bind(this)}
          />
        </div>
        <br /><br />
        {/* {console.log(this.Selection_state.selection)}  */}
        <Link to={"/"+this.state.Type.value+"?type="+this.state.Type.value+"&level="+this.state.Level.label+"&category="+this.state.Category.value+"&topic="+this.state.Topic.label} style={{ textDecoration: 'none'}} className="button-54" onClick={this.onChange.bind(this)}>
        Proceed
        </Link>
      </div>
    );
  }
}

export default Exercise;
