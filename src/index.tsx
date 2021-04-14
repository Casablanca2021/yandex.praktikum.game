import 'semantic-ui-css/semantic.min.css';
import './app.css';

import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from 'store';
import history from 'store/history';

import { App } from './components/App';
import { ErrorBoundary } from './components/ErrorBoundary';

ReactDom.render(
  <ErrorBoundary>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);
