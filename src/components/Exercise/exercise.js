import React, { Component } from 'react';
import { Dropdown } from 'reactjs-dropdown-component';
import { Link } from "react-router-dom";
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
          label: 'Grammar',
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
      selection: {
        selected_level: "",
        selected_topic: "",
        selected_type: "",
        selected_category: "",
        token: "",
        cnt: 0,
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

  onChange = (item, name) => { 
    console.log(item.label);
    //console.log(window.location.href.split("?")[1].split("=")[1]);
    //this.setState({ [name]: item });
    //console.log(this.state);

    if (name === "Level") {
      const new_selection = {
        selected_level: item.label,
        selected_topic: this.state.selection.selected_topic,
        selected_type: this.state.selection.selected_type,
        selected_category: this.state.selection.selected_category,
        token: window.location.href.split("?")[1].split("=")[1],
        cnt: this.state.selection.cnt + 1,
      };
      console.log(new_selection.token);
      this.setState({ selection: new_selection });
    } else if (name === "Type") {
      const new_selection = {
        selected_level: this.state.selection.selected_level,
        selected_topic: this.state.selection.selected_topic,
        selected_type: item.value,
        selected_category: this.state.selection.selected_category,
        token: window.location.href.split("?")[1].split("=")[1],
        cnt: this.state.selection.cnt + 1,
      };
      console.log(new_selection.selected_type);
      this.setState({
        selection: new_selection,
      });
    } else if (name === "Topic") {
      const new_selection = {
        selected_level: this.state.selection.selected_level,
        selected_topic: item.label,
        selected_type: this.state.selection.selected_type,
        selected_category: this.state.selection.selected_category,
        token: window.location.href.split("?")[1].split("=")[1],
        cnt: this.state.selection.cnt + 1,
      };
      console.log(new_selection.selected_topic);
      this.setState({
        selection: new_selection,
      });
    }
    else if (name === "Category") {
      const new_selection = {
        selected_level: this.state.selection.selected_level,
        selected_topic: this.state.selection.selected_topic,
        selected_type: this.state.selection.selected_type,
        selected_category: item.label,
        token: window.location.href.split("?")[1].split("=")[1],
        cnt: this.state.selection.cnt + 1,
      };
      console.log(new_selection.selected_category);
      this.setState({
        selection: new_selection,
      });
    }
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
        <Link to={"/"+this.state.selection.selected_type+"?token="+this.state.selection.token+"&type="+this.state.selection.selected_type+"&level="+this.state.selection.selected_level+"&category="+this.state.selection.selected_category+"&topic="+this.state.selection.selected_topic} style={{ textDecoration: 'none'}} className="button-54" onClick={this.onChange.bind(this)}>
        Proceed
        </Link>
      </div>
    );
  }
}

export default Exercise;
