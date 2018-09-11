import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './landingPage.scss';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleExistingClick = this.handleExistingClick.bind(this);
    this.handleNewClick = this.handleNewClick.bind(this);
  }

  handleInputChange(e) {
    this.setState({ input: e.target.value });
  }

  async handleExistingClick() {
    const res = await axios.get(`${process.env.API_URL}/api/group/${this.state.input}`);
    this.redirectToHomePage(res);
  }

  async handleNewClick() {
    const res = await axios.post(`${process.env.API_URL}/api/group`, {
      groupName: this.state.input,
    });
    this.redirectToHomePage(res);
  }

  redirectToHomePage(res) {
    this.props.history.push({
      pathname: `${res.data.groupName}/home`,
      state: { data: res.data },
    });
  }

  render() {
    return (
      <div className="container">
        <div className="inner">
          <p className="inner__name">taskTracker/</p>
          <h1 className="inner__title">Enter group name</h1>
          <input className="inner__input" type="text" onChange={this.handleInputChange}/>
          <div>
            <button className="inner__btn inner__btn--exist" onClick={this.handleExistingClick}>Existing Group</button>
            <button className="inner__btn inner__btn--new" onClick={this.handleNewClick}>New Group</button>
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
