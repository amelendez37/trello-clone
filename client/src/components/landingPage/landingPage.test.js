import React from 'react';
import { shallow } from 'enzyme';
import LandingPage from './landingPage.jsx';

test('should render application name', () => {
  const component = shallow(<LandingPage history={{}} />);

  expect(component.find('.inner__name').length).toBe(1);
});

test('should render input title', () => {
  const component = shallow(<LandingPage history={{}} />);

  expect(component.find('.inner__title').length).toBe(1);
});

test('should change input state on input field change', () => {
  const component = shallow(<LandingPage history={{}} />);
  component.find('input').simulate('change', { target: { value: 'testInput' } });

  expect(component.state('input')).toBe('testInput');
});

test('should call handleExistingClick on existing group button click', () => {
  const spy = jest.spyOn(LandingPage.prototype, 'handleExistingClick');
  const component = shallow(<LandingPage history={{}} />);
  component.find('.inner__btn--exist').simulate('click');

  expect(spy).toHaveBeenCalledTimes(1);
});

test('should call handleNewClick on new group button click', () => {
  const spy = jest.spyOn(LandingPage.prototype, 'handleNewClick');
  const component = shallow(<LandingPage history={{}} />);
  component.find('.inner__btn--new').simulate('click');

  expect(spy).toHaveBeenCalledTimes(1);
});

test('should render error message when groupNameError state is set', () => {
  const component = shallow(<LandingPage history={{}} />);

  expect(component.find('.groupname-error').length).toBe(0);

  component.setState({ groupNameError: 'noExist' });

  expect(component.find('.groupname-error').length).toBe(1);
});
