import { config } from 'dotenv';
config({ path: '.env' });

import rateLimit from 'express-rate-limit';
import rateLimitStore from 'rate-limit-mongo';
import { sendError } from './api-utils.js';

export default rateLimit({
    max: 300,
    message: { code: 429, message: 'You are being rate limited.' },
    store: new rateLimitStore({ uri: process.env.MONGO_URI }),
    windowMs: 60 * 1000
});