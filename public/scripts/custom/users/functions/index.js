function resetUsersPage(station_name = '', name = '', login_id = '', level ='') {
    let currentTab = $('#jqxTabs').jqxTabs('selectedItem');
    $.ajax({
        url: 'users/',
        type: 'GET',
        success: function (data) {
            $('#jqxTabs').jqxTabs('setContentAt', currentTab, data);
            getUsers(station_name, name, login_id, level);
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

function usersSearchUsers() {
    let station_name = $('#users-filter-station-name').val() ? $('#users-filter-station-name').val() : '';
    let name = $('#users-filter-name').val() ? $('#users-filter-name').val() : '';
    let login_id = $('#users-filter-login-id').val() ? $('#users-filter-login-id').val() : '';
    let level = $('#users-filter-level').val() ? $('#users-filter-level').val() : '';
    resetUsersPage(station_name, name, login_id, level);
}

function changePassword() {
    let id = $('#edit-user-id').val();
    let formData = new FormData();
    formData.append('password', $('#change-password-user-password').val());
    formData.append('passwordConfirm', $('#change-password-user-passwordConfirm').val());

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        url: `/api/users/change-password/${id}`,
        type: 'POST',
        data: formData,
        cache : false,
        contentType : false,
        processData: false,
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                onlyShowSuccessMessage('Success!', response.message);
                $('#change-password-user-form').trigger("reset");
            } else {
                onlyShowErrorMessage('Error!', response.message);
            }
            $('#change-password-user-change-password').jqxButton({disabled: false});
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Change password error. Please try again!');
                console.log('Change password error' + errorThrown);
                $('#change-password-user-change-password').jqxButton({disabled: false});
            }
        },
    });
}

function editUser() {
    let id = $('#edit-user-id').val();
    let formData = new FormData();
    formData.append('station_name', $('#edit-user-station-name').val());
    formData.append('level', $('#edit-user-level').val());
    formData.append('telephone', $('#edit-user-telephone').val());
    formData.append('mobile', $('#edit-user-mobile').val());
    formData.append('email', $('#edit-user-email').val());

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        url: `/api/users/update/${id}`,
        type: 'POST',
        data: formData,
        cache : false,
        contentType : false,
        processData: false,
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                onlyShowSuccessMessage('Success!', response.message);
                resetUsersPage();
            } else {
                onlyShowErrorMessage('Error!', response.message);
                $('#users-save').jqxButton({disabled: false});
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Edit user error. Please try again!');
                console.log('Edit user error' + errorThrown);
                $('#users-save').jqxButton({disabled: false});
            }
        },
    });
}

function deleteUser(id) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: `/api/users/delete/${id}`,
        type: 'DELETE',
        success: function (response) {
            if (response.code === 200) {
                onlyShowSuccessMessage('Success!', response.message);
                resetUsersPage();
            } else {
                onlyShowErrorMessage('Error!', response.message);
                $('#users-delete').jqxButton({disabled: false});
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Delete user error. Please try again!');
                console.log('Delete user error ' + errorThrown);
                $('#users-delete').jqxButton({disabled: false});
            }
        },
    });
}
function usersDumpDataIntoTheForm(data) {
    $("#edit-user-id").val(data.ID);
    $("#edit-user-name").val(data.USER_NAME ? data.USER_NAME : '');
    $("#edit-user-loginId").val(data.LOGIN_ID ? data.LOGIN_ID : '');
    $("#edit-user-station-name").val(data.STATION_NAME ? data.STATION_NAME : '');
    $("#edit-user-level").val(data.USER_LVL ? data.USER_LVL : '');
    $("#edit-user-telephone").val(data.TEL_NO ? data.TEL_NO : '');
    $("#edit-user-mobile").val(data.MOBL_NO ? data.MOBL_NO : '');
    $("#edit-user-email").val(data.EMAIL ? data.EMAIL : '');
}
