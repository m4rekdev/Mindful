import { config } from 'dotenv';
config({ path: '.env' });

import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import pug from 'pug';

import { CommandHandler } from '../handlers/command-handler.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import rootRoutes from './routes/root-routes.js';
import authRoutes from './routes/auth-routes.js';
import dashboardRoutes from './routes/dashboard-routes.js';
import musicRoutes from './routes/music-routes.js';
import cookies from 'cookies';
import Deps from '../utils/deps.js';
import Middleware from './modules/middleware.js';
import rateLimit from './modules/rate-limiter.js';
import { sendError } from './modules/api-utils.js'

export class Dashboard {

    init() {

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        const app = express();

        app.set('views', __dirname + '/views');
        app.set('view engine', 'pug');

        app.use(rateLimit);
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(methodOverride('_method'));
        app.use(cookies.express('a', 'b', 'c'));
        app.use('/', rootRoutes, authRoutes, dashboardRoutes);
        app.use('/api/guilds/:id/music', 
            Deps.get(Middleware).updateUser,
            Deps.get(Middleware).validateUser,
            Deps.get(Middleware).updateGuilds,
            Deps.get(Middleware).validateGuild,
            Deps.get(Middleware).updateMusicPlayer,
            musicRoutes
        );


        app.use('/api', (req, res) => res.json({ hello: 'world' }));
        app.use('/api/', (req, res) => sendError(res, { code: 404, message: 'Not found.' }));

        app.all('*', (req, res) => res.render('errors/404', {
            subtitle: '404'
        }));
    
        app.listen(process.env.DASHBOARD_PORT, () => console.log(`Dashboard is running on port ${process.env.DASHBOARD_PORT}!`));
    }
}