import React from 'react';
import PropTypes from 'prop-types';

import List from '../lists/list.jsx';
import CreateList from '../lists/createList.jsx';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.boardTitle || '',
      lists: this.props.lists || [],
    };

    this.renderLists = this.renderLists.bind(this);
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

  addList(list) {
    const { lists } = this.state;
    lists.push(list);
    this.setState({ lists });
  }

  render() {
    return (
      <div>
        <h2>{this.state.boardTitle || null}</h2>
        <ul>
          {this.renderLists(this.state.lists)}
          <CreateList
          addList={this.addList}
          groupName={this.props.groupName}
          boardId={this.props.boardId}
          />
        </ul>
      </div>
    );
  }
}

Board.propTypes = {
  groupName: PropTypes.string.isRequired,
  boardTitle: PropTypes.string,
  boardId: PropTypes.string,
  lists: PropTypes.array.isRequired,
};

export default Board;
