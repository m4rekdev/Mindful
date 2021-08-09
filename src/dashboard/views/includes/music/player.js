$(async () => {
    const music = new MusicWrapper();

    await music.updateList();

    $('#stopTrack').on('click', () => music.stop());
    $('#trackSearch').on('click', async () => {
        const query = $('#searchInput').val();
        await music.play(query);
    });
});