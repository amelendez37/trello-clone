import React from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash.flow';

import ItemTypes from '../../itemTypes';
import './board.scss';

const boardSource = {
  beginDrag(props) {
    return {
      boardId: props.boardId,
      index: props.index,
    };
  },
};

const boardTarget = {
  hover(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Dont replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Move the board
    props.moveBoard(dragIndex, hoverIndex);
    // Mutating monitor for improved performance
    monitor.getItem().index = hoverIndex; // eslint-disable-line no-param-reassign
  },
};

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

function collectTarget(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardName: this.props.boardName || '',
      lists: this.props.lists || [],
    };
  }

  render() {
    const {
      connectDragSource,
      connectDropTarget,
      isDragging,
    } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(
      connectDropTarget(
        <div className="board" style={{ opacity }} onClick={this.props.handleBoardClick}>
          <h2 className="board__title" data-id={this.props.boardId}>{this.state.boardName}</h2>
        </div>,
      ),
    );
  }
}

Board.propTypes = {
  groupName: PropTypes.string.isRequired,
  boardName: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
  lists: PropTypes.array.isRequired,
  handleBoardClick: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool,
  moveBoard: PropTypes.func.isRequired,
};

export default flow(
  DragSource(ItemTypes.BOARD, boardSource, collectSource),
  DropTarget(ItemTypes.BOARD, boardTarget, collectTarget),
)(Board);
