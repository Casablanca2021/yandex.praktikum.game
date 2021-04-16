import './MainMenu.css';

import { ROUTES } from 'common/consts';
import { t } from 'common/dictionary';
import { useThunkAction } from 'common/hooks/actionHooks';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { Menu } from 'semantic-ui-react';
import { logOutAction } from 'store/actions/auth';
import { getAuthSelector } from 'store/selectors';

const MainMenu: FC = () => {
  const activeItem = useLocation().pathname;
  const history = useHistory();
  const isAuth = useSelector(getAuthSelector);
  const logOut = useThunkAction(logOutAction);

  const handleSignInAndLogOut = () => {
    isAuth && logOut();
    history.push(ROUTES.SIGNIN);
  };

  const handleClick = (path: string) => () => history.push(path);

  const items = [
    {
      name: t('homeTitle'),
      path: ROUTES.HOME,
    },
    {
      name: t('profileTitle'),
      path: ROUTES.PROFILE,
    },
    {
      name: t('forumTitle'),
      path: ROUTES.FORUM,
    },
  ];

  return (
    <Menu className="main-menu layout__main-menu">
      {items.map((item, key) => (
        <Menu.Item
          className="main-menu__item"
          key={`unique${key.toString()}`}
          active={activeItem === item.path}
          onClick={handleClick(item.path)}
        >
          {item.name}
        </Menu.Item>
      ))}
      <Menu.Menu position="right">
        <Menu.Item className="main-menu__item" name={isAuth ? t('exit') : t('signinButton')} onClick={handleSignInAndLogOut} />
        {!isAuth && <Menu.Item className="main-menu__item" name={t('signupButton')} onClick={handleClick(ROUTES.SIGNUP)} />}
      </Menu.Menu>
    </Menu>
  );
};
export default MainMenu;
