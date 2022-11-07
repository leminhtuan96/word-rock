function showDetailCodesGrid(rowData, sourceDetail) {
    if (rowData) {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            url: '/api/codes/get-detail/' + rowData.ID,
            type: 'GET',
            dataType: 'JSON',
            success: function (response) {
                if (response.code === 200) {
                    sourceDetail.localdata = response.data;
                    $('#detail-codes-grid').jqxGrid('updatebounddata');
                } else {
                    onlyShowErrorMessage('Error!', response.message);
                    sourceDetail.localdata = [];
                    $('#detail-codes-grid').jqxGrid('updatebounddata');
                }
            },
            error: function (err, status, errorThrown) {
                if (err.status === 401) {
                    window.location.reload();
                } else {
                    onlyShowErrorMessage('Error!', 'Get detail codes list error. Please try again!');
                    console.log('Get detail codes list error ' + errorThrown);
                    sourceDetail.localdata = [];
                    $('#detail-codes-grid').jqxGrid('updatebounddata');
                }
            },
        });
    } else {
        sourceDetail.localdata = [];
        $('#detail-codes-grid').jqxGrid('updatebounddata');
    }
}

function showPopupMasterCodesEdit(editrow) {
    $('#master-codes-popup-edit').jqxValidator('hide');
    $("#master-codes-grid").jqxGrid('selectrow', editrow);
    let offset = $("#master-codes-grid").offset();
    $("#master-codes-popup-edit").jqxWindow({ position: { x: parseInt(offset.left) + 60, y: parseInt(offset.top) + 60 } });
    // get the clicked row's data and initialize the input fields.
    let dataRecord = $("#master-codes-grid").jqxGrid('getrowdata', editrow);
    $("#master-codes-popup-edit-uid").val(editrow);
    $("#master-codes-popup-edit-id").val(dataRecord.ID ? dataRecord.ID : '' );
    $("#master-codes-popup-edit-code").val(dataRecord.CODEM_CD ? dataRecord.CODEM_CD  : '' );
    $("#master-codes-popup-edit-name").val(dataRecord.CODEM_NAME ? dataRecord.CODEM_NAME : '');
    $("#master-codes-popup-edit-use-flag").val(dataRecord.USE_FLAG ? dataRecord.USE_FLAG : DETAIL_CODES.USE_FLAG.YES);
    // show the popup window.
    $("#master-codes-popup-edit").jqxWindow('open');
}

function showPopupDetailCodesEdit(editrow) {
    $("#detail-codes-grid").jqxGrid('selectrow', editrow);
    let offset = $("#detail-codes-grid").offset();
    $("#detail-codes-popup-edit").jqxWindow({ position: { x: parseInt(offset.left) + 60, y: parseInt(offset.top) + 60 } });
    // get the clicked row's data and initialize the input fields.
    let dataRecord = $("#detail-codes-grid").jqxGrid('getrowdata', editrow);
    $("#detail-codes-popup-edit-uid").val(editrow);
    $("#detail-codes-popup-edit-id").val(dataRecord.ID ? dataRecord.ID : '' );
    $("#detail-codes-popup-edit-code").val(dataRecord.CODED_CD ? dataRecord.CODED_CD : '');
    $("#detail-codes-popup-edit-name").val(dataRecord.CODED_NAME ? dataRecord.CODED_NAME : '');
    $("#detail-codes-popup-edit-sort").val(dataRecord.DISP_SORT ? dataRecord.DISP_SORT : 1);
    $("#detail-codes-popup-edit-use-flag").val(dataRecord.USE_FLAG ? dataRecord.USE_FLAG : DETAIL_CODES.USE_FLAG.YES);
    // show the popup window.
    $("#detail-codes-popup-edit").jqxWindow('open');
}

function saveChangedMasterCodeToStorage(data) {
    let master_codes = JSON.parse(localStorage.getItem("master_codes"));
    if (!master_codes) {
        master_codes = [];
        master_codes.push(data)
        localStorage.setItem("master_codes", JSON.stringify(master_codes))
    } else {
        let checkExist = false;
        master_codes = master_codes.map(item => {
            if (item.uid === data.uid) {
                checkExist = true;
                return {...item, ...data};
            }
            return item;
        })
        if (!checkExist) master_codes.push(data);
        localStorage.setItem("master_codes", JSON.stringify(master_codes))
    }
}

