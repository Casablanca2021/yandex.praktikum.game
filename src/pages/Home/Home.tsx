import React, { PureComponent } from 'react';
import { Button } from 'semantic-ui-react';
import { t } from 'common';
import './Home.css';
import Layout from 'components/Layout';

export class Home extends PureComponent {
  render() : JSX.Element {
    return (
      <Layout className="home" transparent={true}>
          <Button color="green" className="home__button">{t('to_begin')}</Button>
      </Layout>
    );
  }
}
