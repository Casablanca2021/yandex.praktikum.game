import { routerMiddleware } from 'connected-react-router';
import { Request, Response } from 'express';
import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { App } from '../src/components/App';
import history from '../src/store/history';
import reducer from '../src/store/reducers';
import { renderObject } from './utils/renderObject';

function getPageHtml(req: Response, context: Response): JSX.Element {
  const enhancer = applyMiddleware(thunk, routerMiddleware(history));

  // Здесь надо проверить авторизацию
  const store = createStore(reducer, { auth: true }, enhancer);
  const state = store.getState();

  const data = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );

  return (
    <html lang="ru">
      <head>
        <link rel="stylesheet" href="/main.css" />
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: data }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ = ${renderObject(state)}`,
          }}
        />
        <script src="/index.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `Client.default();`,
          }}
        />
      </body>
    </html>
  );
}

export default (req: Request, context: Response): string => renderToStaticMarkup(getPageHtml(req, context));
