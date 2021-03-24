import { baseUrl } from 'common/consts';
import { get, post } from './http';
import { LogOutResponse, SignInData, SignInResponse, SignUpData, SignUpResponse, UserInfoResponse } from './types';
import { headersJSON as headers } from 'common/consts';

interface Auth {
  signUp: (data: SignUpData) => Promise<SignUpResponse>;
  signIn: (data: SignInData) => Promise<SignInResponse>;
  getUser: () => Promise<UserInfoResponse>;
  logOut: () => Promise<LogOutResponse>;
}

export const Auth: Auth = {
  signUp: async (data: SignUpData): Promise<SignUpResponse> => {
    return await post(`${baseUrl}/auth/signup`, data, { headers });
  },

  signIn: async (data: SignInData): Promise<SignInResponse> => {
    return await post(`${baseUrl}/auth/signin`, data, { headers });
  },

  getUser: async (): Promise<UserInfoResponse> => {
    return await get(`${baseUrl}/auth/user`);
  },

  logOut: async (): Promise<LogOutResponse> => {
    return await post(`${baseUrl}/auth/logout`);
  },
};
