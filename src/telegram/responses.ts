export const handleStart = `
*Hello!*
This bot is used to keep track and update points in real time. Type /help for the full list of commands and how to use them

- GTD XXV
`;

export const handleHelpAll = `
Commands available:
*1. Leaderboard*
Used to show current points of each OG (daily points are accumulated).

/leaderboard
`;

export const handleHelpSubcomm = `
${handleHelpAll}
*2. Create*
Used to add new entries to the database. Enter 1 OG at a time.

/create <day> (enter)
<desc> (enter)
<og> (enter)
<point>:
day: which gtd day is this for
desc: description of entry
og: which og is this for
point: how many points did this og earn

example: 
/create 1 
wir3
8
100

*3. View*
Used to view all entries for specified day, if day is not specified,
will show all entries available.

/view <day>:
day (optional): show entries of this day only

example: /view 1
`;

export const handleHelpMaincomm = `
${handleHelpSubcomm}
*4. View Id*
Same as view command, but with entry Id.

/viewmore <day>:
day (optional): show entries of this day only

example: /viewmore 3

*5. Delete*
Used to delete an entry by its Id.

/delete <id>:
id: copy and paste the entry id from viewmore command

example: /delete 648cbd23c046c3449e7a3979
`;

export const handleHelpMaster = `
${handleHelpMaincomm}
*6. Delete All*
Used to reset entries to 0.

/deleteall
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

export const handleFailedDelete = `
Database failed to delete entry
`;

export const handleNoAccess = `
You do not have access to this command
`;

export const handleInvalidCommand = `
Command not found
`;
