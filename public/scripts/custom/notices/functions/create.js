function resetCreateNoticesPage() {
    let currentTab = $('#jqxTabs').jqxTabs('selectedItem');
    let url = 'notices/create';
    setContentTab(url, currentTab, getCreateNotices);
}

function createNoticesSubmit() {
    let formData = new FormData();
    formData.append('name', $('#create-notices-name').val());
    formData.append('dept_id', $('#create-notices-dept').val());
    formData.append('content', $('#create-notices-content').jqxEditor('val'));
    let nameFiles = [];
    $('.jqx-file-upload-file-input').each(function (index) {
        if ($(this)[0].files.length !== 0) {
            if (!nameFiles.includes($(this)[0].files[0].name)) {
                nameFiles.push($(this)[0].files[0].name);
                formData.append('attachments[]', $(this)[0].files[0]);
            }
        }
    });
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        url: '/api/notices/create',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                onlyShowSuccessMessage('Success!', response.message);
                resetCreateNoticesPage();
            } else {
                onlyShowErrorMessage('Error!', response.message);
                $('#create-notices-save').jqxButton({disabled: false});
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Create notice error. Please try again!');
                console.log('Create notice error' + errorThrown);
                $('#create-notices-save').jqxButton({disabled: false});
            }
        },
    });
}
