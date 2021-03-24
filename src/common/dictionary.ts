const dictionary = {
  first_name: "Имя",
  second_name: "Фамилия",
  login: "Логин",
  email: "Почта",
  phone: "Телефон",
  password: "Пароль",
  password_confirm: "Пароль (еще раз)",
  signupTitle: "Регистрация",
  signupButton: "Зарегестрироваться",
};

export const t = (key: keyof typeof dictionary): string => dictionary[key];
