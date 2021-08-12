class HTMLMusicWrapper {
    #music;

    get currentTimestamp() {
        const position =  this.#music.position;

        const minutes = Math.floor(position / 60).toString().padStart(2, '0');
        const seconds = Math.floor(position - (minutes * 60)).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }

    set apiError(error) {
        if (!error)
            return $('#playerAPIError').addClass('d-none');
        
        $('#playerAPIError').removeClass('d-none');
        $('#playerAPIError p').text(error.message ?? 'Unknown error.');
    }

    constructor(musicClient) {
        this.#music = musicClient;

        setInterval(() => this.#updateSeeker(), 1000);
    }

    #updateSeeker() {
        if (!this.#music.isPlaying || this.#music.isPaused) return;

        this.#music.position++;

        $('#seekTrack input').val(this.#music.position);
        $('.current').text(this.currentTimestamp);
    }

    updateList() {
        const thisGlobal = this;

        $('.track-np').html(this.#nowPlaying());

        const track = (this.#music.isPlaying) ? this.#music.list[0] : null;
        if (track) {
            $('.current').text(this.currentTimestamp);
            $('.duration').text(track.duration.timestamp.toString().padStart(2, '0'));
            $('#seekTrack input').attr('max', track.duration.seconds)
        } else {
            $('.current, .duration').text('00:00');
        }

        $('.track-list').html(
            (!this.#music.isPlaying)
            ? '<p>The queue is empty.</p>'
            : this.#music.list
                .map(track => this.#htmlTrack(track))
                .join(''));

        $('.track-q .remove').on('click', async function() {
            const index = $(this).index('.remove');
            console.log(index);
            await thisGlobal.#music.remove(index);
        });
    }

    toggle() {
        $('#toggleTrack i').toggleClass('fas-pause');
        $('#toggleTrack i').toggleClass('fas-play');
    }

    #nowPlaying() {
        if (!this.#music.isPlaying) 
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