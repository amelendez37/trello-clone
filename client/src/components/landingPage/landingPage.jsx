import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './landingPage.scss';

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
    this.redirectToBoardPage(res);
  }

  async handleNewClick() {
    const res = await axios.post(`${this.url}/api/group`, {
      groupName: this.state.input,
    });
    this.redirectToBoardPage(res);
  }

  redirectToBoardPage(res) {
    this.props.history.push({
      pathname: `${res.data.groupName}/boards`,
      state: { data: res.data },
    });
  }

  render() {
    return (
      <div className="container">
        <div className="landing">
          <p className="landing__name">taskTracker/</p>
          <h1 className="landing__title">Enter group name</h1>
          <input className="landing__input" type="text" onChange={this.handleInputChange}/>
          <div>
            <button className="landing__btn landing__btn--exist" onClick={this.handleExistingClick}>Existing Group</button>
            <button className="landing__btn landing__btn--new" onClick={this.handleNewClick}>New Group</button>
          </div>
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default LandingPage;
