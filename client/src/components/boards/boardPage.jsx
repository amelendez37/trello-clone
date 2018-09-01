import React from 'react';
import PropTypes from 'prop-types';

import Board from './board.jsx';
import CreateBoard from './createBoard.jsx';

class BoardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addBoardClicked: false,
      newBoardTitle: '',
    };
    this.data = this.props.location.state.data;

    this.handleAddBoardClick = this.handleAddBoardClick.bind(this);
    this.handleCloseBoardClick = this.handleCloseBoardClick.bind(this);
    this.renderBoards = this.renderBoards.bind(this);
  }

  handleAddBoardClick() {
    this.setState({ addBoardClicked: true });
  }

  handleCloseBoardClick(e) {
    const { id } = e.target.dataset;

    if (!['create', 'add'].includes(id)) {
      this.setState({ addBoardClicked: false });
    }
  }

  renderBoards() {
    return this.data.boards.map(board => <Board key={board.id} />);
  }

  render() {
    return (
      <div onClick={this.handleCloseBoardClick}>
        <header>
          {this.data.groupName}
        </header>
        <div>
          {this.state.addBoardClicked ? <CreateBoard /> : null}
          {this.renderBoards()}
        </div>
        {this.state.addBoardClicked
          ? null : <button data-id="add" onClick={this.handleAddBoardClick}>Add new Board</button>}
      </div>
    );
  }
}

BoardPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default BoardPage;
