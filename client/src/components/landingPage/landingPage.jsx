import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './landingPage.scss';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      groupNameError: '', // options: 'noExist', 'alreadyExist', 'invalid'
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleExistingClick = this.handleExistingClick.bind(this);
    this.handleNewClick = this.handleNewClick.bind(this);
  }

  handleInputChange(e) {
    this.setState({ input: e.target.value });
  }

  async handleExistingClick() {
    try {
      const res = await axios.get(`${process.env.API_URL}/api/group/${this.state.input}`);
      this.redirectToHomePage(res);
    } catch (err) {
      if (err.response.status === 404) {
        this.setState({ groupNameError: 'noExist' });
      }
    }
  }

  async handleNewClick() {
    try {
      const res = await axios.post(`${process.env.API_URL}/api/group`, {
        groupName: this.state.input,
      });

      this.redirectToHomePage(res);
    } catch (err) {
      if (err.response.status === 400) {
        this.setState({ groupNameError: 'invalid' });
      } else if (err.response.status === 404) {
        this.setState({ groupNameError: 'alreadyExist' });
      }
    }
  }

  redirectToHomePage(res) {
    this.props.history.push({
      pathname: `${res.data.groupName}/home`,
      state: { data: res.data },
    });
  }

  renderGroupNameError() {
    const { groupNameError } = this.state;

    if (groupNameError === 'invalid') {
      return <p className="groupname-error">Group name must only have letters, numbers, and be less than 30 characters</p>;
    }

    if (groupNameError === 'alreadyExist') {
      return <p className="groupname-error">Group name already exists</p>;
    }
    return <p className="groupname-error">Could not find group</p>;
  }

  render() {
    return (
      <div className="container">
        <div className="inner">
          <p className="inner__name">/taskTracker</p>
          <input className="inner__input" type="text" placeholder="Enter group name" onChange={this.handleInputChange}/>
          <button className="inner__btn inner__btn--exist" onClick={this.handleExistingClick}>Existing</button>
          <button className="inner__btn inner__btn--new" onClick={this.handleNewClick}>New</button>
          {this.state.groupNameError ? this.renderGroupNameError() : null}
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default LandingPage;
