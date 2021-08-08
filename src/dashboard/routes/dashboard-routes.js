import express from 'express';
import pug from 'pug';

const router = express.Router();

import { bot } from '../../bot.js';
global.Guilds = import('../../data/guilds.js');
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

        console.log(req.body);

        let savedGuild = await Deps.get(Guilds).get(id);
        const { prefix, blacklistedChannelIds } = req.body;
        savedGuild.prefix = prefix;
        savedGuild.blacklistedChannelIds = blacklistedChannelIds;
        await savedGuild.save();

        res.redirect(`/servers/${id}`);
    } catch (error) {
        console.log(error);
        res.render('errors/400');
    }
})

export default router;