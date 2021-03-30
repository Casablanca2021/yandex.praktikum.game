import { Leaders } from 'pages/Leaderboard';

class LeaderboardServices {
 getLeaderboard = async (perion : 'This week' | 'All time' | 'Last week') : Promise<Leaders[]> => {
   const avatar = 'https://image.flaticon.com/icons/png/512/147/147144.png';

   const Leaderboards = [
     {
       id: 1, name: 'Иванов Иван Иванович', points: 1001, avatar,
     },
     {
       id: 2, name: 'Иванов Иван', points: 1000, avatar,
     },
     {
       id: 3, name: 'Сидоров Сидор', points: 500, avatar,
     },
     {
       id: 4, name: 'Матроскин Кот', points: 300, avatar,
     },
     {
       id: 5, name: 'Иванов Иван', points: 200, avatar,
     },
     {
       id: 6, name: 'Иванов Иван', points: 100, avatar,
     },
     {
       id: 7, name: 'Матроскин!!!', points: 50, avatar,
     },
     {
       id: 8, name: 'Сидоров Сидор', points: 25, avatar,
     },
     {
       id: 9, name: 'Матроскин', points: 10, avatar,
     },
     {
       id: 10, name: 'SuperUser', points: 10, avatar,
     },
   ];

   switch (perion) {
     case 'All time':
       return Leaderboards;
     case 'Last week':
       return Leaderboards.slice(0, Leaderboards.length - 3);
     case 'This week':
       return Leaderboards.slice(0, Leaderboards.length - 5);
     default:
       return Leaderboards;
   }
 }
}

export default LeaderboardServices;
