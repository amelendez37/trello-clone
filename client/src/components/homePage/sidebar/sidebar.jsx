import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import CreateBoardOrList from '../../createBoardOrList/createBoardOrList.jsx';

class Sidebar extends React.Component {
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
   * @param {String} innerHTML
   */
  renderAddButton(innerHTML) {
    return (
      <button
      className="inner__sidebar-btn inner__sidebar-btn--add"
      onClick={this.handleAddButtonClick}>
      &#43; {innerHTML}
      </button>
    );
  }

  renderCreateBoardOrList() {
    return (
      <CSSTransition
      in={this.state.addButtonClicked}
      timeout={150}
      classNames="expand"
      unmountOnExit
      >
        <CreateBoardOrList
          key={'createBoardOrList'}
          groupName={this.props.groupName}
          handleCloseButtonClick={this.handleCloseButtonClick}
          addList={this.props.addList}
          addBoard={this.props.addBoard}
          boardId={this.props.selectedBoard ? this.props.selectedBoard._id : null}
          buttonText={this.props.view === 'lists' ? 'list' : 'board'}
        />
      </CSSTransition>
    );
  }

  render() {
    return (
      <div className="inner__sidebar">
        <button className="inner__sidebar-btn inner__sidebar-btn--back" onClick={this.props.manageView}>&larr; back</button>
        {this.props.view === 'lists' ? this.renderAddButton('list') : this.renderAddButton('board')}
        {this.renderCreateBoardOrList()}
      </div>
    );
  }
}

Sidebar.propTypes = {
  groupName: PropTypes.string.isRequired,
  manageView: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
  selectedBoard: PropTypes.object,
  addList: PropTypes.func,
  addBoard: PropTypes.func,
};

export default Sidebar;
