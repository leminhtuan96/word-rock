function resetGuestCreateASPage() {
    let currentTab = $('#jqxTabs').jqxTabs('selectedItem');
    let url = 'as/guest-create';
    setContentTab(url, currentTab, getGuestCreateAS);
}

function guestCreateAS() {
    let formData = new FormData();
    formData.append('ask_type', $('#guest-create-as-ask-type').val());
    formData.append('defect_type', $('#guest-create-as-defect-type').val());
    formData.append('ask_remark', $('#guest-create-as-ask-remark').val());
    formData.append('area1', $('#guest-create-as-station-area1').val());
    formData.append('area2', $('#guest-create-as-station-area2').val());
    formData.append('telephone', $('#guest-create-as-telephone').val());
    formData.append('location', $('#guest-create-as-location-name').val());
    formData.append('email', $('#guest-create-as-email').val());
    let nameImages = [];
    $('.jqx-file-upload-file-input').each(function (index) {
        if ($(this)[0].files.length !== 0) {
            if (!nameImages.includes($(this)[0].files[0].name)) {
                nameImages.push($(this)[0].files[0].name);
                formData.append('images[]', $(this)[0].files[0]);
            }
        }
    });

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        url: '/api/as/guest-store',
        type: 'POST',
        data: formData,
        cache : false,
        contentType : false,
        processData: false,
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                $("#success-message-window").height(225);
                $('#success-message-window-content').height(55);
                let htmlSuccess = '<div>감사합니다.</div>\n' +
                    '                <div>정상적으로 등록이 되었습니다.</div>\n' +
                    '                <div>빠른 시간에 연락 드리겠습니다.</div>';
                onlyShowSuccessMessage('Success!', htmlSuccess);
                resetGuestCreateASPage();
            } else {
                onlyShowErrorMessage('Error!', response.message);
                $('#guest-create-as-save').jqxButton({disabled: false});
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Create as error. Please try again!');
                console.log('Create as error' + errorThrown);
                $('#guest-create-as-save').jqxButton({disabled: false});
            }
        },
    });
}
