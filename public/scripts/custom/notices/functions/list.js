function resetListNoticesPage(new_type = '', new_keyword = '') {
    let currentTab = $('#jqxTabs').jqxTabs('selectedItem');
    $.ajax({
        url: 'notices/list',
        type: 'GET',
        success: function (data) {
            $('#jqxTabs').jqxTabs('setContentAt', currentTab, data);
            getListNotices(new_type, new_keyword);
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

function listNoticesSearchNotices() {
    let new_type = $('#list-notices-filter-type').val() ? $('#list-notices-filter-type').val() : '';
    let new_keyword = $('#list-notices-filter-keyword').val() ? $('#list-notices-filter-keyword').val() : '';
    resetListNoticesPage(new_type, new_keyword);
}
