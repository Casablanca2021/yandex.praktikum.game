import { ConnectedRouter } from 'connected-react-router';
import LabelList from 'pages/Forum/components/LabelList/index';
import { Items } from 'pages/Forum/components/LabelList/types';
import * as React from 'react';
import { Provider } from 'react-redux';
import * as renderer from 'react-test-renderer';
import store from 'store';
import history from 'store/history';

describe(`LabelList Component`, () => {
  it(`renders correctly with some items`, () => {
    const items: Items = [
      {
        name: 'Test 1',
        path: '/test-1',
      },
      {
        name: 'Test 2',
        path: '/test-2',
      },
    ];

    const tree = renderer
      .create(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <LabelList items={items} />
          </ConnectedRouter>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders correctly with some other items`, () => {
    const items: Items = [
      {
        name: 'Test 1',
        path: '/test-1',
      },
      {
        name: 'Test 2',
        path: '/test-2',
      },
      {
        name: 'Test 3',
        path: '/test-3',
      },
    ];

    const tree = renderer
      .create(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <LabelList items={items} />
          </ConnectedRouter>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
