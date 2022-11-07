function resetRegisterUserPage() {
    let currentTab = $('#jqxTabs').jqxTabs('selectedItem');
    let url = 'users/register';
    setContentTab(url, currentTab, getRegisterUser);
}

function registerUser() {
    let formData = new FormData();
    formData.append('name', $('#register-user-name').val());
    formData.append('loginId', $('#register-user-loginId').val());
    formData.append('password', $('#register-user-password').val());
    formData.append('passwordConfirm', $('#register-user-passwordConfirm').val());
    formData.append('area1', $('#register-user-area1').val());
    formData.append('area2', $('#register-user-area2').val());
    formData.append('stationName', $('#register-user-station-name').val());
    formData.append('telephone', $('#register-user-telephone').val());
    formData.append('mobile', $('#register-user-mobile').val());
    formData.append('email', $('#register-user-email').val());

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        url: '/api/users/register-store',
        type: 'POST',
        data: formData,
        cache : false,
        contentType : false,
        processData: false,
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                // $('#messageNotificationAjax').html(
                //     htmlNotificationSuccess(response.message)
                // );
                $('#success-message-window-title').html('Success!')
                $('#success-message-window-content').html(response.message)
                $("#success-message-window").jqxWindow('open');
                $('#success-message-window').on('close', function (event) {
                    resetRegisterUserPage();
                });
            } else {
                onlyShowErrorMessage('Error!', response.message);
                $('#register-user-save').jqxButton({disabled: false});
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Create user error. Please try again!');
                console.log('Create user error' + errorThrown);
                $('#register-user-save').jqxButton({disabled: false});
            }
        },
    });
}
