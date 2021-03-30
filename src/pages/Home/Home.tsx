import React, { PureComponent } from 'react';
import { Button } from 'semantic-ui-react';
import { t } from 'common/dictionary';
import './Home.css';
import Layout from 'components/Layout';

class Home extends PureComponent {
  render() : JSX.Element {
    return (
      <Layout className="home" transparent={true}>
          <Button color="green" className="home__button">{t('to_begin')}</Button>
      </Layout>
    );
  }
}

export default Home;
