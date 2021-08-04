import express from 'express';
import pug from 'pug';

const router = express.Router();

import Deps from '../../utils/deps.js';
import { CommandHandler } from '../../handlers/command-handler.js';

router.get('/', (req, res) => res.render('dashboard/index'));

export default router;