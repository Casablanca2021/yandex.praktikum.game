import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container, Form, Header, InputOnChangeData, Message } from 'semantic-ui-react';
import { t } from 'common/dictionary';
import { validateLoginAndPassword } from 'utils/validateUtils';
import { ROUTES } from 'common/consts';
import { Auth } from 'api/auth';
import { Fields, FieldErrors } from './types';
import './SignIn.css';
import Layout from 'components/Layout';

export const SignIn: FC = () => {
  const [fields, setFields] = useState<Fields>({
    login: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<FieldErrors>>({});
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleChange = (_event: React.ChangeEvent<HTMLInputElement>, { name, value }: InputOnChangeData): void =>
    setFields((prevState) => ({ ...prevState, [name]: value }));

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    setErrors((prevState) => ({
      ...prevState,
      [name]: validateLoginAndPassword(value),
    }));
  };

  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    const data = {
      ...fields,
    };

    Auth.signIn(data)
      .then(() => history.push(ROUTES.ROOT))
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
      });
  };

  return (
    <Layout transparent={true}>
    <Container className="sign">
      <Header as="h1" textAlign="center">
        {t('signinTitle')}
      </Header>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          name="login"
          value={fields.login}
          label={t('login')}
          placeholder={t('login')}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.login}
        />
        <Form.Input
          name="password"
          value={fields.password}
          type="password"
          label={t('password')}
          placeholder={t('password')}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
        />
        {errorMessage && (
          <Message negative>
            <Message.Header className="sign__error">{errorMessage}</Message.Header>
          </Message>
        )}

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
};
