class HTMLMusicWrapper {
    #music;

    set apiError(error) {
        if (!error)
            $('#playerAPIError').addClass('d-none');

        $('#playerAPIError').removeClass('d-none');
        $('#playerAPIError').text(error.message ?? 'An unknown error occurred.');
    }

    constructor(musicClient) {
        this.#music = musicClient;
    }

    updateList() {
        $('.track-np').html(this.#nowPlaying());

        $('.track-list').html(
            (this.#music.list.length <= 0)
            ? '<p>The queue is empty.</p>'
            : this.#music.list
                .map(track => this.#htmlTrack(track))
                .join());

        $('.track-q .remove').on('click', async () => {
            const index = $('.track-q .remove').index('.remove');
            await this.#music.remove(index);
        });
    }

    #nowPlaying() {
        if (this.#music.list.length <= 0) 
            return `
            <img class="mr-3" />
            <span>
                <h6 class="mt-0">Nothing is playing..</h6>
                <p class="text-muted">...</p>
            </span>`;
        
        const track = this.#music.list[0];

        return `
            <img class="mr-3" src="${track.thumbnail}" />
            <span>
                <h6 class="mt-0">${track.title}</h6>
                <p class="text-muted">${track.author.name}</p>
            </span>`;
    }

    #htmlTrack(track) {
        return `
            <div class="track-q d-flex justify-content-between mt-4">
                <span>
                    <img class="mr-3" src="${track.thumbnail}" />
                    <span class="track-info">
                        <h6 class="mt-0">${track.title}</h6>
                        <p class="text-muted">${track.author.name}</p>
                    </span>
                </span>
                <div class="track-methods">
                    <span class="text-muted">${track.duration.timestamp}</span>
                    <button class="remove btn btn-danger ml-0"><i class="fas fa-times"></i></button>
                </div>
            </div>`;
    }
}