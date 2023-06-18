export const handleStart = `
*Hello!*
This bot is used to keep track and update points in real time. Type /help for the full list of commands and how to use them

- GTD XXV
`;

export const handleHelp = `
Commands available:
*1. Leaderboard*
_Public_
Used to show current points of each OG (daily points are accumulated).

/leaderboard

*2. Create*
_Private to POLOG only_ 
Used to add new entries to the database. Enter 1 OG at a time.

/create <day> | <og> | <point> | <desc>:
day [[required]]: which gtd day is this for?
og [[required]]: which og is this for?
point [[required]]: how many points did this og earn?
desc [[optional]]: description of entry

example: /create 1 | 8 | 100 | wreck it wralph og 2A vs 8B

*3. View*
_Private to POLOG only_
Used to view all entries for specified day, if day is not specified,
will show all entries available.

/view <day>:
day [[optional]]: show entries of this day only

example /view 1
`;

export const handleInvalidSyntax = `
Command sent in incorrect format. Try again
`;

export const handleFailedCreate = `
Database failed to save
`;

export const handleFailedView = `
Database failed to get entries
`;

export const handleFailedLeaderboard = `
Database failed to get entries
`;

export const handleNoAccess = `
You do not have access to this command
`;

export const handleInvalidCommand = `
Command not found
`;
