import { SavedGuild } from './models/guild.js';

export default class Guilds {
    async get(id) {
        return await SavedGuild.findById(id)
            ?? await SavedGuild.create({ _id: id });
    }
}