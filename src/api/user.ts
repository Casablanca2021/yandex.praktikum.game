import { get, put, putFormData } from 'api/http';
import { baseUrl, headersJSON as headers } from 'common';
import { UserInfoResponse } from './types';

interface User {
    getUser: () => Promise<UserInfoResponse>;
    changeUser: (data: Partial<UserInfoResponse>) => Promise<UserInfoResponse>;
    changeAvatar: (data: FormData) => Promise<UserInfoResponse>;
  }

export const User : User = {
  getUser: (): Promise<UserInfoResponse> => get(`${baseUrl}/auth/user`),

  changeUser: (profile: Partial<UserInfoResponse>)
    : Promise<UserInfoResponse> => put<Partial<UserInfoResponse>, UserInfoResponse>(`${baseUrl}/user/profile`, profile, { headers }),

  changeAvatar: (profile: FormData)
    : Promise<UserInfoResponse> => putFormData<UserInfoResponse>(`${baseUrl}/user/profile/avatar`, profile),
};
