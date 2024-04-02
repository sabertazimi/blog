import Paragraph from '@components/Paragraph'
import Result from '@components/Result'
import { Text } from '@components/Texts'
import type { ErrorInfo } from 'react'
import { Component } from 'react'

interface Props {
  children: JSX.Element
}

interface State {
  hasError: boolean
  error: Error
  errorInfo: ErrorInfo
}

class ErrorBoundary extends Component<Props, State> {
  readonly state: State = {
    hasError: false,
    error: Error('Error'),
    errorInfo: { componentStack: '' },
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      hasError: true,
      error,
      errorInfo,
    })
  }

  public render() {
    const { hasError, error } = this.state
    const { children } = this.props
    // eslint-disable-next-line node/prefer-global/process -- SWC/Webpack supports process.env.NODE_ENV.
    const isDevelopment = process.env.NODE_ENV === 'development'

    if (hasError && isDevelopment) {
      return (
        <Result status="error" title="Some Error Happened">
          <div role="alert">
            <Paragraph>
              <Text className="text-xl font-extrabold">
                Please check the following information:
              </Text>
            </Paragraph>
            <Paragraph>
              <Text>{`${error.message}.`}</Text>
            </Paragraph>
            <Paragraph>
              <Text>Please check terminal output for further details.</Text>
            </Paragraph>
            <Paragraph>
              <Text>Please reload this page after changing code.</Text>
            </Paragraph>
          </div>
        </Result>
      )
    }

    return children
  }
}

export default ErrorBoundary
