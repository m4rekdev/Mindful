import Command from './command.js';
import Deps from '../../utils/deps.js';
import { bot } from '../../bot.js';

export default class extends Command {
    name = 'ping';
    category = 'Everyone';
    description = 'Check Mindful\'s response time to Discord.';

    async execute(msg) {
        await msg.reply(`🏓 Ping: \`${bot.ws.ping}ms\`! ;)`);
    }
}