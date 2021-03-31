import { UserInfoResponse } from 'api/types';

export type ProfileValidations = Record<keyof UserInfoResponse, boolean>;

export type Notification = { message: string, color:'red'|'green' }

export type ProfileForm = {
    profile: Partial<UserInfoResponse>;
    errors: Partial<ProfileValidations>;
    notification: Notification | null;
  };
