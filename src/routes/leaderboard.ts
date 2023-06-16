import { Express } from 'express';
import { createLeaderboardEntry, getLeaderboardEntry } from '../controllers/leaderboard';

export default (app: Express) => {
  app.get('/', getLeaderboardEntry);
  app.post('/', createLeaderboardEntry);
};
