import React from 'react';
import PropTypes from 'prop-types';

import CreateBoardOrList from '../createBoardOrList/createBoardOrList.jsx';

class SidebarRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = { addButtonClicked: false };

    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    this.handleCloseButtonClick = this.handleCloseButtonClick.bind(this);
  }

  handleAddButtonClick() { this.setState({ addButtonClicked: true }); }

  handleCloseButtonClick() { this.setState({ addButtonClicked: false }); }

  /**
   * Renders a button to either add a new board or list
   */
  renderAddButton(innerHTML) {
    return (
      <button
      className="inner__sidebar--2-add-btn"
      onClick={this.handleAddButtonClick}>
      {innerHTML}
      </button>
    );
  }

  render() {
    return (
      <div className="inner__sidebar--2">
        <h1 className="inner__sidebar--2-groupname">{this.props.groupName}</h1>
        {this.props.view === 'lists' ? this.renderAddButton('Add list') : this.renderAddButton('Add board')}

        {this.state.addButtonClicked
          ? <CreateBoardOrList
          handleCloseButtonClick={this.handleCloseButtonClick}
          addList={this.props.addList}
          addBoard={this.props.addBoard}
          groupName={this.props.groupName}
          boardId={this.props.selectedBoard ? this.props.selectedBoard._id : null}
          buttonText={this.props.view === 'lists' ? 'Add list' : 'Add board'}
          /> : null}
      </div>
    );
  }
}

SidebarRight.propTypes = {
  groupName: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
  selectedBoard: PropTypes.object,
  addList: PropTypes.func,
  addBoard: PropTypes.func,
};

export default SidebarRight;
