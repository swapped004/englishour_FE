import React, { Component } from 'react';
import { Dropdown } from 'reactjs-dropdown-component';
import { Link } from "react-router-dom";
import "./button.css";
import axios from 'axios';


class Tutorial extends Component {
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
      Topic: [
        {
          label: '',
          value: '',
        },
      ],
      selection: {
        selected_topic: "",
        selected_category: "",
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
    if (name === "Category") {
      const new_selection = {
        selected_topic: this.state.selection.selected_topic,
        selected_category: item.label,
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
    }else if (name === "Topic") {
      const new_selection = {
        selected_topic: item.value,
        selected_category: this.state.selection.selected_category,
      };
      this.setState({
        selection: new_selection,
      });
    }
   }

  render() {
    const { Category,Topic } = this.state;
    const link  = "/add_tutorial?token="+window.location.href.split("?")[1].split("=")[1]+"&topic_id="+this.state.selection.selected_topic;	
    console.log(link);

    return (
      <div className="Content">
        <h1>Tutorial Addition</h1>
        <br />
        <h1>Choose Category and Topic</h1>
        <br /><br />
        <div className="wrapper">
          <Dropdown
            name="Category"
            titleSingular="Category"
            title="Category"
            list={Category}
            onChange = {this.onChange.bind(this)}
          />

          <Dropdown
            name="Topic"
            searchable={['Search for Topic', 'No matching Topic']}
            titleSingular="Topic"
            title="Topic"
            list={Topic}
            onChange = {this.onChange.bind(this)}
          />
        </div>
        <br /><br />
        <Link to={link} style={{ textDecoration: 'none'}}  className="button-85" onClick={this.onChange.bind(this)}>
        Proceed
        </Link>
      </div>
    );
  }
}

export default Tutorial;
