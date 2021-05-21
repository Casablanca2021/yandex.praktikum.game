import { leaderboard } from 'api/leaderboard';
import { LeaderboardResponse, LeaderboardResponseItem } from 'api/types';
import { setNotificationError } from 'utils';

export class LeaderboardServices {
  getLeaderboard = async (): Promise<LeaderboardResponse> => {
    const avatarGuest = 'https://image.flaticon.com/icons/png/512/147/147144.png';
    try {
      const leaders = (await leaderboard.getAll()) as LeaderboardResponse;

      leaders.forEach((item: LeaderboardResponseItem) => {
        if (item.data.avatar === undefined) {
          // eslint-disable-next-line no-param-reassign
          item.data.avatar = avatarGuest;
        }
        if (item.data.login === undefined) {
          // eslint-disable-next-line no-param-reassign
          item.data.login = 'Guest';
        }
      });
      return leaders;
    } catch (error) {
      setNotificationError(error);
      return [];
    }
  };
}
