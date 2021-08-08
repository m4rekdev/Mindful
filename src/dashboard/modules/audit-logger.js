import Deps from '../../utils/deps.js';
import { Logs } from '../../data/logs.js';

export class AuditLogger {
    async change(id, change) {
        const log = await Deps.get(Logs).get(id);
        log.changes.push(change);
        await log.save();
    }
}