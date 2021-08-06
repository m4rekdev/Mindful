import express from 'express';
import pug from 'pug';

const router = express.Router();

import { bot } from '../../bot.js';
import { CommandHandler } from '../../handlers/command-handler.js';

import Deps from '../../utils/deps.js';
import Middleware from '../modules/middleware.js';

router.use(Deps.get(Middleware).updateUser, Deps.get(Middleware).validateUser, Deps.get(Middleware).updateGuilds);

router.get('/dashboard', (req, res) => res.render('dashboard/index'));

router.get('/servers/:id', Deps.get(Middleware).validateGuild, (req, res) => {
    res.render('dashboard/show');
});

export default router;