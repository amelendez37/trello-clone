import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Cross from '../../../public/img/cross.svg';
import SquaredPlus from '../../../public/img/squared-plus.svg';
import './createBoard.scss';

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
      <div className="create">
        <h3 className="create__title">Create board</h3>
        <input className="create__input" onChange={this.handleInputChange}></input>
        <div className="create__close" onClick={this.props.closeCreateBoard}>
          <Cross width={25} height={25}/>
        </div>
        <div className="create__add" onClick={this.handleAddBoardClick}>
          <SquaredPlus width={30} height={30}/>
        </div>
      </div>
    );
  }
}

CreateBoard.propTypes = {
  closeCreateBoard: PropTypes.func.isRequired,
  addBoard: PropTypes.func.isRequired,
  groupName: PropTypes.string.isRequired,
};

export default CreateBoard;
