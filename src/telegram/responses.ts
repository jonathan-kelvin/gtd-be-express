export const handleStart = `
*Hello!*
This bot is used to keep track and update points in real time. Type /help for the full list of commands and how to use them

- GTD XXV
`;

export const handleHelp = `
Commands available:

*1. Create*
_Used to add new entries to the database. Enter 1 OG at a time._

/create <day> | <og> | <point> | <desc>:
day [[required]]: which gtd day is this for?
og [[required]]: which og is this for?
point [[required]]: how many points did this og earn?
desc [[optional]]: description of entry

example: /create 1 | 8 | 100 | wreck it wralph og 2A vs 8B

*2. View*


`;

export const handleInvalidSyntax = `
Command sent in incorrect format. Data not saved to database, try again
`;

export const handleFailedCreate = `
Database failed to save.
`;

export const handleNoAccess = `
You do not have access to this command
`;
