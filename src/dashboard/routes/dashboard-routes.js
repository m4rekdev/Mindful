import express from 'express';
import pug from 'pug';

const router = express.Router();

import { bot } from '../../bot.js';
import { Guilds } from '../../data/guilds.js';
import { AuditLogger } from '../modules/audit-logger.js';
import { Logs } from '../../data/logs.js';
import { CommandHandler } from '../../handlers/command-handler.js';

import Deps from '../../utils/deps.js';
import Middleware from '../modules/middleware.js';

router.use(Deps.get(Middleware).updateUser, Deps.get(Middleware).validateUser, Deps.get(Middleware).updateGuilds);

router.get('/dashboard', (req, res) => res.render('dashboard/index'));

router.get('/servers/:id', Deps.get(Middleware).validateGuild, async (req, res) => {
    res.render('dashboard/show', {
        savedGuild: await Deps.get(Guilds).get(req.params.id),
        savedLog: await Deps.get(Logs).get(req.params.id),
        users: bot.users.cache
    });
});

router.put('/servers/:id/:module', Deps.get(Middleware).validateGuild, async (req, res) => {
    try {
        const { id, module } = req.params;
        let savedGuild = await Deps.get(Guilds).get(id);
        const old = { prefix: savedGuild.settings.prefix, blacklistedChannelIds: savedGuild.settings.blacklistedChannelIds };

        if (old === req.body) return false;

        await Deps.get(AuditLogger).change(id, {
            at: new Date(),
            by: res.locals.user.id,
            module: module,
            new: {...req.body},
            old: {...old}
        });

        savedGuild[module] = req.body;
        await savedGuild.save();

        res.redirect(`/servers/${id}`);
    } catch (error) {
        console.log(error);
        res.render('errors/400');
    }
})

export default router;