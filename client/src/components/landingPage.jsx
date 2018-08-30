import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class LandingPage extends React.Component {
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
    const res = await axios.get(`${this.url}/api/group/${this.state.input}`);
    this.props.history.push({ pathname: `${res.data.groupName}/boards` });
  }

  async handleNewClick() {
    const res = await axios.post(`${this.url}/api/group`, {
      groupName: this.state.input,
    });
    this.props.history.push({ pathname: `${res.data.groupName}/boards` });
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

LandingPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default LandingPage;
