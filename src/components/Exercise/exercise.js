import React, { Component } from 'react';
import { Dropdown } from 'reactjs-dropdown-component';
import { Link } from "react-router-dom";
import "./button.css";
import axios from 'axios';


class Exercise extends Component {
  constructor() {
    super();
    this.state = {
      Category: [
        {
          label: '',
          value: '',
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
          label: '',
          value: '',
        },
      ],
      Tutorial: [
        {
          label: '',
          value: '',
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
        selected_tutorial:"",
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

  onChange = async (item, name) => { 
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
        selected_tutorial: this.state.selection.selected_tutorial,
        cnt: this.state.selection.cnt + 1,
      };
      console.log(new_selection.token);
      this.setState({ selection: new_selection });
    } else if (name === "Type") {
      const data = await axios.get(
        "http://localhost:8248/moderator/categoryDetails?token="+window.location.href.split("?")[1].split("=")[1]
      );
      console.log(data);
      const categories = data.data.map((category) => ({
        label: category.category_name,
        value: category.category_id,
      }));
      this.setState({
        Category: categories,
      });

      const new_selection = {
        selected_level: this.state.selection.selected_level,
        selected_topic: this.state.selection.selected_topic,
        selected_type: item.value,
        selected_category: this.state.selection.selected_category,
        token: window.location.href.split("?")[1].split("=")[1],
        selected_tutorial: this.state.selection.selected_tutorial,
        cnt: this.state.selection.cnt + 1,
      };
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
        selected_tutorial: this.state.selection.selected_tutorial,
        cnt: this.state.selection.cnt + 1,
      };
      this.setState({
        selection: new_selection,
      });

      const data = await axios.get(
        "http://localhost:8248/moderator/tutorialDetails?token="+window.location.href.split("?")[1].split("=")[1]+"&topic_id="+item.value
      );
      console.log(data);
      const tutorials = data.data.map((tutorial) => ({
        label: tutorial.tutorial_title,
        value: tutorial.tutorial_id,
      }));
      this.setState({
        Tutorial: tutorials,
      });
    }
    else if (name === "Category") {
      const new_selection = {
        selected_level: this.state.selection.selected_level,
        selected_topic: this.state.selection.selected_topic,
        selected_type: this.state.selection.selected_type,
        selected_category: item.label,
        token: window.location.href.split("?")[1].split("=")[1],
        selected_tutorial: this.state.selection.selected_tutorial,
        cnt: this.state.selection.cnt + 1,
      };
      this.setState({
        selection: new_selection,
      });

      console.log(this.state.selection.selected_category);
      const data = await axios.get(
        "http://localhost:8248/moderator/topicDetails?token="+window.location.href.split("?")[1].split("=")[1]+"&category_name="+item.label
      );
      console.log(data);
      const topics = data.data.map((topic) => ({
        label: topic.topic_name,
        value: topic.topic_id,
      }));
      this.setState({
        Topic: topics,
      });
    }
    else if(name === "Tutorial"){
      const new_selection = {
        selected_level: this.state.selection.selected_level,
        selected_topic: this.state.selection.selected_topic,
        selected_type: this.state.selection.selected_type,
        selected_category: this.state.selection.selected_category,
        token: window.location.href.split("?")[1].split("=")[1],
        selected_tutorial: item.value,
        cnt: this.state.selection.cnt + 1,
      };
      this.setState({
        selection: new_selection,
      });
    }
    console.log(this.state);
   }

  render() {
    const { Category, Level, Topic, Type, Tutorial } = this.state;

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
        <h1>Category and Topic</h1>
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
        <h1>Tutorial</h1>
        <br /><br />
        <div className="wrapper">
        <Dropdown
            name="Tutorial"
            searchable={['Search for Tutorial', 'No matching Tutorial']}
            titleSingular="Tutorial"
            title="Tutorial"
            list={Tutorial}
            // onChange={this.onChange}
            onChange = {this.onChange.bind(this)}
          />
        </div>
        <br /><br />
        {/* {console.log(this.Selection_state.selection)}  */}
        <Link to={"/"+this.state.selection.selected_type+"?token="+this.state.selection.token+"&type="+this.state.selection.selected_type+"&level="+this.state.selection.selected_level+"&category="+this.state.selection.selected_category+"&tutorial="+this.state.selection.selected_tutorial} style={{ textDecoration: 'none'}} className="button-54" onClick={this.onChange.bind(this)}>
        Proceed
        </Link>
      </div>
    );
  }
}

export default Exercise;
