const dictionary = {
  first_name: 'Имя',
  second_name: 'Фамилия',
  login: 'Логин',
  email: 'Почта',
  phone: 'Телефон',
  password: 'Пароль',
  password_confirm: 'Пароль (еще раз)',
  signupTitle: 'Регистрация',
  signinTitle: 'Вход',
  signupButton: 'Зарегистрироваться',
  signinButton: 'Войти',
  errorBoundaryMessage: 'Упс, что-то пошло не так...',
  errorBoundaryButton: 'На страницу с игрой',
};

export const t = (key: keyof typeof dictionary): string => dictionary[key];
