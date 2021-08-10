import authClient from './auth-client.js';
import Deps from '../../utils/deps.js';
import { Sessions } from './sessions.js';
import { sendError } from './api-utils.js';
import { bot } from '../../bot.js';
import { MusicHandler } from '../../handlers/music-handler.js';

export default class Middleware {
    async validateUser(req, res, next) {
        return (res.locals.user)
            ? next()
            : res.render('errors/401', {
                subtitle: '401'
            });
    }

    async updateUser(req, res, next) {
        try {
            const key = res.cookies.get('key')
                ?? req.get('Authorization');

            if (key) {
                const { authUser } = await Deps.get(Sessions).get(key);
                res.locals.user = authUser;
            }
        } finally {
            return next();
        }
    }

    async updateGuilds(req, res, next) {
        try {
            const key = res.cookies.get('key')
                ?? req.get('Authorization');

            if (key) {
                const { guilds } = await Deps.get(Sessions).get(key);
                res.locals.guilds = guilds;
            }
        } finally {
            return next();
        }
    }

    async validateGuild(req, res, next) {
        res.locals.server = res.locals.guilds.find(g => g.id === req.params.id);
        return (res.locals.server)
            ? next()
            : res.render('errors/404', {
                subtitle: '404'
            });
    }

    async updateMusicPlayer(req, res, next) {
        try {
            const requestor = bot.guilds.cache
                .get(req.params.id)?.members.cache
                .get(res.locals.user.id);
            if (!requestor)
                throw new TypeError('You shall not pass.');
            
            res.locals.requestor = requestor;
            res.locals.player = await Deps.get(MusicHandler).get({
                guildId: req.params.id,
                voiceChannel: requestor.voice.channel
            });

            return next();
        } catch (error) {
            sendError(res, { message: error?.message })
        }
    }
};