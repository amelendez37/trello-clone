import React from 'react';
import PropTypes from 'prop-types';

import List from '../lists/list.jsx';

const Board = (props) => {
  const renderLists = (lists) => {
    lists.map(list => <List key={list._id} listItems={list.listItems} />);
  };

  return (
    <div>
      <h2>{props.title}</h2>
      <ul>
        {renderLists(props.lists)}
      </ul>
    </div>
  );
};

Board.propTypes = {
  title: PropTypes.string.isRequired,
  lists: PropTypes.array.isRequired,
};

export default Board;
