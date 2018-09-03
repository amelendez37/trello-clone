import React from 'react';
import PropTypes from 'prop-types';

import Board from './board.jsx';
import CreateBoard from './createBoard.jsx';

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
      <div>
        <header>
          {this.state.groupName}
        </header>
        <ul>
          {this.state.addBoardClicked
            ? <CreateBoard
              closeBoard={this.handleCloseBoardClick}
              addBoard={this.addBoard}
              groupName={this.state.groupName}
              /> : null}
          {this.renderBoards()}
        </ul>
        {this.state.addBoardClicked
          ? null : <button onClick={this.handleAddBoardClick}>Add new Board</button>}
      </div>
    );
  }
}

BoardPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default BoardPage;
