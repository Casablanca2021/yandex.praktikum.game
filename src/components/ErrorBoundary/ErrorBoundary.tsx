import { ROUTES } from 'common/consts';
import { t } from 'common/dictionary';
import React, { Component, ErrorInfo } from 'react';
import {
  Button, Header, Icon, Segment,
} from 'semantic-ui-react';
import './ErrorBoundary.css';

type ErrorState = {
  error?: Error;
  errorInfo?: ErrorInfo;
};

class ErrorBoundary extends Component<unknown, ErrorState> {
  constructor(props: unknown) {
    super(props);

    this.state = {};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    const { error, errorInfo } = this.state;
    const { children } = this.props;

    if (error || errorInfo) {
      return (
        <Segment placeholder>
          <Header icon>
            <Icon name="bolt" />
            {t('errorBoundaryMessage')}
          </Header>
          <Segment.Inline>
            <Button as="a" href={ROUTES.SIGNIN} primary>
              {t('errorBoundaryButton')}
            </Button>
          </Segment.Inline>
        </Segment>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
