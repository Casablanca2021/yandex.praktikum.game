import { get, put, putFormData } from 'api/http';
import { baseUrl, headersJSON as headers } from 'common';
import { Profile } from 'pages/Profile/types';
import { UserInfoResponse } from './types';

interface User {
  getUser: () => Promise<UserInfoResponse>;
  changeUserInfo: (data: Profile) => Promise<UserInfoResponse>;
  changeAvatar: (data: FormData) => Promise<UserInfoResponse>;
}

export const User: User = {
  getUser: (): Promise<UserInfoResponse> => get(`${baseUrl}/auth/user`),

  changeUserInfo: (profile: Profile): Promise<UserInfoResponse> =>
    put<Profile, UserInfoResponse>(`${baseUrl}/user/profile`, profile, { headers }),

  changeAvatar: (profile: FormData): Promise<UserInfoResponse> => putFormData<UserInfoResponse>(`${baseUrl}/user/profile/avatar`, profile),
};
