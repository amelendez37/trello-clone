import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


import Checkmark from '../../../public/img/checkmark.svg';
import Bin from '../../../public/img/bin.svg';
import './listItem.scss';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: this.props.listItem.completed,
      text: this.props.listItem.text,
    };

    this.toggleCompleted = this.toggleCompleted.bind(this);
  }

  renderListItemCompleted() {
    return (
      <div className="list-item complete" onClick={this.toggleCompleted}>
        <div className="checkmark-icon"><Checkmark width={15} height={15} /></div>
        <p className="list-item__text" data-id="text">{this.state.text}</p>
        <div className="delete-icon"><Bin/></div>
      </div>
    );
  }

  renderListItemIncomplete() {
    return (
      <div className="list-item incomplete" onClick={this.toggleCompleted}>
        <div className="checkmark-icon"><Checkmark width={15} height={15} /></div>
        <p className="list-item__text" data-id="text">{this.state.text}</p>
        <div className="delete-icon"><Bin/></div>
      </div>
    );
  }

  toggleCompleted() {
    const {
      groupName,
      boardId,
      listId,
    } = this.props;

    this.setState({ completed: !this.state.completed }, async () => {
      await axios.patch(`${process.env.API_URL}/api/listItem`, {
        groupName,
        boardId,
        listId,
        listItemId: this.props.listItem._id,
        completed: this.state.completed,
      });
    });
  }

  render() {
    return (
      this.state.completed ? this.renderListItemCompleted() : this.renderListItemIncomplete()
    );
  }
}

ListItem.propTypes = {
  listItem: PropTypes.object.isRequired,
  groupName: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
};

export default ListItem;
