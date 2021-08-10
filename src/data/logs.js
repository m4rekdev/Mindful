import { SavedLog } from './models/log.js';

export class Logs {
    async get(id) {
        return await SavedLog.findById(id)
            ?? await SavedLog.create({ _id: id });
    }
}