import './SignIn.css';

import { InputChangeEvent, t } from 'common';
import Layout from 'components/Layout';
import React, { FC, memo, useState } from 'react';
import { Button, Container, Form, Header } from 'semantic-ui-react';
import { signInAction } from 'store/actions/auth';
import { validateLoginAndPassword } from 'utils';

import { FieldErrors } from './types';
import { useStringField } from 'common/hooks/formHooks';
import { useThunkAction } from 'common/hooks/actionHooks';

const SignIn: FC = memo(() => {
  const [login, handleChangeLogin] = useStringField('');
  const [password, handleChangePassword] = useStringField('');

  const [errors, setErrors] = useState<Partial<FieldErrors>>({});

  const signIn = useThunkAction(signInAction);

  const handleBlur = (event: InputChangeEvent): void => {
    const { name, value } = event.target;

    setErrors((prevState) => ({
      ...prevState,
      [name]: validateLoginAndPassword(value),
    }));
  };

  const handleSubmit = (): void => {
    signIn({ login, password });
  };

  return (
    <Layout transparent verticalAlign>
      <Container className="sign">
        <Header as="h1" textAlign="center">
          {t('signinTitle')}
        </Header>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            name="login"
            value={login}
            label={t('login')}
            placeholder={t('login')}
            onChange={handleChangeLogin}
            onBlur={handleBlur}
            error={errors.login}
          />
          <Form.Input
            name="password"
            value={password}
            type="password"
            label={t('password')}
            placeholder={t('password')}
            onChange={handleChangePassword}
            onBlur={handleBlur}
            error={errors.password}
          />
          <Button type="submit" color="blue" fluid>
            {t('signinButton')}
          </Button>
          <div className="sign__link">
            <a href="/signup">{t('signupButton')}</a>
          </div>
        </Form>
      </Container>
    </Layout>
  );
});

export default SignIn;
