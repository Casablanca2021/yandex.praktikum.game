import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button, Container, Form, Header, InputOnChangeData, Message,
} from 'semantic-ui-react';
import { t, ROUTES } from 'common';
import {
  validateEmail, validateLoginAndPassword, validateName, validatePhone,
} from 'utils';
import { Auth } from 'api/auth';
import { Fields, FieldErrors } from './types';
import './SignUp.css';
import Layout from 'components/Layout';

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

const SignUp: FC = () => {
  const [fields, setFields] = useState<Fields>({
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    phone: '',
    password: '',
    password_confirm: '',
  });

  const [errors, setErrors] = useState<Partial<FieldErrors>>({});
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleChange = (_event: ChangeEvent, { name, value }: InputOnChangeData)
  : void => setFields((prevState) => ({ ...prevState, [name]: value }));

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    switch (name) {
      case 'first_name':
      case 'second_name':
        setErrors((prevState) => ({
          ...prevState,
          [name]: validateName(value),
        }));
        break;
      case 'login':
      case 'password':
      case 'password_confirm':
        setErrors((prevState) => ({
          ...prevState,
          [name]: validateLoginAndPassword(value),
        }));
        break;
      case 'email':
        setErrors((prevState) => ({
          ...prevState,
          [name]: validateEmail(value),
        }));
        break;
      case 'phone':
        setErrors((prevState) => ({
          ...prevState,
          [name]: validatePhone(value),
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    // eslint-disable-next-line camelcase
    const { password_confirm, ...data } = fields;
    Auth.signUp(data)
      .then(() => history.push(ROUTES.ROOT))
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
      });
  };

  return (
    <Layout transparent={true} verticalAlign={true}>
    <Container className="sign">
      <Header as="h1" textAlign="center">
        {t('signupTitle')}
      </Header>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          name="first_name"
          value={fields.first_name}
          label={t('first_name')}
          placeholder={t('first_name')}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.first_name}
        />
        <Form.Input
          name="second_name"
          value={fields.second_name}
          label={t('second_name')}
          placeholder={t('second_name')}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.second_name}
        />
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
          name="email"
          value={fields.email}
          type="email"
          label={t('email')}
          placeholder={t('email')}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
        />
        <Form.Input
          name="phone"
          value={fields.phone}
          label={t('phone')}
          placeholder={t('phone')}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone}
        />
        <Form.Input
          autoComplete="true"
          name="password"
          value={fields.password}
          type="password"
          label={t('password')}
          placeholder={t('password')}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
        />
        <Form.Input
          autoComplete="true"
          name="password_confirm"
          value={fields.password_confirm}
          type="password"
          label={t('password_confirm')}
          placeholder={t('password_confirm')}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password_confirm}
        />
        {errorMessage && (
          <Message negative>
            <Message.Header className="sign__error">{errorMessage}</Message.Header>
          </Message>
        )}

          <Button type="submit" color="blue" fluid>
            {t('signupButton')}
          </Button>
          <div className="sign__link">
            <a href={ROUTES.SIGNIN}>{t('signinTitle')}</a>
          </div>
        </Form>
      </Container>
    </Layout>
  );
};

export default SignUp;
