$(async () => {
    const music = new MusicWrapper();

    await music.updateList();

    $('#shuffleList').on('click', () => music.shuffle());
    $('#skipTrack').on('click', () => music.skip());

    $('#stopTrack').on('click', () => music.stop());
    $('#toggleTrack').on('click', () => music.toggle());
    $('#trackSearch').on('click', async () => {
        const query = $('#searchInput').val();
        await music.play(query);
    });

    $('#seekTrack input').on('input', async function() {
        const to = +$(this).val();
        await music.seek(to);
    });

    $('#volume input').on('input', async function() {
        const value = +$(this).val();
        await music.setVolume(value);
    });
});