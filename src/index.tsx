import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import ErrorBoundary from 'components/ErrorBoundary';
import 'semantic-ui-css/semantic.min.css';

ReactDom.render(
  <ErrorBoundary>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ErrorBoundary>,
  document.getElementById('root')
);
