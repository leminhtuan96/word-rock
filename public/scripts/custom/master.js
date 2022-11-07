$(document).ready(function () {
    if ($(document).width() <= 600 ) {
        $('.sidebar-area').hide();
    } else {
        $('#main-splitter').jqxSplitter({ width: '100%', height: 'calc(100vh - 55px - 15px)', panels: [{ size: 230, min: 100 }]})
        $('#sidebar-tree').jqxTree({ width: '100%' });
    }
});
