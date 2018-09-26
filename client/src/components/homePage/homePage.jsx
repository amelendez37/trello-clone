import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import SidebarLeft from './sidebarLeft/sidebarLeft.jsx';
import SidebarRight from './sidebarRight/sidebarRight.jsx';
import Content from './content/content.jsx';
import './homePage.scss';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: this.props.location.state.data.boards || [],
      selectedBoard: null,
      view: 'boards', // options: 'boards' or 'lists'
    };

    this.moveBoard = this.moveBoard.bind(this);
    this.manageView = this.manageView.bind(this);
    this.handleBoardClick = this.handleBoardClick.bind(this);
    this.addBoard = this.addBoard.bind(this);
    this.addList = this.addList.bind(this);
    this.deleteListFromState = this.deleteListFromState.bind(this);
    this.deleteBoardFromState = this.deleteBoardFromState.bind(this);
  }

  moveBoard(dragIndex, hoverIndex) {
    const { groupName } = this.props.location.state.data;
    const { boards } = this.state;

    const updatedBoards = boards.slice(0);
    const temp = updatedBoards[dragIndex];
    updatedBoards[dragIndex] = updatedBoards[hoverIndex];
    updatedBoards[hoverIndex] = temp;

    this.setState({ boards: updatedBoards }, async () => {
      await axios.patch(`${process.env.API_URL}/api/group/updateBoards`, {
        groupName,
        updatedBoards,
      });
    });
  }

  manageView() {
    if (this.state.view === 'boards') {
      this.props.history.push({ pathname: '/' });
    } else if (this.state.view === 'lists') {
      this.setState({ view: 'boards' });
    }
  }

  /**
   * Called within Board component
   * @param {Object} event
   */
  handleBoardClick(e) {
    if (['title', 'card'].includes(e.target.dataset.name)) {
      const { id } = e.target.dataset;
      const board = this.state.boards.find(b => b._id === id);
      this.setState({
        selectedBoard: board,
        view: 'lists',
      });
    }
  }

  /**
   * Called within CreateBoardOrList component
   * @param {Object} board
   */
  addBoard(board) {
    const { boards } = this.state;
    boards.push(board);
    this.setState({ boards });
  }

  /**
   * Called within CreateBoardOrList component
   * @param {Object} list
   */
  addList(list) {
    const { lists } = this.state.selectedBoard;
    lists.push(list);
    this.setState({ lists });
  }

  /**
   * Called within List component
   * @param {String} listId
   */
  deleteListFromState(listId) {
    const { selectedBoard } = this.state;
    selectedBoard.lists = selectedBoard.lists.filter(list => list._id !== listId);
    this.setState({ selectedBoard });
  }

  /**
   * Called within Board component
   * @param {boardId} boardId
   */
  deleteBoardFromState(boardId) {
    const { boards } = this.state;
    const updatedBoards = boards.filter(board => board._id !== boardId);
    this.setState({ boards: updatedBoards });
  }

  render() {
    const { groupName } = this.props.location.state.data;

    return (
      <div className="container">
        <h1 className="container__groupname">{groupName}</h1>
        <div className="inner">
          <div className="inner__boards">
            <SidebarLeft manageView={this.manageView} />
            <SidebarRight
             groupName={groupName}
             view={this.state.view}
             selectedBoard={this.state.selectedBoard}
             addList={this.addList}
             addBoard={this.addBoard}
            />
            <Content
             groupName={groupName}
             view={this.state.view}
             selectedBoard={this.state.selectedBoard}
             boards={this.state.boards}
             handleBoardClick={this.handleBoardClick}
             moveBoard={this.moveBoard}
             deleteListFromState={this.deleteListFromState}
             deleteBoardFromState={this.deleteBoardFromState}
            />
          </div>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default DragDropContext(HTML5Backend)(HomePage);
// export non decorated component for tests
export const HomePageNotDecorated = HomePage;
