import { readdirSync } from 'fs';
import { bot } from '../bot.js';
import Deps from '../utils/deps.js';
import { Guilds } from '../data/guilds.js';

export class CommandHandler {
    commands = new Map();

    async init() {
        const fileNames = readdirSync('./src/handlers/commands');
        for (const name of fileNames) {
            const { default: Command } = await import(`./commands/${name}`);
            const command = new Command();
            if (!command.name) continue;

            this.commands.set(command.name, command);
        }
        console.log(`${fileNames.length - 1} commands were loaded!`);
    }

    async handle(prefix, msg) {
        try {
            const savedGuild = Deps.get(Guilds).get(msg.guild.id);
            const channelIsBlacklisted = savedGuild.blacklistedChannelIds
                .includes(msg.channel.id);
            if (channelIsBlacklisted)
                return false;
            const words = msg.content
                .slice(prefix.length)
                .split(' ');
            await this.commands
                .get(words[0])
                ?.execute(msg, ...words.slice(1));
        } catch (error) {
            await msg.reply(`⚠️ ${error.message}`);
        }
        
    }

    async get() {
        const cmds = Array.from(this.commands, ([name, value]) => (name, value));
        return cmds;
    }
}