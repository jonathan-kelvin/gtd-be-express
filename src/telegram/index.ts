import TelegramBot, { User } from 'node-telegram-bot-api';
import {
  handleFailedCreate,
  handleFailedDelete,
  handleFailedLeaderboard,
  handleFailedView,
  handleHelp,
  handleInvalidCommand,
  handleInvalidSyntax,
  handleNoAccess,
  handleStart,
} from './responses';
import {
  createWhitelist,
  viewWhitelist,
  viewmoreWhitelist,
  deleteWhitelist,
  deleteAllWhitelist,
} from './whitelist';
import {
  createCommand,
  deleteAllCommand,
  deleteCommand,
  leaderboardCommand,
  viewCommand,
  viewMoreCommand,
} from './commands';
import { validDays, validOg } from '../common/constants';

export const startBot = (bot: TelegramBot) => {
  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from?.id;
    const text = msg.text?.trim();

    if (chatId !== userId || text === undefined) {
      return;
    }

    switch (text) {
      case '/start':
        bot.sendMessage(chatId, handleStart, {
          parse_mode: 'Markdown',
          reply_markup: {
            keyboard: [[{ text: '/help' }], [{ text: '/leaderboard' }]],
          },
        });
        break;
      case '/help':
        bot.sendMessage(chatId, handleHelp, { parse_mode: 'Markdown' });
        break;
      default:
        const sendText: string = await parseCommands(text, msg.from);
        bot.sendMessage(chatId, sendText, { parse_mode: 'Markdown' });
    }
  });
};

const parseCommands = async (
  textWithCommand: string,
  userInfo: User | undefined
): Promise<string> => {
  if (textWithCommand.startsWith('/create')) {
    if (!checkAccess(userInfo, createWhitelist)) return handleNoAccess;
    const words = textWithCommand.replace('/create', '').split('|');
    const isValid: boolean = createInputValidation(words);
    if (!isValid) return handleInvalidSyntax;
    try {
      return await createCommand(words, userInfo);
    } catch {
      return handleFailedCreate;
    }
  } else if (textWithCommand.startsWith('/view') && textWithCommand !== '/viewmore') {
    if (!checkAccess(userInfo, viewWhitelist)) return handleNoAccess;
    const word = textWithCommand.replace('/view', '').trim();
    const isValid: boolean = viewInputValidation(word);
    if (!isValid) return handleInvalidSyntax;
    try {
      return await viewCommand(word);
    } catch {
      return handleFailedView;
    }
  } else if (textWithCommand === '/leaderboard') {
    try {
      return await leaderboardCommand();
    } catch {
      return handleFailedLeaderboard;
    }
  } else if (textWithCommand === '/viewmore') {
    if (!checkAccess(userInfo, viewmoreWhitelist)) return handleNoAccess;
    const word = textWithCommand.replace('/viewmore', '').trim();
    const isValid: boolean = viewInputValidation(word);
    if (!isValid) return handleInvalidSyntax;
    try {
      return await viewMoreCommand(word);
    } catch (err) {
      return handleFailedView;
    }
  } else if (textWithCommand.startsWith('/delete') && textWithCommand !== '/deleteall') {
    if (!checkAccess(userInfo, deleteWhitelist)) return handleNoAccess;
    const word = textWithCommand.replace('/delete', '').trim();
    try {
      return await deleteCommand(word);
    } catch {
      return handleFailedDelete;
    }
  } else if (textWithCommand === '/deleteall') {
    if (!checkAccess(userInfo, deleteAllWhitelist)) return handleNoAccess;
    try {
      return await deleteAllCommand();
    } catch {
      return handleFailedDelete;
    }
  }

  return handleInvalidCommand;
};

const createInputValidation = (words: string[]): boolean => {
  if (words.length < 3 || words.length > 4) return false;
  const trimmed = words.map((word) => Number(word.trim()));
  const [day, og, points] = trimmed;
  if (!validDays.includes(day) || !validOg.includes(og) || isNaN(points)) return false;
  return true;
};

const viewInputValidation = (word: string): boolean => {
  if (word !== '' && !validDays.includes(Number(word))) {
    return false;
  } else {
    return true;
  }
};

const checkAccess = (userInfo: User | undefined, whitelist: string[]): boolean => {
  if (userInfo?.username) return whitelist.includes(userInfo.username);
  return false;
};
