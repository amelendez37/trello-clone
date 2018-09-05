import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import ListItem from '../listItem/listItem.jsx';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems: this.props.listItems || [],
      input: '',
    };

    this.renderListItems = this.renderListItems.bind(this);
    this.addListItem = this.addListItem.bind(this);
    this.handleListItemAdd = this.handleListItemAdd.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  renderListItems() {
    return this.state.listItems.map(
      listItem => <ListItem key={listItem._id} listItem={listItem} />,
    );
  }

  async handleListItemAdd(e) {
    if (e.key === 'Enter') {
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

      this.addListItem(res.data);
    }
  }

  addListItem(listItem) {
    const { listItems } = this.state;
    listItems.push(listItem);
    this.setState({ listItems });
  }

  handleInputChange(e) {
    this.setState({ input: e.target.value });
  }

  render() {
    return (
      <div>
        <h2>{this.props.listName}</h2>
        <input
        placeholder="Add task"
        onChange={this.handleInputChange}
        onKeyPress={this.handleListItemAdd}
        >
        </input>
        <ul>
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
  listName: PropTypes.string,
  listItems: PropTypes.array.isRequired,
};

export default List;
