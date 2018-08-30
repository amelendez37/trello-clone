import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: error });
    this.setState({ errorInfo: info });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.object.isRequired,
};

export default ErrorBoundary;
