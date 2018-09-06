import React from 'react';
import PropTypes from 'prop-types';

// import List from '../list/list.jsx';
import './board.scss';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardName: this.props.boardName || '',
      lists: this.props.lists || [],
    };

    this.addList = this.addList.bind(this);
  }

  addList(list) {
    const { lists } = this.state;
    lists.push(list);
    this.setState({ lists });
  }

  render() {
    return (
      <div className="board" onClick={this.props.handleBoardClick}>
        <h2 className="board__title" data-id={this.props.boardId}>{this.state.boardName}</h2>
      </div>
    );
  }
}

Board.propTypes = {
  groupName: PropTypes.string.isRequired,
  boardName: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
  lists: PropTypes.array.isRequired,
  handleBoardClick: PropTypes.func.isRequired,
};

export default Board;
