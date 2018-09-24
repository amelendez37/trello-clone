import React from 'react';
import { shallow } from 'enzyme';
import SidebarRight from './sidebarRight.jsx';

const props = {
  groupName: 'test group',
  view: 'boards',
};

test('should render add list button when view is set to "lists"', () => {
  const allProps = Object.assign({}, props, {
    view: 'lists',
  });
  const component = shallow(<SidebarRight {...allProps} />);

  expect(component.find('.inner__sidebar--2-add-btn').text()).toBe('Add list');
});

test('should render add board button when view is NOT "lists"', () => {
  const component = shallow(<SidebarRight {...props} />);

  expect(component.find('.inner__sidebar--2-add-btn').text()).toBe('Add board');
});

test('should call handleAddButtonClick when add list/board button clicked', () => {
  const spy = jest.spyOn(SidebarRight.prototype, 'handleAddButtonClick');
  const allProps = Object.assign({}, props, {
    view: 'lists',
  });
  const component = shallow(<SidebarRight {...allProps} />);
  component.find('.inner__sidebar--2-add-btn').simulate('click');

  expect(spy).toHaveBeenCalledTimes(1);
});

test('should render CreateBoardOrList component when add board/list button clicked', () => {
  const component = shallow(<SidebarRight {...props} />);
  component.find('.inner__sidebar--2-add-btn').simulate('click');

  expect(component.find('CreateBoardOrList').length).toBe(1);
});
