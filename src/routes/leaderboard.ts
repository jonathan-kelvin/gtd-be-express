import { Express } from 'express';
import {
  createLeaderboardEntry,
  getAllLeaderboardEntry,
  getLeaderboardEntry,
  updateLeaderboardEntry,
} from '../controllers/leaderboard';

export default (app: Express) => {
  app.get('/leaderboard', getLeaderboardEntry);
  app.get('/leaderboard/entry', getAllLeaderboardEntry);
  app.post('/leaderboard/entry', createLeaderboardEntry);
  app.patch('/leaderboard/entry/:id', updateLeaderboardEntry);
};
