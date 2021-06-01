export const baseHost = 'https://ya-praktikum.tech';
export const baseUrl = `${baseHost}/api/v2`;
export const baseUrlResources = `${baseHost}/api/v2/resources`;

export const headersJSON = {
  'Content-Type': 'application/json',
};

export const redirectUri = 'https://casablanca-racing.herokuapp.com';
export const yandexOauthUrl = 'https://oauth.yandex.ru/authorize?response_type=code';

export const ApiPath = {
  SIGN_UP: `${baseUrl}/auth/signup`,
  SIGN_IN: `${baseUrl}/auth/signin`,
  LOG_OUT: `${baseUrl}/auth/logout`,
  USER: `${baseUrl}/auth/user`,
  PROFILE: `${baseUrl}/user/profile`,
  AVATAR: `${baseUrl}/user/profile/avatar`,
  YANDEX_OAUTH: `${baseUrl}/oauth/yandex`,
  YANDEX_OAUTH_ID: `${baseUrl}/oauth/yandex/service-id`,
  GET_LEADERBOARD: `${baseUrl}/leaderboard/all`,
  SET_LEADERBOARD: `${baseUrl}/leaderboard`,
  // local
  THEME: `/api/v1/theme`,
  FEEDBACK: `/api/v1/feedback`,
  FORUM_TOPIC: `/api/v1/forum/topic`,
  FORUM_COMMENT: `/api/v1/forum/comment`,
};
