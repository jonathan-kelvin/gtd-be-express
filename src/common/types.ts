import { ObjectId } from 'mongodb';

export type TelegramEntry = {
  inputterName: string;
  day: number;
  og: number;
  points: number;
  description?: string;
};

export type Entry = TelegramEntry & {
  uuid: string;
  house: number;
  id?: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};

export type LeaderboardData = {
  og: number;
  house: number;
  [dayXPoints: string]: number;
  totalPoints: number;
};
