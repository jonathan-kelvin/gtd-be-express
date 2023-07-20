// Telegram handle is case sensitive

const master: string[] = ['jonathankelvin'];
const maincomm: string[] = [
  'kenzhiiskandar',
  'Hartawan17',
  'wilsencp',
  'bernardlesley',
  'lynceline',
  'Elbert1104',
  'pascaltheodores',
];
const subcomm: string[] = [
  'verenakarina',
  'jeenjeni',
  'rubensorus',
  'verenaregina',
  'stephanie_jng',
  'elvin_sugianto',
  'danielrahmatcipta',
  'richardf169',
  'NeoHwang',
  'marcelinosutanto',
  'theonie0412',
  'gabriellenicole',
  'DanielPS04',
  'Yvessamson',
  'holykristanti',
  'kevinleegunawan',
  'Brytista',
  'geoffvinc',
  'mattdinata',
  'Rafie_Hanania',
  'AlvinsenJap',
  'Marco_L_R',
  'Xentroide',
  'oqqypr',
];

export const masterSet: string[] = [...new Set(master)];
export const maincommSet: string[] = [...new Set(masterSet.concat(maincomm))];
export const subcommSet: string[] = [...new Set(maincommSet.concat(subcomm))];

// Note: update helpCommand to show correct response
export const createWhitelist = subcommSet;
export const viewWhitelist = subcommSet;
export const viewmoreWhitelist = maincommSet;
export const deleteWhitelist = maincommSet;
export const deleteAllWhitelist = master;
