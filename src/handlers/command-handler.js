import { readdirSync } from 'fs';
import { bot } from '../bot.js';

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
        const array = [];
        const itr = this.commands.keys(); 
        for(var i=0; i<this.commands.size; i++){
            array.push(itr.next().value); 
        };
        console.log(array);
        return array;
    }
}