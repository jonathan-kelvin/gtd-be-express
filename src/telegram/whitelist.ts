const master: string[] = [];
const maincomm: string[] = [];
const subcomm: string[] = [];

export const masterSet: string[] = [...new Set(master)];
export const maincommSet: string[] = [...new Set(masterSet.concat(maincomm))];
export const subcommSet: string[] = [...new Set(maincommSet.concat(subcomm))];

// Note: update helpCommand to show correct response
export const createWhitelist = subcommSet;
export const viewWhitelist = subcommSet;
export const viewmoreWhitelist = maincommSet;
export const deleteWhitelist = maincommSet;
export const deleteAllWhitelist = master;
