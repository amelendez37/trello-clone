import React from 'react';
import PropTypes from 'prop-types';

import Board from '../board/board.jsx';
import CreateBoardOrList from '../createBoardOrList/createBoardOrList.jsx';
import List from '../list/list.jsx';
import CircleLeft from '../../../public/img/circle-left.svg';
import './boardPage.scss';

class BoardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addButtonClicked: false,
      boards: this.props.location.state.data.boards || [],
      groupName: this.props.location.state.data.groupName,
      selectedBoard: null,
    };

    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    this.handleCloseButtonClick = this.handleCloseButtonClick.bind(this);
    this.handleBoardClick = this.handleBoardClick.bind(this);
    this.addBoard = this.addBoard.bind(this);
    this.addList = this.addList.bind(this);
    this.renderAddButton = this.renderAddButton.bind(this);
    this.renderBoards = this.renderBoards.bind(this);
  }

  /**
   * Called in CreateBoardOrList componentes
   */
  handleAddButtonClick() { this.setState({ addButtonClicked: true }); }

  handleCloseButtonClick() { this.setState({ addButtonClicked: false }); }

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

  addList(list) {
    const { lists } = this.state.selectedBoard;
    lists.push(list);
    this.setState({ lists });
  }

  /**
   * Renders a button to either add a new board or list
   */
  renderAddButton(innerHTML) {
    return (
      <button
      className="inner__sidebar--2-add-btn"
      onClick={this.handleAddButtonClick}>
      {innerHTML}
      </button>
    );
  }

  renderLists() {
    let { lists } = this.state.selectedBoard;

    lists = lists.map(
      list => <List
              key={list._id}
              groupName={this.state.groupName}
              boardId={this.state.selectedBoard._id}
              listId={list._id}
              listName={list.listName}
              listItems={list.listItems}
              />,
    );

    return (
      <ul className="inner__list">
        {this.state.addButtonClicked
          ? <CreateBoardOrList
          closeCreateItem={this.handleCloseButtonClick}
          addList={this.addList}
          groupName={this.state.groupName}
          boardId={this.state.selectedBoard._id}
          buttonText={'Add list'}
          /> : null}
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
        {this.state.addButtonClicked
          ? <CreateBoardOrList
            closeCreateItem={this.handleCloseButtonClick}
            addBoard={this.addBoard}
            groupName={this.state.groupName}
            buttonText={'Add board'}
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
              {
                this.state.selectedBoard
                  ? this.renderAddButton('Add list') : this.renderAddButton('Add board')
              }
            </div>
              {
                this.state.selectedBoard
                  ? this.renderLists() : this.renderBoards()
              }
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
