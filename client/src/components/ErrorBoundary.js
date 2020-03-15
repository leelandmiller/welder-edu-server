import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: ''
  };

  componentDidCatch(error) {
    // display fallback UI
    this.setState(Object.assign({}, this.state, {
      hasError: true,
      error
    }));
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          Error.<br/>
          {this.state.error.message}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
