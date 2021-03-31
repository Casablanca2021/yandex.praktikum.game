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
  // eslint-disable-next-line camelcase
  first_name: string;
  // eslint-disable-next-line camelcase
  second_name: string;
  // eslint-disable-next-line camelcase
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export type SignUpData = Omit<UserInfoResponse, 'display_name' | 'avatar' | 'id'>

export type LogOutResponse = string;
