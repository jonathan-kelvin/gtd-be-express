import express, { Express } from 'express';
import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import leaderboard from './routes/leaderboard';
import { connectDB } from './config/database';
import { errorHandler } from './middleware/error';
import { startBot } from './telegram';

dotenv.config();
connectDB();

const app: Express = express();

const port = process.env.PORT || 8000;
const botToken = process.env.TELEGRAM_BOT_TOKEN || '';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
leaderboard(app);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running using port:${port}`);
});

const bot = new TelegramBot(botToken, { polling: true });
console.log(`🤖[telebot]: Telegram bot created successfully`);
startBot(bot);
