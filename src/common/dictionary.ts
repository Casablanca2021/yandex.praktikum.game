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
  errorBoundaryMessage: 'Упс, что-то пошло не так...',
  errorBoundaryButton: 'На страницу с игрой',
  forumTitle: 'Форум',
  appName: 'SUPER GAME',
  question: 'Вопрос',
  categories: 'Категории',
  saveButton: 'Сохранить',
  cancelButton: 'Отмена',
};

export const t = (key: keyof typeof dictionary): string => dictionary[key];
