import React from 'react';
import { shallow } from 'enzyme';
import { ListItemNotDecorated } from './listItem.jsx';

const props = {
  groupName: 'test group',
  boardId: 'boardid123',
  listId: 'listid123',
  deleteListItemFromState: jest.fn(),
  isDragging: false,
  connectDragSource: jest.fn(),
  connectDropTarget: jest.fn(),
};

test('Should render list item as "completed" if state variable completed is true', () => {
  const allProps = Object.assign({}, props, {
    listItem: {
      text: 'test text',
      completed: true,
    },
  });
  const component = shallow(<ListItemNotDecorated {...allProps} />);
  const { completed } = component.state();
  const undecoratedComponent = component.instance().renderListItem(completed ? 'complete' : 'incomplete');

  expect(undecoratedComponent.props.className.includes('complete')).toBe(true);
});

test('Should render list item as "incomplete" if state variable completed is false', () => {
  const allProps = Object.assign({}, props, {
    listItem: {
      text: 'test text',
      completed: false,
    },
  });
  const component = shallow(<ListItemNotDecorated {...allProps} />);
  const { completed } = component.state();
  const undecoratedComponent = component.instance().renderListItem(completed ? 'complete' : 'incomplete');

  expect(undecoratedComponent.props.className.includes('incomplete')).toBe(true);
});
