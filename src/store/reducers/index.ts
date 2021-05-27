import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from '../history';
import auth from './auth';
import user from './user';
import ssr from './ssr';

const reducer = combineReducers({
  router: connectRouter(history),
  auth,
  user,
  ssr,
});

export default reducer;
