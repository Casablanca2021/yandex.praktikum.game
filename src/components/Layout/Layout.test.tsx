import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import store from 'store';
import history from 'store/history';
import { ConnectedRouter } from 'connected-react-router';
import Layout from 'components/Layout/Layout';

describe(`Layout Component`, () => {
  it(`renders correctly`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Layout>
              <div>Hello world</div>
            </Layout>
          </ConnectedRouter>
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders correctly with some props`, () => {
    const props = {
      title: 'Title',
    }

    const tree = renderer
      .create(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Layout {...props}>
              <div>Hello world</div>
            </Layout>
          </ConnectedRouter>
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders correctly with title prop`, () => {
    const props = {
      title: 'Title',
    }

    const tree = renderer
      .create(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Layout {...props}>
              <div>Hello world</div>
            </Layout>
          </ConnectedRouter>
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders correctly with all props`, () => {
    const props = {
      title: 'Title',
      transparent: true,
      className: 'class-name',
      verticalAlign: true,
    }

    const tree = renderer
      .create(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Layout {...props}>
              <div>Hello world</div>
            </Layout>
          </ConnectedRouter>
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
