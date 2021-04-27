import 'semantic-ui-css/semantic.min.css';
import './app.css';

import { App } from 'components/App';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from 'store';
import history from 'store/history';

const startServiceWorker = () => {
  if (window.navigator && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .catch((err) => {
          console.error(err);
        });
    });
  }
};

startServiceWorker();

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
