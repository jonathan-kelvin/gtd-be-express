import { ogInHouse1, ogInHouse2, ogInHouse3, ogInHouse4 } from './constants';

export const ogToHouse = (og: number): number => {
  if (ogInHouse1.includes(og)) return 1;
  if (ogInHouse2.includes(og)) return 2;
  if (ogInHouse3.includes(og)) return 3;
  if (ogInHouse4.includes(og)) return 4;
  return 0;
};
