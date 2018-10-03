import React from 'react';
import { shallow } from 'enzyme';
import { HomePageNotDecorated } from './homePage.jsx';

const props = {
  location: {
    state: {
      data: {
        boards: [],
        groupName: 'test group',
      },
    },
  },
  history: {},
};

test('Should render a container div', () => {
  const component = shallow(<HomePageNotDecorated {...props} />);

  expect(component.find('.container').length).toBe(1);
});

test('Should render Sidebar and Content sub components', () => {
  const component = shallow(<HomePageNotDecorated {...props} />);

  expect(component.find('Sidebar').length).toBe(1);
  expect(component.find('Content').length).toBe(1);
});
