import React, { FC, useState } from 'react';
import {
  Button,
  Container,
  Form,
  Header,
  InputOnChangeData,

} from 'semantic-ui-react';
import { t } from 'common/dictionary';
import { validateLoginAndPassword } from 'utils/validateUtils';
import { Fields, FieldErrors } from './types';
import './SignIn.css';

export const SignIn: FC = () => {
  const [fields, setFields] = useState<Fields>({
    login: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<FieldErrors>>({});

  const handleChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
    { name, value }: InputOnChangeData,
  ): void => setFields((prevState) => ({ ...prevState, [name]: value }));

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    setErrors((prevState) => ({
      ...prevState,
      [name]: validateLoginAndPassword(value),
    }));
  };

  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    console.log(fields);
  };

  return (
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

        <Button type="submit" color="blue" fluid>
          {t('signinButton')}
        </Button>
        <div className="sign__link">
          <a href="/signup">{t('signupButton')}</a>
        </div>
      </Form>
    </Container>
  );
};
