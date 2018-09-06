import React from 'react';
import PropTypes from 'prop-types';

import Board from '../board/board.jsx';
import CreateBoard from '../createBoard/createBoard.jsx';
import List from '../list/list.jsx';
import CircleLeft from '../../../public/img/circle-left.svg';
import './boardPage.scss';

class BoardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addBoardClicked: false,
      boards: this.props.location.state.data.boards || [],
      groupName: this.props.location.state.data.groupName,
      selectedBoard: null,
    };

    this.handleAddBoardClick = this.handleAddBoardClick.bind(this);
    this.handleCloseBoardClick = this.handleCloseBoardClick.bind(this);
    this.handleBoardClick = this.handleBoardClick.bind(this);
    this.addBoard = this.addBoard.bind(this);
    this.renderAddBoardButton = this.renderAddBoardButton.bind(this);
    this.renderBoards = this.renderBoards.bind(this);
  }

  handleAddBoardClick() { this.setState({ addBoardClicked: true }); }

  handleCloseBoardClick() { this.setState({ addBoardClicked: false }); }

  /**
   * Called within Board component
   */
  handleBoardClick(e) {
    const { id } = e.target.dataset;
    const board = this.state.boards.find(b => b._id === id);
    this.setState({ selectedBoard: board });
  }

  addBoard(board) {
    const { boards } = this.state;
    boards.push(board);
    this.setState({ boards });
  }

  renderAddBoardButton() {
    return (
      <button
      className="inner__sidebar--2-add-btn"
      onClick={this.handleAddBoardClick}>
      Add board
      </button>
    );
  }

  renderLists() {
    let { lists } = this.state.selectedBoard;

    lists = lists.map(
      list => <List
              key={list._id}
              groupName={this.state.groupName}
              boardId={this.selectedBoard._id}
              listId={list._id}
              listName={list.listName}
              listItems={list.listItems}
              />,
    );

    return (
      <ul className="inner__list">
        {lists}
      </ul>
    );
  }

  renderBoards() {
    const boards = this.state.boards.map(
      board => <Board
                key={board._id}
                boardId={board._id}
                boardName={board.boardName}
                lists={board.lists}
                groupName={this.state.groupName}
                handleBoardClick={this.handleBoardClick}
                />,
    );

    return (
      <ul className="inner__list">
        {this.state.addBoardClicked
          ? <CreateBoard
            closeBoard={this.handleCloseBoardClick}
            addBoard={this.addBoard}
            groupName={this.state.groupName}
            /> : null}
        {boards}
      </ul>);
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
              <h1 className="inner__sidebar--2-groupname">{this.state.groupName}</h1>
              {this.state.addBoardClicked ? null : this.renderAddBoardButton()}
            </div>
            {this.state.selectedBoard ? this.renderLists() : this.renderBoards()}
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
