import React from 'react';
import PropTypes from 'prop-types';

import Board from '../board/board.jsx';
import List from '../list/list.jsx';

const Content = (props) => {
  const renderBoards = () => (
    props.boards.map(
      board => <Board
                key={board._id}
                boardId={board._id}
                boardName={board.boardName}
                lists={board.lists}
                groupName={props.groupName}
                handleBoardClick={props.handleBoardClick}
                />,
    )
  );

  const renderLists = () => (
    props.selectedBoard.lists.map(
      list => <List
               key={list._id}
               groupName={props.groupName}
               boardId={props.selectedBoard._id}
               listId={list._id}
               listName={list.listName}
               listItems={list.listItems}
               />,
    )
  );

  return (
    <ul className="inner__list">
      {props.view === 'lists' ? renderLists() : renderBoards()}
    </ul>
  );
};

Content.propTypes = {
  groupName: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
  selectedBoard: PropTypes.object,
  boards: PropTypes.array,
  handleBoardClick: PropTypes.func,
};

export default Content;
