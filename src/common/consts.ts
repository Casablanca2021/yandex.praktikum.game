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
}

export const baseUrl = 'https://ya-praktikum.tech/api/v2';

export const headersJSON = {
  'Content-Type': 'application/json',
};
