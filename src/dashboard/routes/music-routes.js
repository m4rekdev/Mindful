import express from 'express';
import { sendError } from '../modules/api-utils.js';

const router = express.Router({ mergeParams: true });

router.get('/play', async (req, res) => {
    try {
        const track = await res.locals.player.play(req.query.q, res.locals.requestor);
        res.json(track);
    } catch (error) {
        sendError(res, error);
    }
});
router.get('/stop', async (req, res) => {
    try {
        await res.locals.player.stop();
        res.json(track);
    } catch (error) {
        sendError(res, error);
    }
});

export default router;