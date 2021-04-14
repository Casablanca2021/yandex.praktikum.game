export enum ROUTES {
  ROOT = '/',
  SIGNIN = '/signin',
  SIGNUP = '/signup',
  FORUM = '/forum',
  FORUM_BY_CATEGORY = '/forum/category/:category',
  FORUM_VIEW = '/forum/:id',
  PROFILE = '/profile',
  HOME = '/home',
  LEADERBOARD = '/leaderboard',
  GAME = '/game',
}

export const baseHost = 'https://ya-praktikum.tech';
export const baseUrl = `${baseHost}/api/v2`;
export const baseUrlResources = `${baseHost}/api/v2/resources`;

export const headersJSON = {
  'Content-Type': 'application/json',
};
