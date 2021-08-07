import express from 'express';
import pug from 'pug';

const router = express.Router();

import { bot } from '../../bot.js';
import { Guilds } from '../../data/guilds.js';
import { CommandHandler } from '../../handlers/command-handler.js';

import Deps from '../../utils/deps.js';
import Middleware from '../modules/middleware.js';

router.use(Deps.get(Middleware).updateUser, Deps.get(Middleware).validateUser, Deps.get(Middleware).updateGuilds);

router.get('/dashboard', (req, res) => res.render('dashboard/index'));

router.get('/servers/:id', Deps.get(Middleware).validateGuild, async (req, res) => {
    res.render('dashboard/show', {
        savedGuild: await Deps.get(Guilds).get(req.params.id)
    });
});

router.put('/servers/:id/:module', Deps.get(Middleware).validateGuild, async (req, res) => {
    try {
        const { id, module } = req.params;

        const savedGuild = await Deps.get(Guilds).get(id);
        savedGuild[module] = req.body;
        await savedGuild.save();

        res.redirect(`/servers/${id}`);
    } catch (error) {
        res.render('errors/400');
    }
})

export default router;