// Note: errors are not handled here

import { Entry, LeaderboardData } from '../common/types';
import { createNewEntry, getAllEntries, getLeaderboard } from '../services/leaderboard';
import { User } from 'node-telegram-bot-api';

export const leaderboardCommand = async (): Promise<string> => {
  let retStr = '*Leaderboard:*\n';
  const leaderboardData: LeaderboardData[] = await getLeaderboard();
  for (const data of leaderboardData) {
    let currStr = `OG ${data.og} - Total: ${data.totalPoints}`;
    // Note: uncomment for day points
    // for (const day of validDays) {
    //   currStr += ` Day ${day}: ${data[`day${day}Points`]}`;
    // }
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
    const currStr = `Day ${row.day}, House ${row.house}, OG ${row.og}, Points: ${row.points}, By: ${row.inputterName}, Desc: ${row.description}\n`;
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
      og: Number(trimmed[1]),
      points: Number(trimmed[2]),
      description: trimmed[3] ?? '-',
    },
    callbackFn
  );
  return `Success! Added ${obj.points} points to OG ${obj.og}`;
};
