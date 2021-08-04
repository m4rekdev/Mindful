import { config } from 'dotenv';
config({ path: '.env' });

import express from 'express';
import pug from 'pug';

import Deps from '../utils/deps.js';
import { CommandHandler } from '../handlers/command-handler.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

export class Dashboard {

    init() {

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        const app = express();

        app.set('views', __dirname + '/views');
        app.set('view engine', 'pug');
    
        app.listen(process.env.DASHBOARD_PORT, () => console.log(`Dashboard is running on port ${process.env.DASHBOARD_PORT}`));
    }
}
