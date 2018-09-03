import React from 'react';
import PropTypes from 'prop-types';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { completed: this.props.listItem.completed };

    this.toggleCompleted = this.toggleCompleted.bind(this);
  }

  renderListItemCompleted() {
    return (
      <div className="completed" onClick={this.toggleCompleted}>
        <p>{this.props.listItem.text}</p>
      </div>
    );
  }

  renderListItemIncomplete() {
    return (
      <div className="incomplete" onClick={this.toggleCompleted}>
        <p>{this.props.listItem.text}</p>
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
