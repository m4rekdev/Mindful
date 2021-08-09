$('#themeSelect').on('change', function() {
    setTheme($(this).val());
});

function setTheme(theme) {
    localStorage.setItem('theme', theme);
    $('#themeSelect').val(theme);
    $('html').attr('theme', theme);
}

if (localStorage.getItem('theme') === 'null') {
    setTheme('DEFAULT');
} else {
    setTheme(localStorage.getItem('theme'));
}