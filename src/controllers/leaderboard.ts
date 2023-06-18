import { RequestHandler } from 'express';
import { createNewEntry, getAllEntries, getLeaderboard } from '../services/leaderboard';

export const getLeaderboardEntry: RequestHandler = async (req, res, next) => {
  try {
    const scores = await getLeaderboard();
    res.status(200).json({ message: 'success', data: scores });
  } catch (err) {
    next(err);
  }
};

// TODO add auth?
export const createLeaderboardEntry: RequestHandler = async (req, res, next) => {
  try {
    // request body validation check
    // replace .text with request body params
    if (!req.body.text) {
      res.status(400);
    }
    // await createNewEntry(
    //   {
    //     inputterName: 'kelvin',
    //     day: 1,
    //     og: 3,
    //     points: 100,
    //     description: 'Tests',
    //   },
    //   () => console.log('⚡️[server]: New database entry created')
    // );

    res.status(200).json({ message: 'success 🤖' });
  } catch (err) {
    next(err);
  }
};
