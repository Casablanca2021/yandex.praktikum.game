import { Auth } from 'api/auth';
import { SignInData, SignUpData } from 'api/types';
import { push } from 'connected-react-router';
import { AppThunkAction } from '../types';
import { ROUTES } from 'common/consts';
import { setNotificationError } from 'utils/notifications';
import { getUserAction } from './user';
import { LOG_OUT, SET_AUTH, SIGN_IN, SIGN_UP } from 'store/consts';

export const setAuth = (payload: boolean) => ({ type: SET_AUTH, payload });

export const signInAction = (data: SignInData): AppThunkAction<string> => async (dispatch) => {
  dispatch({ type: SIGN_IN });

  try {
    await Auth.signIn(data);

    dispatch(getUserAction());
    dispatch(push(ROUTES.HOME));
  } catch (error) {
    setNotificationError(error);
  }
};

export const signUpAction = (data: SignUpData): AppThunkAction<string> => async (dispatch) => {
  dispatch({ type: SIGN_UP });

  try {
    await Auth.signUp(data);

    dispatch(getUserAction());
    dispatch(push(ROUTES.GAME));
  } catch (error) {
    setNotificationError(error);
  }
};

export const logOutAction = (): AppThunkAction<string> => async (dispatch) => {
  dispatch({ type: LOG_OUT });

  try {
    await Auth.logOut();

    dispatch(setAuth(false));
    dispatch(push(ROUTES.SIGNIN));
  } catch (error) {
    setNotificationError(error);
  }
};
