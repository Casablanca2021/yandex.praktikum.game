import './Layout.css';

import { ROUTES } from 'common/consts';
import { t } from 'common/dictionary';
import MainMenu from 'components/MainMenu';
import React, { FC, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { Container, Header } from 'semantic-ui-react';

import { OwnProps } from './types';

const Layout: FC<OwnProps> = (props: PropsWithChildren<OwnProps>) => {
  const { className, verticalAlign, title, transparent, children } = props;

  return (
    <div className={`layout ${className ?? ''}`}>
      <Container className={verticalAlign ? 'layout__container_valign' : ''}>
        <div className="layout__app-name-wrapper">
          <Link to={ROUTES.ROOT} className="layout__app-name" data-highlightword={t('appName').split(' ')[0]}>
            {t('appName')}
          </Link>
        </div>
        <MainMenu />
        {title && (
          <Header as="h1" className="layout__header">
            {title}
          </Header>
        )}
        <div className={`layout__main main ${transparent ? 'main_transparent' : ''}`}>{children}</div>
      </Container>
    </div>
  );
};
export default Layout;
