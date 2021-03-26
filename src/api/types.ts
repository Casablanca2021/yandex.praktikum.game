export type SignUpData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
};

export type SignInData = {
  login: string;
  password: string;
};

export type SignUpResponse = {
  id: number;
};

export type SignInResponse = string;

export type UserInfoResponse = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export type LogOutResponse = string;
