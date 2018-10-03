import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from './sidebar.jsx';

const props = {
  groupName: 'test group name',
  view: 'boards',
  manageView: jest.fn(),
};

test('calls manageView function when clicked', () => {
  const mockFunc = jest.fn();
  const allProps = Object.assign({}, props, {
    view: 'lists',
    manageView: mockFunc,
  });
  const component = shallow(<Sidebar {...allProps} />);
  component.find('.inner__sidebar-btn--back').simulate('click');

  expect(mockFunc).toHaveBeenCalledTimes(1);
});

test('should render add list button when view is set to "lists"', () => {
  const allProps = Object.assign({}, props, {
    view: 'lists',
  });
  const component = shallow(<Sidebar {...allProps} />);

  expect(component.find('.inner__sidebar-btn--add').text()).toMatch('list');
});

test('should render add board button when view is NOT "lists"', () => {
  const component = shallow(<Sidebar {...props} />);

  expect(component.find('.inner__sidebar-btn--add').text()).toMatch('board');
});

test('should call handleAddButtonClick when add list/board button clicked', () => {
  const spy = jest.spyOn(Sidebar.prototype, 'handleAddButtonClick');
  const allProps = Object.assign({}, props, {
    view: 'lists',
  });
  const component = shallow(<Sidebar {...allProps} />);
  component.find('.inner__sidebar-btn--add').simulate('click');

  expect(spy).toHaveBeenCalledTimes(1);
});

test('should render CreateBoardOrList component when add board/list button clicked', () => {
  const component = shallow(<Sidebar {...props} />);
  component.find('.inner__sidebar-btn--add').simulate('click');

  expect(component.find('CreateBoardOrList').length).toBe(1);
});
