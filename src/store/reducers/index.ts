import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from '../history';
import auth from './auth';
import user from './user';

const router = combineReducers({
  router: connectRouter(history),
  auth,
  user,
});

export default router;
