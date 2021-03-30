import React, { FC } from 'react';
import { Menu } from 'semantic-ui-react';
import { useLocation, useHistory } from 'react-router';
import { ROUTES } from 'common/consts';
import { t } from 'common/dictionary';
import './MainMenu.css';

const MainMenu: FC = () => {
  let activeItem = useLocation().pathname;
  let history = useHistory();

  let handleClick = (path: string) => () => history.push(path);

  let items = [
    {
      name: t('homeTitle'),
      path: ROUTES.HOME,
    },
    {
      name: t('forumTitle'),
      path: ROUTES.FORUM,
    },
  ];

  return <Menu className="main-menu layout__main-menu">
    {items.map((item, key) => {
      return <Menu.Item
        className="main-menu__item"
        key={'unique' + key.toString()}
        active={activeItem === item.path}
        onClick={handleClick(item.path)}
      >{item.name}</Menu.Item>;
    })}
    <Menu.Menu position='right'>
      <Menu.Item
        className="main-menu__item"
        name={t('signinButton')}
        onClick={handleClick(ROUTES.SIGNIN)}
      />
      <Menu.Item
        className="main-menu__item"
        name={t('signupButton')}
        onClick={handleClick(ROUTES.SIGNUP)}
      />
    </Menu.Menu>
  </Menu>;
};
export default MainMenu;