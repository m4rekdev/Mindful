import authClient from './auth-client.js';
import Deps from '../../utils/deps.js';
import { Sessions } from './sessions.js';

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
            const key = res.cookies.get('key');

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
            const key = res.cookies.get('key');

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
};