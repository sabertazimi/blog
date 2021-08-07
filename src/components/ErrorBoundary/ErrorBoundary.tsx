import { Result, Typography } from 'antd';
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error;
  errorInfo: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  readonly state: State = {
    hasError: false,
    error: new Error(),
    errorInfo: { componentStack: '' },
  };

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });
  }

  public render(): ReactNode {
    const { hasError, error } = this.state;
    const { children } = this.props;
    const isDevelopment = process.env.NODE_ENV === 'development';

    if (hasError && isDevelopment) {
      return (
        <Result status="error" title="Some Error Happened">
          <div>
            <Typography.Paragraph>
              <Typography.Text className="text-xl font-extrabold">
                Please check the following information:
              </Typography.Text>
            </Typography.Paragraph>
            <Typography.Paragraph>
              <Typography.Text>{`${error.message}.`}</Typography.Text>
            </Typography.Paragraph>
            <Typography.Paragraph>
              <Typography.Text>
                Please check console output for further details.
              </Typography.Text>
            </Typography.Paragraph>
            <Typography.Paragraph>
              <Typography.Text>
                Please reload this page after changing code.
              </Typography.Text>
            </Typography.Paragraph>
          </div>
        </Result>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
