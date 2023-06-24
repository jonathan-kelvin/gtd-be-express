// Note: errors are not handled here

import { validDays, validOg } from '../common/constants';
import { Entry, LeaderboardData, TelegramEntry } from '../common/types';
import { ogToHouse } from '../common/utils';
import LeaderboardEntry from '../models/leaderboardEntry';
import { v4 as uuidv4 } from 'uuid';

export const getAllEntries = async (filters: Partial<Entry>) => {
  const entries = await LeaderboardEntry.find(filters);
  return entries;
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

type GroupedDataQuery = {
  _id: {
    day: number;
    og: number;
    house: number;
  };
  points: number;
};

/**
 * Perform group by on LeaderboardEntry model on day, og, and house.
 * Returned object will always contain og and day data that
 * is specified in validOg and validDays constants. If data
 * for specified og/day is not in DB, will initialize to 0.
 * @returns {Promise<LeaderboardData[]>} data sorted by total points in wide format
 */
export const getLeaderboard = async (): Promise<LeaderboardData[]> => {
  const data: GroupedDataQuery[] = await LeaderboardEntry.aggregate([
    {
      $group: {
        _id: {
          day: '$day',
          og: '$og',
          house: '$house',
        },
        points: { $sum: '$points' },
      },
    },
  ]);

  const leaderboardData: LeaderboardData[] = [];

  for (const og of validOg) {
    const newData: LeaderboardData = {
      og,
      house: ogToHouse(og),
      totalPoints: 0,
    };
    const currOgData = data.filter((d) => d._id.og === og);
    for (const day of validDays) {
      newData[`day${day}Points`] = 0;
      const row = currOgData.filter((d) => d._id.day === day);
      if (row.length) {
        const rowPoints = row[0].points;
        newData[`day${day}Points`] += rowPoints;
        newData.totalPoints += rowPoints;
      }
    }
    leaderboardData.push(newData);
  }

  leaderboardData.sort((a, b) => {
    return b.totalPoints - a.totalPoints;
  });

  return leaderboardData;
};

export const updateEntry = async (documentId: string, newEntry: Partial<Entry>) => {
  return await LeaderboardEntry.findByIdAndUpdate(documentId, newEntry, { new: true });
};

export const deleteEntry = async (documentId: string) => {
  return await LeaderboardEntry.findByIdAndDelete(documentId);
};

export const deleteAllEntries = async (): Promise<number> => {
  return (await LeaderboardEntry.deleteMany({})).deletedCount;
};
