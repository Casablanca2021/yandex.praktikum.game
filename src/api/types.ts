export type SignInData = {
  login: string;
  password: string;
};

export type SignUpResponse = {
  id: number;
};

export type SignInResponse = string;

export type UserInfo = {
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
  password: string;
  avatar: string;
};

export type UserInfoResponse = Omit<UserInfo, 'password'>;

export type SignUpData = Omit<UserInfo, 'display_name' | 'avatar' | 'id'>;

export type LogOutResponse = string;

export type LeaderboardResponseItem = {
  data: {
    // eslint-disable-next-line camelcase
    casablanca_score: number;
    level: number;
    login?: string;
    avatar?: string;
  };
};

export type LeaderboardResponse = [LeaderboardResponseItem] | [];
