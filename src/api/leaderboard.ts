import { post } from 'api/http';
import { LeaderboardResponse } from 'api/types';
import store from 'store';
import { ApiPath, headersJSON as headers } from 'api/consts';

export const leaderboard = {
  getAll(): Promise<LeaderboardResponse> {
    return post(
      ApiPath.GET_LEADERBOARD,
      {
        cursor: 0,
        ratingFieldName: 'casablanca_score',
        limit: 20,
      },
      { headers }
    );
  },

  save(score: number, level: number): Promise<LeaderboardResponse> {
    const { user } = store.getState();

    return post(
      ApiPath.SET_LEADERBOARD,
      {
        data: {
          casablanca_score: score,
          level,
          login: user.login,
          avatar: user.avatar,
        },
        ratingFieldName: 'casablanca_score',
      },
      { headers }
    );
  },
};
