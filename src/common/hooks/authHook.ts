import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import { getAuthSelector } from 'store/selectors';
import { ROUTES } from '../consts';

export const useAuth = () => {
  const history = useHistory();
  const isAuth = useSelector(getAuthSelector);
  const isSignInAndUp = [ROUTES.SIGNIN, ROUTES.SIGNUP].some(useRouteMatch);

  useLayoutEffect(() => {
    isAuth && isSignInAndUp && history.replace(ROUTES.HOME);
    !isAuth && !isSignInAndUp && history.replace(ROUTES.SIGNIN);
  }, [isAuth, isSignInAndUp]);
};
