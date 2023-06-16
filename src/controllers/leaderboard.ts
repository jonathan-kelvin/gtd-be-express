import { RequestHandler } from 'express';
import { createNewEntry, getAllEntries } from '../services/leaderboard';

export const getLeaderboardEntry: RequestHandler = async (req, res, next) => {
  try {
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

    const scores = await getAllEntries();

    res.status(200).json({ message: 'success 🤖', data: scores });
  } catch (err) {
    next(err);
  }
};

export const createLeaderboardEntry: RequestHandler = async (req, res, next) => {
  try {
    // request body validation check
    // replace .text with request body params
    if (!req.body.text) {
      // do something
      res.status(400);
    }

    res.status(200).json({ message: 'success 🤖' });
  } catch (err) {
    next(err);
  }
};
