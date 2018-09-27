import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Board from '../../board/board.jsx';
import List from '../../list/list.jsx';
import TransitionWrapper from '../../transitionWrapper/transitionWrapper.jsx';
import '../homePage.scss';

const Content = (props) => {
  const renderBoards = () => (
    props.boards.map(
      ({ _id, boardName, lists }, i) => (
        <CSSTransition
          key={_id}
          in={true}
          timeout={{ enter: 225 }}
          appear={true}
          classNames="card-animate"
        >
          <TransitionWrapper classes="board-wrapper">
            <Board
              key={_id}
              boardId={_id}
              boardName={boardName}
              lists={lists}
              groupName={props.groupName}
              handleBoardClick={props.handleBoardClick}
              index={i}
              moveBoard={props.moveBoard}
              deleteBoardFromState={props.deleteBoardFromState}
            />
          </TransitionWrapper>
        </CSSTransition>
      ),
    )
  );

  const renderLists = () => (
    props.selectedBoard.lists.map(
      ({ _id, listName, listItems }) => (
        <CSSTransition
          key={_id}
          timeout={{ enter: 225 }}
          classNames="card-animate"
        >
          <List
            key={_id}
            groupName={props.groupName}
            boardId={props.selectedBoard._id}
            listId={_id}
            listName={listName}
            listItems={listItems}
            deleteListFromState={props.deleteListFromState}
          />
        </CSSTransition>
      ),
    )
  );

  return (
    <ul className="inner__list">
      <TransitionGroup>
        {props.view === 'lists' ? renderLists() : renderBoards()}
      </TransitionGroup>
    </ul>
  );
};

Content.propTypes = {
  groupName: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
  selectedBoard: PropTypes.object,
  boards: PropTypes.array,
  handleBoardClick: PropTypes.func,
  moveBoard: PropTypes.func,
  deleteListFromState: PropTypes.func,
  deleteBoardFromState: PropTypes.func,
};

export default Content;
