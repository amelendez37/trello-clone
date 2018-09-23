import React from 'react';
import { shallow } from 'enzyme';
import SidebarLeft from './sidebarLeft.jsx';

test('calls manageView function when clicked', () => {
  const mockFunc = jest.fn();
  const component = shallow(<SidebarLeft manageView={mockFunc} />);
  component.find('button').simulate('click');

  expect(mockFunc).toHaveBeenCalledTimes(1);
});
