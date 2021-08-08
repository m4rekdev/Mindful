import { MusicClient } from '@2pg/music';

export class {
    #client = new MusicClient();

    get(options) {
        return this.#client.get(options.guildId)
            ?? this.#client.create(options.guildId, options);
    }
}