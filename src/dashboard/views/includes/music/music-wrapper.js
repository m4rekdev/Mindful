class MusicWrapper {
    #endpoint = `/api/guilds/${guildId}/player`;
    #html = new HTMLMusicWrapper(this);
    list = [];

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
            throw error;
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
            const track = await this.#fetch(`stop`);
            this.#html.apiError = null;
        } catch {}
        await this.updateList();
    }

    async remove(index) {
        try {
            const list = await this.#fetch(`remove?i=${index}`);
            this.#html.apiError = null;
            await this.updateList(list);
        } catch {}
    }

    async updateList(list = null) {
        console.log(list);
        this.list = list ?? await this.#fetch('list');
        this.#html.updateList();
    }
}