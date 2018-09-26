import React from 'react';
import { shallow } from 'enzyme';
import List from './list.jsx';

const props = {
  groupName: 'test group',
  boardId: 'boardid123',
  listId: 'listid123',
  listName: 'test lisst',
  listItems: [
    {
      _id: 'listitemid123',
      text: 'test list item',
      completed: false,
    },
  ],
  deleteListFromState: jest.fn(),
};

test('should change component state based on input change', () => {
  const component = shallow(<List {...props} />);
  component.find('input').simulate('change', { target: { value: 'test' } });

  expect(component.state().input).toBe('test');
});

test('should call handleListItemAdd on key press', () => {
  const spy = jest.spyOn(List.prototype, 'handleListItemAdd');
  const component = shallow(<List {...props} />);
  component.find('input').simulate('keypress', { target: { value: 'test' } });

  expect(spy).toHaveBeenCalledTimes(1);
});

test('should call deleteList when delete icon clicked', () => {
  const spyOn = jest.spyOn(List.prototype, 'deleteList');
  const component = shallow(<List {...props} />);
  component.find('.list__delete').simulate('click');

  expect(spyOn).toHaveBeenCalledTimes(1);
});
