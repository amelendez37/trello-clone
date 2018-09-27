import React from 'react';
import Proptypes from 'prop-types';

import './transitionWrapper.scss';

const TransitionWrapper = props => (
  <div className="inline-block">
    {props.children}
  </div>
);

TransitionWrapper.propTypes = {
  children: Proptypes.object.isRequired,
};

export default TransitionWrapper;
