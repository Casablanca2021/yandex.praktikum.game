import { baseUrl, headersJSON as headers } from 'common';
import { post } from './http';
import {
  LogOutResponse, SignInData, SignInResponse, SignUpData, SignUpResponse,
} from './types';

interface Auth {
  signUp: (data: SignUpData) => Promise<SignUpResponse>;
  signIn: (data: SignInData) => Promise<SignInResponse>;
  logOut: () => Promise<LogOutResponse>;
}

export const Auth: Auth = {
  signUp: (data: SignUpData): Promise<SignUpResponse> => post(`${baseUrl}/auth/signup`, data, { headers }),

  signIn: (data: SignInData): Promise<SignInResponse> => post(`${baseUrl}/auth/signin`, data, { headers }),

  logOut: (): Promise<LogOutResponse> => post(`${baseUrl}/auth/logout`),
};
