import { config } from 'dotenv';
config({ path: '.env' });

import express from 'express';
import Deps from '../utils/deps.js';
import { CommandHandler } from '../handlers/command-handler.js';
import pug from 'pug';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

export class Dashboard {
    init() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        const app = express();

        app.set('views', __dirname + '/views');
        app.set('view engine', 'pug');

        app.get('/', (req, res) => res.render('index'));

        setTimeout(function(){
            this.cmds = Deps.get(CommandHandler).get();
        }, 5000);
        app.get('/commands', (req, res) => {
            res.render('commands', {
            subtitle: "Commands",
            categories: [
                { name: 'Everyone', icon: 'fas fa-user' },
                { name: 'DJ', icon: 'fas fa-compact-disc' },
                { name: 'Admin', icon: 'fas fa-tools' }
            ],
            commands: this.cmds
        })});
    
        app.listen(process.env.DASHBOARD_PORT, () => console.log(`Dashboard is running on port ${process.env.DASHBOARD_PORT}`));
    }
}
