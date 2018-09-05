import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class CreateBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddBoardClick = this.handleAddBoardClick.bind(this);
  }

  handleInputChange(e) {
    this.setState({ title: e.target.value });
  }

  async handleAddBoardClick() {
    const res = await axios.post(`${process.env.API_URL}/api/board`, {
      groupName: this.props.groupName,
      boardName: this.state.title,
    });

    this.props.addBoard(res.data);
  }

  render() {
    return (
      <div>
        <h3>Create new board</h3>
        <button onClick={this.props.closeBoard}>Close</button>
        <input onChange={this.handleInputChange}></input>
        <button onClick={this.handleAddBoardClick}>Add</button>
      </div>
    );
  }
}

CreateBoard.propTypes = {
  closeBoard: PropTypes.func.isRequired,
  addBoard: PropTypes.func.isRequired,
  groupName: PropTypes.string.isRequired,
};

export default CreateBoard;
