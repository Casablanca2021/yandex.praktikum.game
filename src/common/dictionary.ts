const dictionary = {
  first_name: 'Имя',
  second_name: 'Фамилия',
  display_name: 'Ник',
  login: 'Логин',
  email: 'Почта',
  phone: 'Телефон',
  password: 'Пароль',
  password_confirm: 'Пароль (еще раз)',
  signupTitle: 'Регистрация',
  signinTitle: 'Вход',
  signupButton: 'Зарегистрироваться',
  signinButton: 'Войти',
  saveButton: 'Сохранить',
  cancelButton: 'Отмена',
};

export const t = (key: keyof typeof dictionary): string => dictionary[key];
