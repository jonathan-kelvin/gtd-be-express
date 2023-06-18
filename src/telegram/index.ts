import TelegramBot, { User } from 'node-telegram-bot-api';
import {
  handleFailedCreate,
  handleFailedLeaderboard,
  handleFailedView,
  handleHelp,
  handleInvalidCommand,
  handleInvalidSyntax,
  handleNoAccess,
  handleStart,
} from './responses';
import { createWhitelist, viewWhiteList } from './whitelist';
import { createCommand, leaderboardCommand, viewCommand } from './commands';
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
  } else if (textWithCommand.startsWith('/view')) {
    // add filtering options
    if (!checkAccess(userInfo, viewWhiteList)) return handleNoAccess;
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
