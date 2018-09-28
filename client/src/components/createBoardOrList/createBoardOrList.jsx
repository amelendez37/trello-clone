import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Cross from '../../../public/img/cross.svg';
import SquaredPlus from '../../../public/img/squared-plus.svg';
import './createBoardOrList.scss';

class CreateBoardOrList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
    this.inputRef = React.createRef();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddBoardClick = this.handleAddBoardClick.bind(this);
    this.handleAddListClick = this.handleAddListClick.bind(this);
  }

  handleInputChange(e) {
    this.setState({ title: e.target.value });
  }

  async handleAddBoardClick() {
    // clear input field
    this.inputRef.current.value = '';

    if (this.state.title) {
      const res = await axios.post(`${process.env.API_URL}/api/board`, {
        groupName: this.props.groupName,
        boardName: this.state.title,
      });

      this.props.addBoard(res.data);
    }
  }

  async handleAddListClick() {
    this.inputRef.current.value = '';

    if (this.state.title) {
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
      <div className="create">
        <h3 className="create__text">{this.props.buttonText}</h3>
        <input className="create__input" ref={this.inputRef} onChange={this.handleInputChange}></input>
        <div className="create__close" onClick={this.props.handleCloseButtonClick}>
          <Cross width={25} height={25}/>
        </div>
        <div
        className="create__add"
        onClick={this.props.buttonText === 'Add board' ? this.handleAddBoardClick : this.handleAddListClick}>
          <SquaredPlus width={30} height={30}/>
        </div>
      </div>
    );
  }
}

CreateBoardOrList.propTypes = {
  handleCloseButtonClick: PropTypes.func.isRequired,
  addBoard: PropTypes.func,
  groupName: PropTypes.string.isRequired,
  boardId: PropTypes.string,
  addList: PropTypes.func,
  buttonText: PropTypes.string.isRequired,
};

export default CreateBoardOrList;
