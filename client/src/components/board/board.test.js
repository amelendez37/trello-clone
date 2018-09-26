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
  deleteBoardFromState: jest.fn(),
  handleBoardClick: jest.fn(),
};

test('should call handleBoardClick when clicked', () => {
  const mock = jest.fn();
  const allProps = Object.assign({}, props, {
    handleBoardClick: mock,
  });
  const component = shallow(<BoardNotDecorated {...allProps} />);
  component.find('.board').simulate('click');

  expect(mock).toHaveBeenCalledTimes(1);
});

test('should call deleteBoard when clicked', () => {
  const spy = jest.spyOn(BoardNotDecorated.prototype, 'deleteBoard');
  const component = shallow(<BoardNotDecorated {...props} />);
  component.find('.board__delete').simulate('click');

  expect(spy).toHaveBeenCalledTimes(1);
});
