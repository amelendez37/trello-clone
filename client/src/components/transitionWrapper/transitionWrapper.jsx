import React from 'react';
import Proptypes from 'prop-types';

import './transitionWrapper.scss';

/**
 * Used to wrap decorated components to prevent issues with css transitions
 */
const TransitionWrapper = props => (
  <div className={props.classes}>
    {props.children}
  </div>
);

TransitionWrapper.propTypes = {
  children: Proptypes.object.isRequired,
  classes: Proptypes.string,
};

export default TransitionWrapper;
