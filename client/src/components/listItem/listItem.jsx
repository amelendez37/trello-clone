import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash.flow';

import ItemTypes from '../../itemTypes';
import Checkmark from '../../../public/img/checkmark.svg';
import Bin from '../../../public/img/bin.svg';
import './listItem.scss';

const listItemSource = {
  beginDrag(props) {
    return {
      listItemId: props.listItem._id,
      index: props.index,
    };
  },
};

const listItemTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Dont replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Move the board
    props.moveListItem(dragIndex, hoverIndex);
    // Mutating monitor for improved performance
    monitor.getItem().index = hoverIndex; // eslint-disable-line no-param-reassign
  },
};

function collectSourceListItem(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

function collectTargetListItem(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: this.props.listItem.completed,
    };

    this.deleteListItem = this.deleteListItem.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.renderListItem = this.renderListItem.bind(this);
  }

  async deleteListItem() {
    const {
      groupName,
      boardId,
      listId,
      listItem,
    } = this.props;

    await axios.delete(`${process.env.API_URL}/api/listItem`, {
      data: {
        groupName,
        boardId,
        listId,
        listItemId: listItem._id,
      },
    });

    this.props.deleteListItemFromState(listItem._id);
  }

  toggleCompleted(e) {
    if (['item', 'check', 'text'].includes(e.target.dataset.name)) {
      const {
        groupName,
        boardId,
        listId,
        listItem,
      } = this.props;

      this.setState({ completed: !this.state.completed }, async () => {
        await axios.patch(`${process.env.API_URL}/api/listItem`, {
          groupName,
          boardId,
          listId,
          listItemId: listItem._id,
          completed: this.state.completed,
        });
      });
    }
  }

  /**
   * @param String - 'complete' or 'incomplete'
   */
  renderListItem(status) {
    const opacity = this.props.isDragging ? 0 : 1;

    return (
      <div className={`list-item ${status}`} style={{ opacity }} data-name="item" onClick={this.toggleCompleted}>
        <div className="checkmark-icon" data-name="check">
          <Checkmark width={15} height={17} />
        </div>
        <p className="list-item__text" data-name="text">{this.props.listItem.text}</p>
        <div className="trash-icon" onClick={this.deleteListItem}>
          <Bin data-id={this.props.listItem._id} width={20} height={20} />
        </div>
      </div>
    );
  }

  render() {
    const { connectDragSource, connectDropTarget } = this.props;

    return connectDragSource(
      connectDropTarget(
        (
          this.state.completed ? this.renderListItem('complete') : this.renderListItem('incomplete')
        ),
      ),
    );
  }
}

ListItem.propTypes = {
  listItem: PropTypes.object.isRequired,
  groupName: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
  deleteListItemFromState: PropTypes.func.isRequired,
  isDragging: PropTypes.bool,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};

export default flow(
  DragSource(ItemTypes.LIST_ITEM, listItemSource, collectSourceListItem),
  DropTarget(ItemTypes.LIST_ITEM, listItemTarget, collectTargetListItem),
)(ListItem);
export const ListItemNotDecorated = ListItem;
