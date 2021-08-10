import { config } from 'dotenv';
config({ path: '.env' });

import mongoose from 'mongoose';
import { Client } from 'discord.js';
import { EventHandler } from './handlers/event-handler.js';
import Deps from './utils/deps.js';
import { Dashboard } from './dashboard/server.js';

export const bot = Deps.add(Client, new Client());

mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useNewUrlParser: true,
}, (error) => (error)
    ? console.log('Connecting to database failed!')
    : console.log('Connected to database!'));

Deps.get(Dashboard).init();
Deps.get(EventHandler).init();

bot.login(process.env.BOT_TOKEN);