export type Fields = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
  password_confirm: string;
};

export type FieldErrors = Record<keyof Fields, boolean>;
