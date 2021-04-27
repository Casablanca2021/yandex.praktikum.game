import ForumList from 'components/ForumList';
import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import { Provider } from 'react-redux';
import * as renderer from 'react-test-renderer';
import store from 'store';
import history from 'store/history';

describe(`ForumList Component`, () => {
  it(`renders correctly`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <ForumList
              items={[
                {
                  active: true,
                  category: 'cat 1',
                  date: '21.03.2015',
                  name: 'TEST',
                  createdBy: 'me',
                  answersCount: 5,
                  id: 1,
                },
                {
                  active: false,
                  category: 'cat 2',
                  date: '21.01.2015',
                  name: 'TEST 2',
                  createdBy: 'me',
                  answersCount: 5,
                  id: 2,
                },
                {
                  active: true,
                  category: 'cat 3',
                  date: '21.01.2011',
                  name: 'TEST 3',
                  createdBy: 'Arnold',
                  answersCount: 15,
                  id: 2,
                },
              ]}
            />
          </ConnectedRouter>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
