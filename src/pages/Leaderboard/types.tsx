import { LeaderboardResponse } from 'api/types';

export type Leader = {
  // eslint-disable-next-line camelcase
  casablanca_score: number;
  level: number;
  login?: string;
  avatar?: string;
};

export type LeaderboardState = {
  activeItem: string;
  leaders: LeaderboardResponse;
};
