import TelegramBot, { User } from 'node-telegram-bot-api';
import {
  handleFailedCreate,
  handleHelp,
  handleInvalidSyntax,
  handleNoAccess,
  handleStart,
} from './responses';
import { createNewEntry } from '../services/leaderboard';
import { createWhitelist } from './whitelist';
import { Entry } from '../common/types';

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
            keyboard: [[{ text: '/help' }]],
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
    const trimmed = words.map((word) => word.trim());
    try {
      let obj: Partial<Entry> = {};
      const callbackFn = (createdObj: Entry) => {
        obj = createdObj;
      };
      await createNewEntry(
        {
          inputterName: userInfo?.username ?? userInfo?.first_name ?? '-',
          day: Number(trimmed[0]),
          og: Number(trimmed[1]),
          points: Number(trimmed[2]),
          description: trimmed[3] ?? '-',
        },
        callbackFn
      );
      return `Success! Added ${obj.points} points to OG ${obj.og}`;
    } catch {
      return handleFailedCreate;
    }
  }

  return 'Command not found';
};

const createInputValidation = (words: string[]): boolean => {
  if (words.length < 3 || words.length > 4) return false;
  const trimmed = words.map((word) => Number(word.trim()));
  const [day, og, points] = trimmed;
  if (isNaN(day) || isNaN(og) || isNaN(points)) return false;
  return true;
};

const checkAccess = (userInfo: User | undefined, whitelist: string[]): boolean => {
  if (userInfo?.username) return whitelist.includes(userInfo.username);
  return false;
};
