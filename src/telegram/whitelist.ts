const maincomm: string[] = [];
const subcomm: string[] = [];

export const createWhitelist = [...new Set(maincomm.concat(subcomm))];
export const viewWhiteList = [...new Set(maincomm.concat(subcomm))];
export const updateWhiteList = [...new Set(maincomm)];
