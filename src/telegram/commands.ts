// Note: errors are not handled here

import { validDays } from '../common/constants';
import { Entry, LeaderboardData } from '../common/types';
import {
  createNewEntry,
  deleteAllEntries,
  deleteEntry,
  getAllEntries,
  getLeaderboard,
} from '../services/leaderboard';
import { User } from 'node-telegram-bot-api';
import { maincommSet, masterSet, subcommSet } from './whitelist';
import {
  handleHelpAll,
  handleHelpMaincomm,
  handleHelpMaster,
  handleHelpSubcomm,
} from './responses';

export const helpCommand = (username: string): string => {
  if (masterSet.includes(username)) return handleHelpMaster;
  if (maincommSet.includes(username)) return handleHelpMaincomm;
  if (subcommSet.includes(username)) return handleHelpSubcomm;
  return handleHelpAll;
};

export const leaderboardCommand = async (showDailyAttribution?: boolean): Promise<string> => {
  let retStr = '*Leaderboard:*\n';
  const leaderboardData: LeaderboardData[] = await getLeaderboard();
  let cnt = 1;
  for (const data of leaderboardData) {
    let currStr = `${cnt}. OG ${data.og} - Points: ${data.totalPoints}`;
    if (showDailyAttribution) {
      for (const day of validDays) {
        currStr += ` Day ${day}: ${data[`day${day}Points`]}`;
      }
    }
    cnt += 1;
    retStr += currStr + '\n';
  }
  retStr += '\n_*check out pintugtd.com/leaderboard for more details!_';
  return retStr;
};

export const viewCommand = async (dayFilter: string): Promise<string> => {
  let retStr = '*Entries:*\n';
  let filter: Partial<Entry> = {};
  if (dayFilter) filter['day'] = Number(dayFilter);
  const rows: Entry[] = await getAllEntries(filter);
  for (const row of rows) {
    const currStr = `- Day ${row.day}, House ${row.house}, OG ${row.og}, Points: ${row.points}, By: ${row.inputterName}, Desc: ${row.description}\n`;
    retStr += currStr;
  }
  return retStr;
};

export const viewMoreCommand = async (dayFilter: string): Promise<string> => {
  let retStr = '*Entries with Id:*\n';
  let filter: Partial<Entry> = {};
  if (dayFilter) filter['day'] = Number(dayFilter);
  const rows: Entry[] = await getAllEntries(filter);
  for (const row of rows) {
    const currStr = `- Id: ${row.id}, D${row.day}, OG${row.og}, Points ${row.points}, By ${row.inputterName}, Desc ${row.description}\n`;
    retStr += currStr;
  }
  return retStr;
};

export const createCommand = async (
  words: string[],
  userInfo: User | undefined
): Promise<string> => {
  const trimmed = words.map((word) => word.trim());
  let obj: Partial<Entry> = {};
  const callbackFn = (createdObj: Entry) => {
    obj = createdObj;
  };
  await createNewEntry(
    {
      inputterName: userInfo?.username ?? userInfo?.first_name ?? '-',
      day: Number(trimmed[0]),
      og: Number(trimmed[2]),
      points: Number(trimmed[3]),
      description: trimmed[1],
    },
    callbackFn
  );
  return `Success! Added ${obj.points} points to OG ${obj.og}`;
};

export const deleteCommand = async (documentId: string): Promise<string> => {
  const deletedEntry = await deleteEntry(documentId);
  if (!deletedEntry) throw new Error();
  return `Success! Entry deleted`;
};

export const deleteAllCommand = async (): Promise<string> => {
  const rowsDeleted = await deleteAllEntries();
  return `Success! ${rowsDeleted} entries deleted`;
};
