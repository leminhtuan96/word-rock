function resetPermissionsPage(level = '', page_id = '') {
    let currentTab = $('#jqxTabs').jqxTabs('selectedItem');
    $.ajax({
        url: 'permissions/',
        type: 'GET',
        success: function (data) {
            $('#jqxTabs').jqxTabs('setContentAt', currentTab, data);
            getPermissions(level, page_id);
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

function permissionsSearch() {
    let new_level = $('#permissions-filter-user-level').val() ? $('#permissions-filter-user-level').val() : '';
    let new_page = $('#permissions-filter-page').jqxComboBox('getSelectedItem');
    let new_page_id = '';
    if (new_page) new_page_id = new_page.value;
    resetPermissionsPage(new_level, new_page_id);
}

function permissionsUpdatePermissions(edit_permissions) {
    let formData = new FormData();
    formData.append('edit_permissions', edit_permissions);
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: '/api/permissions/update',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                onlyShowSuccessMessage('Success!', response.message);
                permissionsSearch();
            } else {
                onlyShowErrorMessage('Error!', response.message);
                $('#permissions-save').prop('disabled', false);
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Get detail codes list error. Please try again!');
                console.log('Edit codes error' + errorThrown);
                $('#permissions-save').prop('disabled', false);
            }
        },
    })
}
