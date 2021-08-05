import { config } from 'dotenv';
config({ path: '.env' });

import express from 'express';
import pug from 'pug';
import authClient from '../auth-client.js';

import Deps from '../../utils/deps.js';
import Middleware from '../middleware.js';

const router = express.Router();

router.use(Deps.get(Middleware).updateUser);

router.get('/login', (req, res) => res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${process.env.OAUTH_ID}&redirect_uri=${process.env.DASHBOARD_URL}/auth&response_type=code&scope=identify%20guilds&prompt=none`));

router.get('/auth', async (req, res) => {
    try {
        const code = req.query.code;
        const key = await authClient.getAccess(code);

        res.cookies.set('key', key);
        res.redirect('/dashboard');
    } catch(err) {
        res.redirect('/');
    };
});

router.get('/logout', (req, res) => {
    res.cookies.set('key', {expires: Date.now()});
    res.redirect('/');
});

router.get('/invite', (req, res) => {
    res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${process.env.OAUTH_ID}&permissions=3457088&redirect_uri=${process.env.DASHBOARD_URL}/auth&response_type=code&scope=identify%20guilds%20bot&prompt=none`);
});

export default router;