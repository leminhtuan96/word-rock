function resetEditMyProfilePage(station_name = '', name = '', login_id = '', level ='') {
    let currentTab = $('#jqxTabs').jqxTabs('selectedItem');
    let url = 'users/edit-my-profile';
    setContentTab(url, currentTab, getEditMyProfile);
}
function editMyProfile() {
    let id = $('#edit-my-profile-id').val();
    let formData = new FormData();
    formData.append('station_name', $('#edit-my-profile-station-name').val());
    formData.append('level', $('#edit-my-profile-level').val());
    formData.append('telephone', $('#edit-my-profile-telephone').val());
    formData.append('mobile', $('#edit-my-profile-mobile').val());
    formData.append('email', $('#edit-my-profile-email').val());

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
                resetEditMyProfilePage();
            } else {
                onlyShowErrorMessage('Error!', response.message);
                $('#edit-my-profile-save').jqxButton({disabled: false});
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Edit my profile error. Please try again!');
                console.log('Edit my profile error' + errorThrown);
                $('#edit-my-profile-save').jqxButton({disabled: false});
            }
        },
    });
}

function editMyProfileChangePassword() {
    let id = $('#edit-my-profile-id').val();
    let formData = new FormData();
    formData.append('password', $('#edit-my-profile-change-password-user-password').val());
    formData.append('passwordConfirm', $('#edit-my-profile-change-password-user-passwordConfirm').val());

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
                $('#edit-my-profile-change-password-form').trigger("reset");
            } else {
                onlyShowErrorMessage('Error!', response.message);
            }
            $('#edit-my-profile-change-password-submit').jqxButton({disabled: false});
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Change password error. Please try again!');
                console.log('Change password error' + errorThrown);
                $('#edit-my-profile-change-password-submit').jqxButton({disabled: false});
            }
        },
    });
}
