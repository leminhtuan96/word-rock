function resetStationsPage(keyword = '') {
    let currentTab = $('#jqxTabs').jqxTabs('selectedItem');
    $.ajax({
        url: 'stations/',
        type: 'GET',
        success: function (data) {
            $('#jqxTabs').jqxTabs('setContentAt', currentTab, data);
            getStations(keyword);
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

function stationSSearchStations() {
    let keyword = $('#stations-filter-keyword').val() ? $('#stations-filter-keyword').val() : '';
    resetStationsPage(keyword);
}

function deleteStation(id) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: `/api/stations/delete/${id}`,
        type: 'DELETE',
        success: function (response) {
            if (response.code === 200) {
                onlyShowSuccessMessage('Success!', response.message);
                stationSSearchStations();
            } else {
                onlyShowErrorMessage('Error!', response.message);
                $('#stations-delete').jqxButton({disabled: false});
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Delete station error. Please try again!');
                console.log('Delete station error ' + errorThrown);
                $('#stations-delete').jqxButton({disabled: false});
            }
        },
    });
}

function createStation() {
    let formData = new FormData();
    formData.append('name', $('#stations-create-name').val());
    formData.append('repr_name', $('#stations-create-repr-name').val());
    formData.append('group', $('#stations-create-group').val());
    formData.append('manager', $('#stations-create-manager').val());
    formData.append('type', $('#stations-create-type').val());
    formData.append('hhld_cnt', $('#stations-create-hhld-cnt').val());
    formData.append('telephone', $('#stations-create-telephone').val());
    formData.append('code', $('#stations-create-reg-code').val());
    formData.append('ctrl_cnt', $('#stations-create-ctrl-cnt').val());
    formData.append('mobile', $('#stations-create-mobile').val());
    formData.append('area1', $('#stations-create-area1').val());
    formData.append('locker_cnt', $('#stations-create-locker-cnt').val());
    formData.append('email', $('#stations-create-email').val());
    formData.append('area2', $('#stations-create-area2').val());
    formData.append('detail_address', $('#stations-create-detail-address').val());
    formData.append('maint_type', $('#stations-create-maint-type').val());
    formData.append('maint_end_ymd', $('#stations-create-maint-end-ymd').val());

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        url: '/api/stations/store',
        type: 'POST',
        data: formData,
        cache : false,
        contentType : false,
        processData: false,
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                onlyShowSuccessMessage('Success!', response.message);
                stationSSearchStations();
            } else {
                onlyShowErrorMessage('Error!', response.message);
                $('#stations-save').jqxButton({disabled: false});
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Create station error. Please try again!');
                console.log('Create station error' + errorThrown);
                $('#stations-save').jqxButton({disabled: false});
            }
        },
    });
}

function editStation() {
    let id = $('#stations-edit-id').val();
    let formData = new FormData();
    formData.append('name', $('#stations-edit-name').val());
    formData.append('repr_name', $('#stations-edit-repr-name').val());
    formData.append('group', $('#stations-edit-group').val());
    formData.append('manager', $('#stations-edit-manager').val());
    formData.append('type', $('#stations-edit-type').val());
    formData.append('hhld_cnt', $('#stations-edit-hhld-cnt').val());
    formData.append('telephone', $('#stations-edit-telephone').val());
    formData.append('code', $('#stations-edit-reg-code').val());
    formData.append('ctrl_cnt', $('#stations-edit-ctrl-cnt').val());
    formData.append('mobile', $('#stations-edit-mobile').val());
    formData.append('area1', $('#stations-edit-area1').val());
    formData.append('locker_cnt', $('#stations-edit-locker-cnt').val());
    formData.append('email', $('#stations-edit-email').val());
    formData.append('area2', $('#stations-edit-area2').val());
    formData.append('detail_address', $('#stations-edit-detail-address').val());
    formData.append('maint_type', $('#stations-edit-maint-type').val());
    formData.append('maint_end_ymd', $('#stations-edit-maint-end-ymd').val());

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        url: `/api/stations/update/${id}`,
        type: 'POST',
        data: formData,
        cache : false,
        contentType : false,
        processData: false,
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                onlyShowSuccessMessage('Success!', response.message);
                stationSSearchStations();
            } else {
                onlyShowErrorMessage('Error!', response.message);
                $('#stations-save').jqxButton({disabled: false});
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Edit station error. Please try again!');
                console.log('Edit station error' + errorThrown);
                $('#stations-save').jqxButton({disabled: false});
            }
        },
    });
}
