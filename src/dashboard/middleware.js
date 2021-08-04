import authClient from './auth-client.js';

export default class Middleware {
    async validateUser(req, res, next) {
        res.locals.user
            ? next()
            : res.render('errors/401');
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
};