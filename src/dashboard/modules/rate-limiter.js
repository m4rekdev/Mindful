import { config } from 'dotenv';
config({ path: '.env' });

import rateLimit from 'express-rate-limit';
import rateLimitStore from 'rate-limit-mongo';

export default rateLimit({
    max: 300,
    message: 'You are being rate limited.',
    store: new rateLimitStore({ uri: process.env.MONGO_URI }),
    windowMs: 60 * 1000
});