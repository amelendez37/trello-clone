import React from 'react';
import { shallow } from 'enzyme';
import { ListItemNotDecorated } from './listItem.jsx';
// import ListItem from './listItem.jsx';

const props = {
  groupName: 'test group',
  boardId: 'boardid123',
  listId: 'listid123',
  deleteListItemFromState: jest.fn(),
  connectDragSource: el => el,
  connectDropTarget: el => el,
};

test('Should render list item as "completed" if state variable completed is true', () => {
  const allProps = Object.assign({}, props, {
    listItem: {
      text: 'test text',
      completed: true,
    },
  });
  const component = shallow(<ListItemNotDecorated {...allProps} />);

  expect(component.find('.complete').length).toBe(1);
});

test('Should render list item as "incomplete" if state variable completed is false', () => {
  const allProps = Object.assign({}, props, {
    listItem: {
      text: 'test text',
      completed: false,
    },
  });
  const component = shallow(<ListItemNotDecorated {...allProps} />);

  expect(component.find('.incomplete').length).toBe(1);
});

test('Should call toggleCompleted when clicked', () => {
  const spy = jest.spyOn(ListItemNotDecorated.prototype, 'toggleCompleted');
  const allProps = Object.assign({}, props, {
    listItem: {
      text: 'test text',
      completed: false,
    },
  });
  const component = shallow(<ListItemNotDecorated {...allProps} />);
  component.find('.list-item').simulate('click', { target: { dataset: '' } });

  expect(spy).toHaveBeenCalledTimes(1);
});