function saveDeletedMasterCodeToStorage(data) {
    let master_codes = JSON.parse(localStorage.getItem("master_codes"));
    if (master_codes) {
        master_codes = master_codes.filter( item => item.uid !== data.uid);
        localStorage.setItem("master_codes", JSON.stringify(master_codes))
    }
    if (data.id) {
        let delete_master_codes = JSON.parse(localStorage.getItem("delete_master_codes"));
        if (!delete_master_codes) {
            delete_master_codes = [];
        }
        delete_master_codes.push(data)
        localStorage.setItem("delete_master_codes", JSON.stringify(delete_master_codes))
    }
}

function saveChangedDetailCodeToStorage(data) {
    //disable master when edit detail
    $("#master-codes-grid").jqxGrid({ disabled: true});

    let detail_codes = JSON.parse(localStorage.getItem("detail_codes"));
    if (!detail_codes) {
        detail_codes = [];
        detail_codes.push(data)
        localStorage.setItem("detail_codes", JSON.stringify(detail_codes))
    } else {
        let checkExist = false;
        detail_codes = detail_codes.map(item => {
            if (item.uid === data.uid) {
                checkExist = true;
                return {...item, ...data};
            }
            return item;
        })
        if (!checkExist) detail_codes.push(data);
        localStorage.setItem("detail_codes", JSON.stringify(detail_codes))
    }
}

function saveDeletedDetailCodeToStorage(data) {
    //disable master when edit detail
    $("#master-codes-grid").jqxGrid({ disabled: true});

    let detail_codes = JSON.parse(localStorage.getItem("detail_codes"));
    if (detail_codes) {
        detail_codes = detail_codes.filter( item => item.uid !== data.uid);
        localStorage.setItem("detail_codes", JSON.stringify(detail_codes))
    }
    if (data.id) {
        let delete_detail_codes = JSON.parse(localStorage.getItem("delete_detail_codes"));
        if (!delete_detail_codes) {
            delete_detail_codes = [];
        }
        delete_detail_codes.push(data)
        localStorage.setItem("delete_detail_codes", JSON.stringify(delete_detail_codes))
    }
}

function resetCodesPage(code = '', name = '') {
    $('#master-codes-popup-edit').jqxWindow('destroy');
    $('#detail-codes-popup-edit').jqxWindow('destroy');
    let currentTab = $('#jqxTabs').jqxTabs('selectedItem');
    $.ajax({
        url: 'codes/',
        type: 'GET',
        success: function (data) {
            $('#jqxTabs').jqxTabs('setContentAt', currentTab, data);
            getCodes(code, name);
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

function codesSearchCodes() {
    let code = $('#codes-code').val();
    let name = $('#codes-name').val();
    resetCodesPage(code, name);
}

function saveCodes() {
    let master_codes = localStorage.getItem('master_codes');
    let detail_codes = localStorage.getItem('detail_codes');
    let delete_master_codes = localStorage.getItem('delete_master_codes');
    let delete_detail_codes = localStorage.getItem('delete_detail_codes');
    $('#codes-save').prop('disabled', true);
    let formData = new FormData();
    formData.append('master_codes', master_codes);
    formData.append('detail_codes', detail_codes);
    formData.append('delete_master_codes', delete_master_codes);
    formData.append('delete_detail_codes', delete_detail_codes);
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: '/api/codes/update',
        type: 'POST',
        data: formData,
        cache : false,
        contentType : false,
        processData: false,
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                onlyShowSuccessMessage('Success!', response.message);
                codesSearchCodes();
            } else {
                onlyShowErrorMessage('Error!', response.message);
                $('#codes-save').prop('disabled', false);
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Get detail codes list error. Please try again!');
                console.log('Edit codes error' + errorThrown);
                $('#codes-save').prop('disabled', false);
            }
        },
    });
}
function getKeyForValue(json, value) {
    for (let key in json) {
        if (json[key].ID == value) {
            return json[key].CODED_NAME;
        }
    }
}
