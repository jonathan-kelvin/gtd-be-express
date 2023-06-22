import { Express } from 'express';
import { createLeaderboardEntry, getLeaderboardEntry } from '../controllers/leaderboard';

export default (app: Express) => {
  app.get('/leaderboard', getLeaderboardEntry);
  app.post('/leaderboard/entry', createLeaderboardEntry);
};
