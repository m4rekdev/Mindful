import mongoose from 'mongoose';

class SettingsModule {
    prefix = '.';
    blacklistedChannelIds = [];
}

export const SavedGuild = mongoose.model('guild', new mongoose.Schema({
    _id: String,
    settings: { type: Object, default: new SettingsModule() }
}));