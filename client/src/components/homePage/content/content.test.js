import React from 'react';
import { shallow } from 'enzyme';
import Content from './content.jsx';

const props = {
  groupName: 'test group',
};

const exampleBoard = {
  _id: 'boardid123',
  boardName: 'test board',
  lists: [
    {
      _id: 'listid123',
      listName: 'test list',
      listItems: [
        {
          text: 'test list item',
          completed: false,
        },
      ],
    },
  ],
};

test('should always render an unordered list element', () => {
  const allProps = Object.assign({}, props, {
    view: 'lists',
    selectedBoard: exampleBoard,
  });
  const component = shallow(<Content {...allProps} />);

  expect(component.find('ul').length).toBe(1);
});

test('should render list cards when view prop is "lists"', () => {
  const allProps = Object.assign({}, props, {
    view: 'lists',
    selectedBoard: exampleBoard,
  });
  const component = shallow(<Content {...allProps} />);

  expect(component.find('List').length).toBeGreaterThan(0);
  expect(component.find('Board').length).toBe(0);
});

test('should render board cards when view prop is NOT "lists"', () => {
  const allProps = Object.assign({}, props, {
    view: 'boards',
    boards: [exampleBoard],
  });
  const component = shallow(<Content {...allProps} />);

  expect(component.find('List').length).toBe(0);
});
