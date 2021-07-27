import Command from './command.js';
import Deps from '../../utils/deps.js';
import { bot } from '../../bot.js';

export default class extends Command {
    name = 'ping';

    async execute(msg) {
        await msg.reply(`🏓 Ping: \`${bot.ws.ping}ms\`! ;)`);
    }
}