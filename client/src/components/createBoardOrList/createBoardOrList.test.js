import React from 'react';
import { shallow } from 'enzyme';
import CreateBoardOrList from './createBoardOrList.jsx';

const props = {
  groupName: 'test group',
  buttonText: 'Add board',
  handleCloseButtonClick: () => {},
};

test('Should call handleInputChange when change event occurs on input', () => {
  const component = shallow(<CreateBoardOrList {...props} />);
  component.find('input').simulate('change', { target: { value: 'test input' } });

  expect(component.state().title).toBe('test input');
});

test('Should call handleCloseButtonClick when close button clicked', () => {
  const mock = jest.fn();
  const allProps = Object.assign({}, props, { handleCloseButtonClick: mock });
  const component = shallow(<CreateBoardOrList {...allProps} />);
  component.find('.create__close').simulate('click');

  expect(mock).toHaveBeenCalledTimes(1);
});

test('Should call handleAddBoardClick when buttonText prop is "Add board" and add board button clicked', () => {
  const spy = jest.spyOn(CreateBoardOrList.prototype, 'handleAddBoardClick');
  const allProps = Object.assign({}, props, { buttonText: 'Add board' });
  const component = shallow(<CreateBoardOrList {...allProps} />);
  component.find('.create__add').simulate('click');

  expect(spy).toHaveBeenCalledTimes(1);
});

test('Should call handleAddListClick when buttonText prop is "Add list" and add list button clicked', () => {
  const spy = jest.spyOn(CreateBoardOrList.prototype, 'handleAddListClick');
  const allProps = Object.assign({}, props, { buttonText: 'Add list' });
  const component = shallow(<CreateBoardOrList {...allProps} />);
  component.find('.create__add').simulate('click');

  expect(spy).toHaveBeenCalledTimes(1);
});
