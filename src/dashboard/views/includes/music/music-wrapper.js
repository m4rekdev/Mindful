class MusicWrapper {
    #endpoint = `/api/guilds/${guildId}/player`;
    #html = new HTMLMusicWrapper(this);

    isPaused = false;
    list = [];
    position = $('#seekTrack input').val();

    get isPlaying() {
        return this.list.length > 0;
    }

    async #fetch(action) {
        try {
            const res = await fetch(`${this.#endpoint}/${action}`, {
                headers: { Authorization: key }
            });
            const json = await res.json();
            if (!res.ok)
                throw json;

            return json;
        } catch(error) {
            this.#html.apiError = error;
            throw new Error(error);
        }
    }

    async play(query) {
        try {
            const track = await this.#fetch(`play?q=${query}`);
            this.#html.apiError = null;
        } catch {}
        await this.updateList();
    }

    async stop() {
        try {
            await this.#fetch(`stop`);
            this.position = 0;
            this.#html.apiError = null;
        } catch {}
        await this.updateList();
    }

    async toggle() {
        try {
            await this.#fetch(`toggle`);
            this.isPaused = !this.isPaused;
            this.#html.toggle();
            this.#html.apiError = null;
        } catch {}
    }

    async setVolume(value) {
        try {
            await this.#fetch(`volume?v=${value}`);
            this.#html.apiError = null;
        } catch {}
    }

    async seek(to) {
        try {
            await this.#fetch(`seek?to=${to}`);
            this.position = to;
            this.#html.apiError = null;
        } catch {}
    }

    async remove(index) {
        try {
            const list = await this.#fetch(`remove?i=${index}`);
            await this.updateList(list);
            this.#html.apiError = null;
        } catch {}
    }
    
    async shuffle() {
        try {
            const list = await this.#fetch(`shuffle`);
            await this.updateList(list);
            this.#html.apiError = null;
        } catch {}
    }
    
    async skip() {
        try {
            const list = await this.#fetch(`skip`);
            this.position = 0;
            await this.updateList(list);
            this.#html.apiError = null;
        } catch {}
    }

    async updateList(list = null) {
        this.list = list ?? await this.#fetch('list');
        this.#html.updateList();
    }
}