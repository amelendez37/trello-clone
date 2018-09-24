import React from 'react';
import { shallow } from 'enzyme';
import { BoardNotDecorated } from './board.jsx';

const props = {
  groupName: 'test group',
  boardName: 'test board',
  boardId: 'boardid123',
  lists: [],
  connectDragSource: el => el,
  connectDropTarget: el => el,
  moveBoard: jest.fn(),
};

test('Should call handleBoardClick when clicked', () => {
  const mock = jest.fn();
  const allProps = Object.assign({}, props, {
    handleBoardClick: mock,
  });
  const component = shallow(<BoardNotDecorated {...allProps} />);
  component.find('.board').simulate('click');

  expect(mock).toHaveBeenCalledTimes(1);
});
