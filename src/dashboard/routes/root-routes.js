import express from 'express';
import pug from 'pug';

const router = express.Router();

import { CommandHandler } from '../../handlers/command-handler.js';

import Deps from '../../utils/deps.js';
import Middleware from '../modules/middleware.js';

router.use(Deps.get(Middleware).updateUser);

router.get('/', (req, res) => res.render('index'));

router.get('/commands', async (req, res) => {
    let cmds = await Deps.get(CommandHandler).get();
    let cmdsString = await JSON.stringify(cmds);
    await res.render('commands', {
    subtitle: "Commands",
    categories: [
        { name: 'Everyone', icon: 'fas fa-user' },
        { name: 'DJ', icon: 'fas fa-compact-disc' },
        { name: 'Admin', icon: 'fas fa-tools' }
    ],
    commands: cmds,
    commandsString: cmdsString
})});

export default router;