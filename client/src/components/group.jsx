import React from 'react';
import axios from 'axios';

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };
    this.url = process.env.API_URL;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleExistingClick = this.handleExistingClick.bind(this);
    this.handleNewClick = this.handleNewClick.bind(this);
  }

  handleInputChange(e) {
    this.setState({ input: e.target.value });
  }

  async handleExistingClick() {
    try {
      const data = await axios.get(`${this.url}/api/group/${this.state.input}`);
      // redirect to boards
    } catch (err) {
      console.log('Group does not exist');
    }
  }

  async handleNewClick() {
    await axios.post(`${this.url}/group`, {
      groupName: this.state.input,
    });
    // redirect to boards
  }

  render() {
    return (
      <div>
        <h1>Group Name</h1>
        <input type="text" onChange={this.handleInputChange}/>
        <div>
          <a href="#" onClick={this.handleExistingClick}>Existing Group</a>
          <a href="#" onClick={this.handleNewClick}>New Group</a>
        </div>
      </div>
    );
  }
}

export default Group;
