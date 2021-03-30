import React, { PureComponent } from 'react';
import { Button } from 'semantic-ui-react';
import { t } from 'common/dictionary';
import './Home.css';

class Home extends PureComponent {
  render() : JSX.Element {
    return (
      <div className="home">
        <div className="home__panel">
          <div>
            <p>Casablanca</p>
            <p>Racing</p>
          </div>
          <div className="home__panel-buttons">
            <Button color="green">{t('to_begin')}</Button>
            <div>
              <a href="/">{t('signinButton')}</a>
              /
              <a href="/">{t('signupButton')}</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
