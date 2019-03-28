import React from 'react';
import { Message } from 'semantic-ui-react';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: '', info: '' };

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error,
      info,
    });
  }

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;
    const isDevelopment = process.env.NODE_ENV === 'development';

    if (hasError && isDevelopment) {
      return (
        <Message
          error
          icon="alarm"
          header="Some Error Happened"
          list={[
            `${error.message}.`,
            'Please check console output for further details.',
            'Please reload this page after changing code.',
          ]}
        />
      );
    }

    return children;
  }
}

export default ErrorBoundary;
