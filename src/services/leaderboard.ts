// Note: errors are not handled here

import { Entry, TelegramEntry } from '../common/types';
import { ogToHouse } from '../common/utils';
import LeaderboardEntry from '../models/leaderboardEntry';
import { v4 as uuidv4 } from 'uuid';

export const getAllEntries = async () => {
  // add selectors (narrow down query)
  const scores = await LeaderboardEntry.find();
  return scores;
};

type Callback = (createdObj: Entry) => void;

export const createNewEntry = async (entry: TelegramEntry, callback?: Callback) => {
  const { inputterName, day, og, points, description } = entry;
  const uuid = uuidv4();
  const house = ogToHouse(og);
  const newEntry = new LeaderboardEntry({
    uuid,
    inputterName,
    day,
    og,
    house,
    points,
    description,
  });

  const createdObj = await newEntry.save();
  if (callback) callback(createdObj);
};
