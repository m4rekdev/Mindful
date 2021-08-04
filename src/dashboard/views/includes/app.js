$('.categories li').on('click', setCategory);

function setCategory() {
    $('.categories li').removeClass('active');
    $('.categories li').addClass('bg-transparent');
    $(this).removeClass('bg-transparent');
    $(this).addClass('active');

    const category = $(this)[0].id;
    console.log(category);
    $('.commands li').hide();
    $(`.commands .${category}`).show();

    const results = $(`.commands .${category}`);
    updateResultsText(results);
};

setCategory.bind($('.categories li')[0])();

$('#search + button').on('click', () => {
    const query = $('#search').val();
    if(!query.trim()) {
        updateResultsText(commands);
        $('.categories li').removeClass('active');
        $('.categories li').addClass('bg-transparent');
        return $('.commands li').show();
    }

    const results = new Fuse(commands, {
        isCaseSensitive: false,
        keys: [
            { name: 'name', weight: 1 },
            { name: 'category', weight: 0.5 }
        ]
    })
    .search(query)
    .map(r => r.item);
    $('.categories li').removeClass('active');
    $('.categories li').addClass('bg-transparent');
    $('.commands li').hide();

    for (const command of results) {
        $(`#${command.name}Command`).show();
    }

    updateResultsText(results);
});

function updateResultsText(results) {
    $('#commandError').text(
        (results.length <= 0)
        ? 'No results.'
        : '');
};