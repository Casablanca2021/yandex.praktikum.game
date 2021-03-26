import { get, put, putFormData } from 'api/http';
import { baseUrl, headersJSON as headers } from 'common/consts';
import { Profile } from 'pages/Profile';

class ProfileServices {
    getUser = (): Promise<Profile> => get(`${baseUrl}/auth/user`);

    changeUser = (profile: Partial<Profile>): Promise<Profile> => put<Partial<Profile>, Profile>(`${baseUrl}/user/profile`, profile, { headers });

    changeAvatar = (profile: FormData): Promise<Profile> => putFormData<Profile>(`${baseUrl}/user/profile/avatar`, profile);
}

export default ProfileServices;
