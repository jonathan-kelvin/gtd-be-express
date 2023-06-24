const master: string[] = [];
const maincomm: string[] = [];
const subcomm: string[] = [];

const maincommSet: string[] = [...new Set(master.concat(maincomm))];
const subcommSet: string[] = [...new Set(maincommSet.concat(subcomm))];

export const createWhitelist = subcommSet;
export const viewWhitelist = subcommSet;
export const viewmoreWhitelist = maincommSet;
export const deleteWhitelist = maincommSet;
export const deleteAllWhitelist = master;
