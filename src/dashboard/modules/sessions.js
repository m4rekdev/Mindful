import authClient from './auth-client.js';
import Deps from '../../utils/deps.js';
import { bot } from '../../bot.js';

export class Sessions {
    sessions = new Map();

    async update(key) {
        return this.sessions
            .set(key, {
                authUser: await authClient.getUser(key),
                guilds: getManagableGuilds(await authClient.getGuilds(key))
            });
    }
    
    async create(key) {
        setTimeout(() => this.sessions.delete(key), 5 * 60 * 1000)
        await this.update(key);

        return this.sessions.get(key);
    }

    get(key) {
        return this.sessions.get(key) ?? this.create(key);
    }

}

function getManagableGuilds(authGuilds) {
    const guilds = [];
    for (const id of authGuilds.keys()) {
        const isManager = authGuilds
            .get(id).permissions
            .includes('MANAGE_GUILD');
        const guild = bot.guilds.cache.get(id);
        if (!guild || !isManager) continue;

        guilds.push(guild);
    }
    return guilds;
}