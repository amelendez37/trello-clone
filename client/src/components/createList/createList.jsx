import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class CreateList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddList = this.handleAddList.bind(this);
  }

  handleInputChange(e) {
    this.setState({ title: e.target.value });
  }

  async handleAddList(e) {
    if (e.key === 'Enter') {
      e.target.value = '';
      const res = await axios.post(`${process.env.API_URL}/api/list`, {
        groupName: this.props.groupName,
        boardId: this.props.boardId,
        listName: this.state.title,
      });

      this.props.addList(res.data);
    }
  }

  render() {
    return (
      <div>
        <h2>Add a list</h2>
        <input
        onChange={this.handleInputChange}
        onKeyPress={this.handleAddList}
        ></input>
      </div>
    );
  }
}

CreateList.propTypes = {
  addList: PropTypes.func.isRequired,
  groupName: PropTypes.string.isRequired,
  boardTitle: PropTypes.string,
  boardId: PropTypes.string,
};

export default CreateList;
