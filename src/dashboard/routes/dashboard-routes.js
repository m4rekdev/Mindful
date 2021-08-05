import express from 'express';
import pug from 'pug';

const router = express.Router();

import { bot } from '../../bot.js';
import { CommandHandler } from '../../handlers/command-handler.js';

import Deps from '../../utils/deps.js';
import Middleware from '..//middleware.js';

router.use(Deps.get(Middleware).updateUser, Deps.get(Middleware).validateUser, Deps.get(Middleware).updateGuilds);

router.get('/dashboard', (req, res) => res.render('dashboard/index'));

router.get('/servers/:id', (req, res) => {
    console.log(bot.guilds.cache.get(req.params.id));
    res.render('dashboard/show', {
        server: bot.guilds.cache.get(req.params.id)
    });
});

export default router;