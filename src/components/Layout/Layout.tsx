import React, { FC } from 'react';
import { Container, Header } from 'semantic-ui-react';
import MainMenu from 'components/MainMenu';
import './Layout.css';
import { t } from 'common/dictionary';
import { Link } from  'react-router-dom';
import { ROUTES } from 'common/consts';
import { OwnProps } from './types';

const Layout: FC<OwnProps> = (props) => {

  const {transparent, children} = props;

  return <div className="layout">
    <Container>
      <Link to = {ROUTES.ROOT} className="layout__app-name">{t('appName')}</Link>
      <MainMenu />
      { props.title && <Header as='h1' className="layout__header">{props.title}</Header> }
      <div className={`layout__main main ${transparent ? 'main_transparent' : ''}`}>
        {children}

      </div>
    </Container>
  </div>;
};
export default Layout;