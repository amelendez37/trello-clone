import React from 'react';
import PropTypes from 'prop-types';

import Checkmark from '../../../public/img/checkmark.svg';
import './listItem.scss';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { completed: this.props.listItem.completed };

    this.toggleCompleted = this.toggleCompleted.bind(this);
  }

  renderListItemCompleted() {
    return (
      <div className="list-item complete" onClick={this.toggleCompleted}>
        <div className="checkmark"><Checkmark width={15} height={15} /></div>
        <p className="list-item__text">{this.props.listItem.text}</p>
      </div>
    );
  }

  renderListItemIncomplete() {
    return (
      <div className="list-item incomplete" onClick={this.toggleCompleted}>
        <div className="checkmark"><Checkmark width={15} height={15} /></div>
        <p className="list-item__text">{this.props.listItem.text}</p>
      </div>
    );
  }

  toggleCompleted() {
    this.setState({ completed: !this.state.completed });
  }

  render() {
    return (
      this.state.completed ? this.renderListItemCompleted() : this.renderListItemIncomplete()
    );
  }
}

ListItem.propTypes = { listItem: PropTypes.object.isRequired };

export default ListItem;
