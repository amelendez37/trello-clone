import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import ListItem from '../listItem/listItem.jsx';
import Cross from '../../../public/img/cross.svg';
import './list.scss';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems: this.props.listItems || [],
      input: '',
    };

    this.moveListItem = this.moveListItem.bind(this);
    this.renderListItems = this.renderListItems.bind(this);
    this.addListItemToState = this.addListItemToState.bind(this);
    this.deleteListItemFromState = this.deleteListItemFromState.bind(this);
    this.handleListItemAdd = this.handleListItemAdd.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.deleteList = this.deleteList.bind(this);
  }

  /**
   * Called within ListItem component
   * @param {Number} dragIndex
   * @param {Number} hoverIndex
   */
  moveListItem(dragIndex, hoverIndex) {
    const {
      groupName,
      boardId,
      listId,
    } = this.props;

    const updatedListItems = this.state.listItems.slice(0);
    const temp = updatedListItems[dragIndex];
    updatedListItems[dragIndex] = updatedListItems[hoverIndex];
    updatedListItems[hoverIndex] = temp;

    this.setState({ listItems: updatedListItems }, async () => {
      await axios.patch(`${process.env.API_URL}/api/list/updateListItems`, {
        groupName,
        boardId,
        listId,
        updatedListItems,
      });
    });
  }

  async handleListItemAdd(e) {
    if (e.key === 'Enter' && this.state.input) {
      e.target.value = '';
      const {
        groupName,
        boardId,
        listId,
      } = this.props;

      const res = await axios.post(`${process.env.API_URL}/api/listItem`, {
        groupName,
        boardId,
        listId,
        text: this.state.input,
      });

      this.addListItemToState(res.data);
    }
  }

  addListItemToState(listItem) {
    const { listItems } = this.state;
    listItems.push(listItem);
    this.setState({ listItems });
  }

  deleteListItemFromState(id) {
    let { listItems } = this.state;
    listItems = listItems.filter(item => item._id !== id);
    this.setState({ listItems });
  }

  async deleteList() {
    const {
      groupName,
      boardId,
      listId,
    } = this.props;

    await axios.delete(`${process.env.API_URL}/api/list`, {
      data: {
        groupName,
        boardId,
        listId,
      },
    });

    this.props.deleteListFromState(listId);
  }

  handleInputChange(e) {
    this.setState({ input: e.target.value });
  }

  renderListItems() {
    return this.state.listItems.map(
      (listItem, i) => <ListItem
                        key={listItem._id}
                        listItem={listItem}
                        index={i}
                        groupName={this.props.groupName}
                        boardId={this.props.boardId}
                        listId={this.props.listId}
                        deleteListItemFromState={this.deleteListItemFromState}
                        moveListItem={this.moveListItem}
                       />,
    );
  }

  render() {
    return (
      <div className="list">
        <h2 className="list__title">{this.props.listName}</h2>
        <div className="list__delete" onClick={this.deleteList}>
          <Cross width={25} height={25}/>
        </div>
        <input className="list__input"
        placeholder="Add task"
        onChange={this.handleInputChange}
        onKeyPress={this.handleListItemAdd}
        >
        </input>
        <ul className="list__items">
          {this.renderListItems()}
        </ul>
      </div>
    );
  }
}

List.propTypes = {
  groupName: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
  listName: PropTypes.string.isRequired,
  listItems: PropTypes.array.isRequired,
  deleteListFromState: PropTypes.func.isRequired,
};

export default List;
