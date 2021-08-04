import { config } from 'dotenv';
config({ path: '.env' });

import express from 'express';
import pug from 'pug';

import Deps from '../utils/deps.js';
import { CommandHandler } from '../handlers/command-handler.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import rootRoutes from './routes/root-routes.js';
import authRoutes from './routes/auth-routes.js';
import dashboardRoutes from './routes/dashboard-routes.js';
import cookies from 'cookies';
import Middleware from './middleware.js';

export class Dashboard {

    init() {

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        const app = express();

        app.set('views', __dirname + '/views');
        app.set('view engine', 'pug');

        app.use(cookies.express('a', 'b', 'c'));
        app.use('/', Deps.get(Middleware).updateUser, rootRoutes, authRoutes);
        app.use('/dashboard', Deps.get(Middleware).validateUser, dashboardRoutes);

        app.get('*', (req, res) => res.render('errors/404', {
            subtitle: '404'
        }));
    
        app.listen(process.env.DASHBOARD_PORT, () => console.log(`Dashboard is running on port ${process.env.DASHBOARD_PORT}!`));
    }
}