import React from 'react';
import PropTypes from 'prop-types';

import List from '../list/list.jsx';
import './board.scss';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardName: this.props.boardName || '',
      lists: this.props.lists || [],
    };

    this.renderLists = this.renderLists.bind(this);
    this.handleBoardClick = this.handleBoardClick.bind(this);
    this.addList = this.addList.bind(this);
  }

  renderLists() {
    const { groupName, boardId } = this.props;

    return this.state.lists.map(
      list => <List
              key={list._id}
              groupName={groupName}
              boardId={boardId}
              listId={list._id}
              listName={list.listName}
              listItems={list.listItems}
              />,
    );
  }

  handleBoardClick() {
    console.log('clicked');
  }

  addList(list) {
    const { lists } = this.state;
    lists.push(list);
    this.setState({ lists });
  }

  render() {
    return (
      <div className="board" onClick={this.handleBoardClick}>
        <h2 className="board__title">{this.state.boardName}</h2>
      </div>
    );
  }
}

Board.propTypes = {
  groupName: PropTypes.string.isRequired,
  boardName: PropTypes.string.isRequired,
  boardId: PropTypes.string,
  lists: PropTypes.array.isRequired,
};

export default Board;
