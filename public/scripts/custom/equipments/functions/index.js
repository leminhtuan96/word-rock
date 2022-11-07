function deleteEquipment(id) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: `/api/equipments/delete/${id}`,
        type: 'DELETE',
        success: function (response) {
            if (response.code === 200) {
                onlyShowSuccessMessage('Success!', response.message);
                equipmentsSearchEquipments();
            } else {
                onlyShowErrorMessage('Error!', response.message);
                $('#equipments-delete').jqxButton({disabled: false});
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Delete equipment error. Please try again!');
                console.log('Delete equipment error ' + errorThrown);
                $('#equipments-delete').jqxButton({disabled: false});
            }
        },
    });
}

function resetEquipmentsPage(kind = '', name = '', model = '', purc_name = '') {
    let currentTab = $('#jqxTabs').jqxTabs('selectedItem');
    $.ajax({
        url: 'equipments/',
        type: 'GET',
        success: function (data) {
            $('#jqxTabs').jqxTabs('setContentAt', currentTab, data);
            getEquipments(kind, name, model, purc_name);
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Open tab error. Please try again!');
            }
        }
    });
}

function equipmentsSearchEquipments() {
    let kind = $('#equipments-filter-kind').val() ? $('#equipments-filter-kind').val() : '';
    let name = $('#equipments-filter-name').val() ? $('#equipments-filter-name').val() : '';
    let model = $('#equipments-filter-model').val() ? $('#equipments-filter-model').val() : '';
    let purc_name = $('#equipments-filter-purc-name').val() ? $('#equipments-filter-purc-name').val() : '';
    resetEquipmentsPage(kind, name, model, purc_name);
}

function createEquipment() {
    let formData = new FormData();
    formData.append('kind', $('#equipments-create-kind').val());
    formData.append('name', $('#equipments-create-name').val());
    formData.append('model', $('#equipments-create-model').val());
    formData.append('manu_name', $('#equipments-create-manu-name').val());
    formData.append('manu_ym', $('#equipments-create-manu-ym').val());
    formData.append('os', $('#equipments-create-os').val());
    formData.append('touch_method', $('#equipments-create-touch-method').val());
    formData.append('power', $('#equipments-create-power').val());
    formData.append('interface', $('#equipments-create-interface').val());
    formData.append('purc_mth', $('#equipments-create-purc-mth').val());
    formData.append('purc_name', $('#equipments-create-purc-name').val());
    formData.append('telephone', $('#equipments-create-telephone').val());
    formData.append('use_flag', $('#equipments-create-use-flag').val());

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        url: '/api/equipments/store',
        type: 'POST',
        data: formData,
        cache : false,
        contentType : false,
        processData: false,
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                onlyShowSuccessMessage('Success!', response.message);
                equipmentsSearchEquipments();
            } else {
                onlyShowErrorMessage('Error!', response.message);
                $('#equipments-save').jqxButton({disabled: false});
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Create equipment error. Please try again!');
                console.log('Create equipment error' + errorThrown);
                $('#equipments-save').jqxButton({disabled: false});
            }
        },
    });
}

function editEquipment() {
    let id = $('#equipments-edit-id').val();
    let formData = new FormData();
    formData.append('kind', $('#equipments-edit-kind').val());
    formData.append('name', $('#equipments-edit-name').val());
    formData.append('model', $('#equipments-edit-model').val());
    formData.append('manu_name', $('#equipments-edit-manu-name').val());
    formData.append('manu_ym', $('#equipments-edit-manu-ym').val());
    formData.append('os', $('#equipments-edit-os').val());
    formData.append('touch_method', $('#equipments-edit-touch-method').val());
    formData.append('power', $('#equipments-edit-power').val());
    formData.append('interface', $('#equipments-edit-interface').val());
    formData.append('purc_mth', $('#equipments-edit-purc-mth').val());
    formData.append('purc_name', $('#equipments-edit-purc-name').val());
    formData.append('telephone', $('#equipments-edit-telephone').val());
    formData.append('use_flag', $('#equipments-edit-use-flag').val());

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        url: `/api/equipments/update/${id}`,
        type: 'POST',
        data: formData,
        cache : false,
        contentType : false,
        processData: false,
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                onlyShowSuccessMessage('Success!', response.message);
                equipmentsSearchEquipments();
            } else {
                onlyShowErrorMessage('Error!', response.message);
                $('#equipments-save').jqxButton({disabled: false});
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Edit equipment error. Please try again!');
                console.log('Edit equipment error' + errorThrown);
                $('#equipments-save').jqxButton({disabled: false});
            }
        },
    });
}
