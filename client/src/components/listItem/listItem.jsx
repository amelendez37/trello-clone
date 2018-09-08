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
    };

    this.deleteListItem = this.deleteListItem.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
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
    if (e.target.dataset.name !== 'bin') {
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

  renderListItemCompleted() {
    return (
      <div className="list-item complete" onClick={this.toggleCompleted}>
        <div className="checkmark-icon"><Checkmark width={15} height={17} /></div>
        <p className="list-item__text" data-id="text">{this.props.listItem.text}</p>
        <div className="trash-icon" onClick={this.deleteListItem}>
          <Bin data-name="bin" data-id={this.props.listItem._id} width={20} height={20} />
        </div>
      </div>
    );
  }

  renderListItemIncomplete() {
    return (
      <div className="list-item incomplete" onClick={this.toggleCompleted}>
        <div className="checkmark-icon"><Checkmark width={15} height={17} /></div>
        <p className="list-item__text">{this.props.listItem.text}</p>
        <div className="trash-icon" onClick={this.deleteListItem}>
          <Bin data-name="bin" data-id={this.props.listItem._id} width={20} height={20} />
        </div>
      </div>
    );
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
  deleteListItemFromState: PropTypes.func.isRequired,
};

export default ListItem;
