import React from 'react';
import PropTypes from 'prop-types';

import Board from '../board/board.jsx';
import CreateBoard from '../createBoard/createBoard.jsx';
import CircleLeft from '../../../public/img/circle-left.svg';
import './boardPage.scss';

class BoardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addBoardClicked: false,
      boards: this.props.location.state.data.boards || [],
      groupName: this.props.location.state.data.groupName,
    };

    this.handleAddBoardClick = this.handleAddBoardClick.bind(this);
    this.handleCloseBoardClick = this.handleCloseBoardClick.bind(this);
    this.addBoard = this.addBoard.bind(this);
    this.renderBoards = this.renderBoards.bind(this);
  }

  handleAddBoardClick() {
    this.setState({ addBoardClicked: true });
  }

  handleCloseBoardClick() {
    this.setState({ addBoardClicked: false });
  }

  addBoard(board) {
    const { boards } = this.state;
    boards.push(board);
    this.setState({ boards });
  }

  renderBoards() {
    return this.state.boards.map(
      board => <Board
               key={board._id}
               boardId={board._id}
               groupName={this.state.groupName}
               boardTitle={board.title}
               lists={board.lists}
               />,
    );
  }

  render() {
    return (
      <div className="container">
        <div className="inner">
          <div className="inner__boards">
            <div className="inner__sidebar--1">
              <button className="inner__sidebar--1-back-btn">
                <CircleLeft />
              </button>
            </div>
            <div className="inner__sidebar--2">
              <p className="inner__sidebar--2-groupname">{this.state.groupName}</p>
              {this.state.addBoardClicked ? null : <button
                                                   className="inner__sidebar--2-add-btn"
                                                   onClick={this.handleAddBoardClick}>
                                                   Add board
                                                   </button>}
            </div>
            <ul className="inner__list">
              {this.state.addBoardClicked
                ? <CreateBoard
                  closeBoard={this.handleCloseBoardClick}
                  addBoard={this.addBoard}
                  groupName={this.state.groupName}
                  /> : null}
              {this.renderBoards()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

BoardPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default BoardPage;
