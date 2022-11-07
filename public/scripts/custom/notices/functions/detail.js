function resetDetailNoticesPage(id = '') {
    let currentTab = $('#jqxTabs').jqxTabs('selectedItem');
    $.ajax({
        url: `notices/detail?id=${id}`,
        type: 'GET',
        success: function (data) {
            $('#jqxTabs').jqxTabs('setContentAt', currentTab, data);
            getDetailNotices(id);
        },
        error: function (err) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Open tab error. Please try again!');
            }
        }
    });
}
