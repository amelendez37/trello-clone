import React from 'react';
import PropTypes from 'prop-types';

import CircleLeft from '../../../public/img/circle-left.svg';

const SidebarLeft = props => (
  <div className="inner__sidebar--1">
    <button className="inner__sidebar--1-back-btn" onClick={props.manageView}>
      <CircleLeft />
    </button>
  </div>
);

SidebarLeft.propTypes = {
  manageView: PropTypes.func.isRequired,
};

export default SidebarLeft;
