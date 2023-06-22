import { RequestHandler } from 'express';
import { createNewEntry, getAllEntries, getLeaderboard } from '../services/leaderboard';
import { validDays, validOg } from '../common/constants';

export const getLeaderboardEntry: RequestHandler = async (req, res, next) => {
  try {
    const scores = await getLeaderboard();
    res.status(200).json({ message: 'success', data: scores });
  } catch (err) {
    next(err);
  }
};

export const createLeaderboardEntry: RequestHandler = async (req, res, next) => {
  try {
    const { day, og, points, description, password } = req.body;
    if (password !== process.env.API_PASSWORD) {
      res.status(401);
      throw new Error('Incorrect password');
    }
    if (
      day === undefined ||
      og === undefined ||
      points === undefined ||
      description === undefined
    ) {
      res.status(400);
      throw new Error('Incorrect request body format');
    }
    if (
      !validDays.includes(day) ||
      !validOg.includes(og) ||
      !(typeof points === 'number') ||
      !(typeof description === 'string')
    ) {
      res.status(400);
      throw new Error('Invalid request body values');
    }
    await createNewEntry(
      {
        inputterName: 'api call',
        day,
        og,
        points,
        description,
      },
      () => console.log('⚡️[server]: New database entry created')
    );
    res.status(200).json({ message: 'success 🤖' });
  } catch (err) {
    next(err);
  }
};

export const updateLeaderboardEntry: RequestHandler = async (req, res, next) => {
  try {

  } catch (err) {
    next(err)
  }
}
