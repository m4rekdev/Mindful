import Command from './command.js';
import Deps from '../../utils/deps.js';
import { Guilds } from '../../data/guilds.js';

export default class extends Command {
    name = 'prefix';
    category = 'Admin';
    description = 'View or change the command prefix.';

    constructor() {
        super();
        this.guilds = Deps.get(Guilds);
    }

    async execute(msg, value) {
        const savedGuild = await this.guilds.get(msg.guild.id);
        if (!value)
            return await msg.reply(`The prefix is \`${savedGuild.prefix}\`!`);
        
        savedGuild.settings.prefix = value;
        await savedGuild.save();

        await msg.reply(`The prefix is now \`${value}\`!`);
    }
}