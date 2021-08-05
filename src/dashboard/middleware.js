import authClient from './auth-client.js';
import Deps from '../utils/deps.js';
import { bot } from '../bot.js';

export default class Middleware {
    async validateUser(req, res, next) {
        res.locals.user
            ? next()
            : res.render('errors/401', {
                subtitle: '401'
            });
    }

    async updateUser(req, res, next) {
        try {
            const key = res.cookies.get('key');

            if (key)
                res.locals.user = await authClient.getUser(key);
        } finally {
            next();
        }
    }

    async updateGuilds(req, res, next) {
        try {
            const key = res.cookies.get('key');

            if (key) {
                const authGuilds = await authClient.getGuilds(key);
                res.locals.guilds = getManagableGuilds(authGuilds);
            }
        } finally {
            res.locals.guilds = res.locals.guilds ?? [];
            next();
        }
    }
};

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
    console.log(guilds);
    return guilds;
}