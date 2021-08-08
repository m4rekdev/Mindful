import mongoose from 'mongoose';

export const SavedLog = mongoose.model('log', new mongoose.Schema({
    _id: String,
    changes: { type: Array, default: [] }
}));