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
          value: 'communicative',
        },
        {
          label: 'Grammer',
          value: 'grammer',
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
          label: 'Vocabulary 1',
          value: 'vocabulary1',
        },
        {
          label: 'Vocabulary 2',
          value: 'vocabulary2',
        },
        {
            label: 'Word 1',
            value: 'word1',
        },
        {
            label: 'Word 2',
            value: 'word2',
        },
        {
            label: 'Sentence 1',
            value: 'Sentence1',
        },
        {
            label: 'Sentence 2',
            value: 'sentence2',
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

  onChange = (item, name) => { console.log(item, name); }

  render() {
    const { Category, Level, Topic, Type } = this.state;

    return (
      <div className="Content">

        <h1>Choose Category and Level</h1>
        <br /><br />
        <div className="wrapper">
          <Dropdown
            name="category"
            titleSingular="Category"
            title="Category"
            list={Category}
            onChange={this.onChange}
          />

          <Dropdown
            name="Level"
            title="Level"
            list={Level}
            onChange={this.onChange}
          />
        </div>
        <br /><br />
        <h1>Search Topic and Type</h1>
        <br /><br />
        <div className="wrapper">
          <Dropdown
            name="Topic"
            searchable={['Search for Topic', 'No matching Topic']}
            titleSingular="Topic"
            title="Topic"
            list={Topic}
            onChange={this.onChange}
          />

          <Dropdown
            name="Type"
            searchable={['Search for Type', 'No matching Type']}
            title="Type"
            list={Type}
            onChange={this.onChange}
          />
        </div>
        <br /><br />
        <Link to="/changeOneLetter" style={{ textDecoration: 'none'}} className="button-54">
        Proceed
        </Link>
      </div>
    );
  }
}

export default Exercise;
