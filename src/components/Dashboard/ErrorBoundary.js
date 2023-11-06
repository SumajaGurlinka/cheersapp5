import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    console.error(error, errorInfo);
    // You can log the error to a service or display an error message here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          {/* You can provide a custom error message or a fallback component here */}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
