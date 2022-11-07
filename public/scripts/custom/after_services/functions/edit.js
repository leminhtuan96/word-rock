function resetEditASPage(keyword = '', start = formatOnlyDate(new Date()), end = formatOnlyDate(new Date()), use_date = '', except_complete = 'Y') {
    $('#edit-as-form-choose-locker-window').jqxWindow('destroy');
    let currentTab = $('#jqxTabs').jqxTabs('selectedItem');
    let url = `as/edit?keyword=${keyword}&start=${start}&end=${end}&use_date=${use_date}&except_complete=${except_complete}`;
    setContentTab(url, currentTab, getEditAS);
}

function editASDeleteAS(id) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: `/api/as/delete/${id}`,
        type: 'DELETE',
        success: function (response) {
            if (response.code === 200) {
                onlyShowSuccessMessage('Success!', response.message);
                searchEditAS();
            } else {
                onlyShowErrorMessage('Error!', response.message);
                $('#edit-as-delete').jqxButton({disabled: false});
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Delete AS error. Please try again!');
                console.log('Delete AS error ' + errorThrown);
                $('#edit-as-delete').jqxButton({disabled: false});
            }
        },
    });
}

function editASRedirectHandle(as_id = '') {
    let today = formatOnlyDate(new Date());
    let urlApi = `as/handle?start=${today}&end=${today}&except_complete=Y`;
    if (as_id) {
        urlApi = `as/handle?as_id=${as_id}&start=${today}&end=${today}`;
    }
    let new_tab_title = 'A/S 처리등록';
    let index_exist = null;
    //check tab exist
    $('#jqxTabs .jqx-tabs-headerWrapper ul li').each(function (index) {
        let title = $(this).find('.jqx-tabs-titleContentWrapper').text();
        if (title === new_tab_title) {
            index_exist = index;
            return false;
        }
    });
    if (index_exist === null) {
        $('#jqxTabs').jqxTabs('addLast', new_tab_title, '');
        $('#jqxTabs').jqxTabs('ensureVisible', -1);
        let index_selected = $("#jqxTabs").val();
        $.ajax({
            url: urlApi,
            type: 'GET',
            success: function (data) {
                $('#jqxTabs').jqxTabs('setContentAt', index_selected, data);
                getHandleAS(as_id);
            },
            error: function (err, status, errorThrown) {
                if (err.status === 401) {
                    window.location.reload();
                } else {
                    onlyShowErrorMessage('Error!', 'Open tab error. Please try again!');
                }
            }
        });
    } else {
        $('#jqxTabs').jqxTabs('select', index_exist);
        $.ajax({
            url: urlApi,
            type: 'GET',
            success: function (data) {
                $('#jqxTabs').jqxTabs('setContentAt', index_exist, data);
                getHandleAS(as_id);
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
}

function editASRedirectDetailLocker(locker_id) {
    let new_tab_title = '보관함 상세내역';
    let index_exist = null;
    //check tab exist
    $('#jqxTabs .jqx-tabs-headerWrapper ul li').each(function (index) {
        let title = $(this).find('.jqx-tabs-titleContentWrapper').text();
        if (title === new_tab_title) {
            index_exist = index;
            return false;
        }
    });
    if (index_exist === null) {
        $('#jqxTabs').jqxTabs('addLast', new_tab_title, '');
        $('#jqxTabs').jqxTabs('ensureVisible', -1);
        let index_selected = $("#jqxTabs").val();
        $.ajax({
            url: 'lockers/detail',
            type: 'GET',
            success: function (data) {
                $('#jqxTabs').jqxTabs('setContentAt', index_selected, data);
                getLockersDetail(locker_id);
            },
            error: function (err, status, errorThrown) {
                if (err.status === 401) {
                    window.location.reload();
                } else {
                    onlyShowErrorMessage('Error!', 'Open tab error. Please try again!');
                }
            }
        });
    } else {
        $('#jqxTabs').jqxTabs('select', index_exist);
        $.ajax({
            url: 'lockers/detail',
            type: 'GET',
            success: function (data) {
                $('#jqxTabs').jqxTabs('setContentAt', index_exist, data);
                getLockersDetail(locker_id);
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

}

function searchEditAS() {
    let keyword = $('#edit-as-filter-keyword').val() ? $('#edit-as-filter-keyword').val() : '';
    let start = $('#edit-as-filter-date-receipt-start').val() ? $('#edit-as-filter-date-receipt-start').val() : '';
    let end = $('#edit-as-filter-date-receipt-end').val() ? $('#edit-as-filter-date-receipt-end').val() : '';
    let use_date = $('#edit-as-filter-use-date').is(":checked") ? '' : 'Y';
    let except_complete = $('#edit-as-filter-except-complete').is(":checked") ? 'Y' : '';
    resetEditASPage(keyword, start, end, use_date, except_complete);
}

function getASByLocker(locker_id = '', sourceAS, as_id) {
    let start = $('#edit-as-filter-date-receipt-start').val() ? $('#edit-as-filter-date-receipt-start').val() : '';
    let end = $('#edit-as-filter-date-receipt-end').val() ? $('#edit-as-filter-date-receipt-end').val() : '';
    let use_date = $('#edit-as-filter-use-date').is(":checked") ? '' : 'Y';
    let except_complete = $('#edit-as-filter-except-complete').is(":checked") ? 'Y' : '';
    //active selected locker
    let url = `/api/as/get-by-locker?locker_id=${locker_id}&start=${start}&end=${end}&use_date=${use_date}&except_complete=${except_complete}`;
    if (!locker_id) {
        let locker_element = $('#edit-as-lockers-menu ul li').first();
        locker_element.attr('id', 'edit-as-item-locker-active');
    } else {
        $(`#edit-as-lockers-menu li[data-id=${locker_id}]`).attr('id', 'edit-as-item-locker-active');
    }

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                // prepare the data
                sourceAS.localdata = response.data;
                $('#edit-as-grid').jqxGrid('updatebounddata');
                if (as_id) {
                    let as_select_index = response.data.findIndex(e => e.ID == as_id);
                    if (as_select_index > -1) {
                        $("#edit-as-grid").jqxGrid('selectrow', as_select_index);
                        $("#edit-as-lockers-menu").jqxMenu({width: '100%', mode: 'vertical'}).css('visibility', 'visible');
                        setTimeout(function () {
                            $('#edit-as').show();
                            $('#edit-as-loader').jqxLoader('close');
                            //splitter
                            if (screenHeight > 960) {
                                $('#edit-as-splitter').jqxSplitter({ width: '100%', height: PAGE_CONTENT_HEIGHT, orientation: 'horizontal', panels: [{ size: 402, min: 150 }, { min: 100}]});
                            } else {
                                $('#edit-as-splitter').jqxSplitter({ width: '100%', height: PAGE_CONTENT_HEIGHT, orientation: 'horizontal', panels: [{ size: '55%', min: 150 }, { size: '45%', min: 100}]});
                            }
                        }, SET_TIMEOUT_LOADER);
                    } else {
                        $('#edit-as-grid').jqxGrid('clearselection');
                    }
                } else {
                    $('#edit-as-grid').jqxGrid('clearselection');
                }
            } else {
                onlyShowErrorMessage('Error!', response.message);
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Get as list error. Please try again!');
                console.log('Get as list error ' + errorThrown);
            }
        },
    });
}

function editASShowPage(data = []) {
    $("#edit-as-lockers-menu").jqxMenu({width: '100%', mode: 'vertical'}).css('visibility', 'visible');
    setTimeout(function () {
        $('#edit-as').show();
        $('#edit-as-loader').jqxLoader('close');
        $('#edit-as-form-area').hide();
        $('#edit-as-create-as-form-area').show();
        //splitter
        if (screenHeight > 960) {
            $('#edit-as-splitter').jqxSplitter({ width: '100%', height: PAGE_CONTENT_HEIGHT, orientation: 'horizontal', panels: [{ size: 402, min: 150 }, { min: 100}]});
        } else {
            $('#edit-as-splitter').jqxSplitter({ width: '100%', height: PAGE_CONTENT_HEIGHT, orientation: 'horizontal', panels: [{ size: '55%', min: 150 }, { size: '45%', min: 100}]});
        }
    }, SET_TIMEOUT_LOADER);
}

function editAS() {
    let id = $('#edit-as-form-id').val();
    let formData = new FormData();
    formData.append('ask_type', $('#edit-as-form-ask-type').val());
    formData.append('defect_type', $('#edit-as-form-defect-type').val());
    formData.append('emergency_type', $('#edit-as-form-emergency-type').val());
    formData.append('plan_date', $('#edit-as-form-plan-date').val());
    formData.append('complete_date', $('#edit-as-form-complete-date').val());
    let manager = $('#edit-as-form-manager').jqxComboBox('getSelectedItem');
    if (manager) formData.append('manager_id', manager.value);
    formData.append('ask_remark', $('#edit-as-form-ask-remark').val());
    if ($('#edit-as-form-new-locker-id').val()) {
        formData.append('locker_id', $('#edit-as-form-new-locker-id').val());
    } else {
        formData.append('locker_id', $('#edit-as-form-locker-id').val());
    }
    formData.append('phone', $('#edit-as-form-user-phone').val());
    formData.append('email', $('#edit-as-form-user-email').val());

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: `/api/as/update/${id}`,
        type: 'POST',
        data: formData,
        cache : false,
        contentType : false,
        processData: false,
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                onlyShowSuccessMessage('Success!', response.message);
                searchEditAS();
            } else {
                onlyShowErrorMessage('Error!', response.message);
                $('#edit-as-save').jqxButton({disabled: false});
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Edit AS error. Please try again!');
                console.log('Edit station error' + errorThrown);
                $('#edit-as-save').jqxButton({disabled: false});
            }
        },
    });
}

function editASShowChooseLockerPopup(lockerId) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: `/api/lockers`,
        type: 'GET',
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                $('#edit-as-form-choose-locker-window-content').jqxGrid('clearselection');
                let source =
                    {
                        localdata: response.data,
                        dataType: "array",
                        datafields:
                            [
                                {name: 'ID', type: 'number'},
                                {name: 'STATION_ID', type: 'number'},
                                {name: 'STATION_NAME', type: 'string'},
                                {name: 'STATION_CODE', type: 'string'},
                                {name: 'STATION_AREA', type: 'string'},
                                {name: 'STATION_MNGR_NM', type: 'string'},
                                {name: 'STATION_TEL_NO', type: 'string'},
                                {name: 'STATION_TYPE', type: 'number'},
                                {name: 'STATION_TYPE_NAME', type: 'string'},
                                {name: 'STATION_MAINT_TYPE', type: 'number'},
                                {name: 'STATION_MOBL_NO', type: 'string'},
                                {name: 'STATION_MAINT_END_YMD', type: 'string'},
                                {name: 'STATION_REPR_NM', type: 'string'},
                                {name: 'LOCKER_NAME', type: 'string'},
                                {name: 'LOCKER_KIND', type: 'number'},
                                {name: 'LOCKER_KIND_NAME', type: 'number'},
                                {name: 'CTRL_BOX_TYPE', type: 'number'},
                                {name: 'COMPTR_TYPE', type: 'number'},
                                {name: 'MONTR_SIZE', type: 'number'},
                                {name: 'LOCKER_CNT', type: 'number'},
                                {name: 'LOCK_KIND', type: 'number'},
                                {name: 'UNIT_CODE', type: 'string'},
                                {name: 'RADIAL_NO', type: 'string'},
                                {name: 'MCU_KIND', type: 'number'},
                                {name: 'SUB_MCU_YN', type: 'number'},
                                {name: 'RFID_READER', type: 'number'},
                                {name: 'WEBCAM', type: 'number'},
                                {name: 'PRINTER', type: 'number'},
                                {name: 'CASH_TERMINAL', type: 'number'},
                                {name: 'CARD_TERMINAL', type: 'number'},
                                {name: 'BANKNOTE_INSERTER', type: 'number'},
                                {name: 'BANKNOTE_DISPENSER', type: 'number'},
                                {name: 'COIN_INSERTER', type: 'number'},
                                {name: 'COIN_DISPENSER', type: 'number'},
                                {name: 'USE_FLAG', type: 'number'},
                                {name: 'USE_FLAG_NAME', type: 'string'},
                            ],
                    };
                let dataAdapter = new $.jqx.dataAdapter(source);
                // create jqxGrid.
                $("#edit-as-form-choose-locker-window-content").jqxGrid(
                    {
                        width: '98.5%',
                        source: dataAdapter,
                        sortable: true,
                        showfilterrow: true,
                        filterrowheight: ROW_HEIGHT + 7,
                        filterable: true,
                        autoheight: true,
                        pageable: true,
                        pagerheight: ROW_HEIGHT + 7,
                        columnsresize: true,
                        columnsreorder: true,
                        columnsheight: ROW_HEIGHT,
                        rowsheight: ROW_HEIGHT,
                        ready: function () {
                            // $("#edit-as-form-choose-locker-window-content").jqxGrid('selectrow', 0);
                        },
                        altrows: true,
                        columns: [
                            { text: '보관함명', align: 'center', datafield: 'LOCKER_NAME', width: '20%'},
                            { text: 'Station 명', align: 'center', datafield: 'STATION_NAME', width: '20%'},
                            { text: '지역', align: 'center', datafield: 'STATION_AREA', width: '15%'},
                            { text: '세부지역', align: 'center', datafield: 'AREA2_NM', width: '15%'},
                            { text: '종류', align: 'center', dataField: 'LOCKER_KIND_NAME', width: '10%'},
                            { text: '담당자', align: 'center', datafield: 'STATION_MNGR_NM', width: '10%'},
                            { text: '연락처', align: 'center', datafield: 'STATION_TEL_NO', width: '10%'},
                        ]
                    });
                if (lockerId) {
                    let rows = $("#edit-as-form-choose-locker-window-content").jqxGrid('getrows');
                    rows.forEach(function (row) {
                        if (row.ID == lockerId) {
                            $("#edit-as-form-choose-locker-window-content").jqxGrid('selectrow', row.uid);
                            return false;
                        }
                    });
                }

                $("#edit-as-form-choose-locker-window").jqxWindow({height: (190 + (response.data.length > 0 ? (response.data.length > 10 ? 10 : response.data.length) * ROW_HEIGHT : ROW_HEIGHT))});
                $("#edit-as-form-choose-locker-window").jqxWindow('open');

                //handle choose parent
                $('#edit-as-form-choose-locker-window-ok').on('click', function () {
                    let selectedRowIndex = $('#edit-as-form-choose-locker-window-content').jqxGrid('getselectedrowindex');
                    let dataRecord = $("#edit-as-form-choose-locker-window-content").jqxGrid('getrowdata', selectedRowIndex);
                    editASFormSetValueAfterChooseLocker(dataRecord)
                    $("#edit-as-form-choose-locker-window").jqxWindow('close');
                    $('#edit-as-create-as-form').jqxValidator('hideHint', '#edit-as-create-as-form-locker-name');
                })
                $('#edit-as-form-choose-locker-window-content').on('rowdoubleclick', function (event)
                {
                    let args = event.args;
                    let dataRecord = args.row.bounddata;
                    editASFormSetValueAfterChooseLocker(dataRecord)
                    $("#edit-as-form-choose-locker-window").jqxWindow('close');
                    $('#edit-as-create-as-form').jqxValidator('hideHint', '#edit-as-create-as-form-locker-name');
                });
            } else {
                onlyShowErrorMessage('Error!', response.message);
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Get lockers error. Please try again!');
                console.log('Get lockers error ' + errorThrown);
            }
        },
    })
}

function sendUrlCreateAS() {
    let formData = new FormData();
    if ($('#edit-as-create-as-form-area').is(":visible")) {
        formData.append('email', $('#edit-as-create-as-send-url-create-as-email').val());
    } else {
        formData.append('email', $('#edit-as-send-url-create-as-email').val());
    }
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        url: `/api/as/send-url-create-as`,
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                onlyShowSuccessMessage('Success!', response.message);
                if ($('#edit-as-create-as-form-area').is(":visible")) {
                    $('#edit-as-create-as-send-url-create-as-form').trigger('reset');
                } else {
                    $('#edit-as-send-url-create-as-form').trigger('reset');
                }
            } else {
                onlyShowErrorMessage('Error!', response.message);
            }
            if ($('#edit-as-create-as-form-area').is(":visible")) {
                $('#edit-as-create-as-send-email').jqxButton({disabled: false});
            } else {
                $('#edit-as-send-email').jqxButton({disabled: false});
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Send url create as error. Please try again!');
                console.log('Send url create as error' + errorThrown);
                if ($('#edit-as-create-as-form-area').is(":visible")) {
                    $('#edit-as-create-as-send-email').jqxButton({disabled: false});
                } else {
                    $('#edit-as-send-email').jqxButton({disabled: false});
                }
            }
        },
    });
}

function editASCreateAS() {
    let formData = new FormData();
    formData.append('ask_type', $('#edit-as-create-as-form-ask-type').val());
    formData.append('defect_type', $('#edit-as-create-as-form-defect-type').val());
    formData.append('emergency_type', $('#edit-as-create-as-form-emergency-type').val());
    // formData.append('plan_date', $('#edit-as-create-as-form-plan-date').val());
    // formData.append('complete_date', $('#edit-as-create-as-form-complete-date').val());
    // let manager = $('#edit-as-create-as-form-manager').jqxComboBox('getSelectedItem');
    // if (manager) formData.append('manager_id', manager.value);
    formData.append('ask_remark', $('#edit-as-create-as-form-ask-remark').val());
    formData.append('locker_id', $('#edit-as-create-as-form-locker-id').val());
    formData.append('phone', $('#edit-as-create-as-form-user-phone').val());
    formData.append('email', $('#edit-as-create-as-form-user-email').val());

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: `/api/as/staff-store`,
        type: 'POST',
        data: formData,
        cache : false,
        contentType : false,
        processData: false,
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                onlyShowSuccessMessage('Success!', response.message);
                $("#edit-as-grid").jqxGrid('addrow', -1, response.data);
                $('#edit-as-form-area').find("input, textarea, select").val('');
                $('#edit-as-create-as-form-area').find("input, textarea, select").val('');
                // searchEditAS();

                //refresh detail AS
                let new_tab_title = 'A/S 접수내역';
                let index_exist = null;
                //check tab exist
                $('#jqxTabs .jqx-tabs-headerWrapper ul li').each(function (index) {
                    let title = $(this).find('.jqx-tabs-titleContentWrapper').text();
                    if (title === new_tab_title) {
                        index_exist = index;
                        return false;
                    }
                });

                if (index_exist !== null) {
                    justCreatedAS = true;
                }

            } else {
                onlyShowErrorMessage('Error!', response.message);
            }
            $('#edit-as-save').jqxButton({disabled: false});
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Create AS error. Please try again!');
                console.log('Create station error' + errorThrown);
                $('#edit-as-save').jqxButton({disabled: false});
            }
        },
    });
}

function editASChooseLocker(lockerId) {
    if (lockerId) {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            url: `/api/lockers/get-locker/${lockerId}`,
            type: 'GET',
            dataType: 'JSON',
            success: function (response) {
                if (response.code === 200) {
                    editASFormSetValueAfterChooseLocker(response.data);
                } else {
                    onlyShowErrorMessage('Error!', response.message);
                }
            },
            error: function (err, status, errorThrown) {
                if (err.status === 401) {
                    window.location.reload();
                } else {
                    onlyShowErrorMessage('Error!', 'Get locker error. Please try again!');
                    console.log('Get locker error ' + errorThrown);
                }
            },
        })
    } else {
        editASFormSetValueAfterChooseLocker();
    }
}

//function
function editASFormSetValueAfterChooseLocker(dataRecord = null) {
    if ($('#edit-as-create-as-form-area').is(":visible")) {
        if (dataRecord) {
            $('#edit-as-create-as-form-locker-name').val(dataRecord.LOCKER_NAME ? dataRecord.LOCKER_NAME : '');
            $('#edit-as-create-as-form-locker-id').val(dataRecord.ID ? dataRecord.ID : '');
            $('#edit-as-create-as-form-station-name').val(dataRecord.STATION_NAME ? dataRecord.STATION_NAME : '');
            $('#edit-as-create-as-form-station-type').val(dataRecord.STATION_TYPE ? dataRecord.STATION_TYPE : '');
            $('#edit-as-create-as-form-station-code').val(dataRecord.STATION_CODE ? dataRecord.STATION_CODE : '');
            $('#edit-as-create-as-form-station-maint-type').val(dataRecord.STATION_MAINT_TYPE ? dataRecord.STATION_MAINT_TYPE : '');
            $('#edit-as-create-as-form-station-maint-end-ymd').val(dataRecord.STATION_MAINT_END_YMD ? dataRecord.STATION_MAINT_END_YMD : '');
            $('#edit-as-create-as-form-station-repr-name').val(dataRecord.STATION_REPR_NM ? dataRecord.STATION_REPR_NM : '');
            $('#edit-as-create-as-form-station-mobile').val(dataRecord.STATION_MOBL_NO ? dataRecord.STATION_MOBL_NO : '');
            $('#edit-as-create-as-form-station-telephone').val(dataRecord.STATION_TEL_NO ? dataRecord.STATION_TEL_NO : '');
            $('#edit-as-create-as-form-station-manager').val(dataRecord.STATION_MNGR_NM ? dataRecord.STATION_MNGR_NM : '');
        } else {

            $('#edit-as-create-as-form-locker-name').val('');
            $('#edit-as-create-as-form-locker-id').val('');
            $('#edit-as-create-as-form-station-name').val('');
            $('#edit-as-create-as-form-station-type').val('');
            $('#edit-as-create-as-form-station-code').val('');
            $('#edit-as-create-as-form-station-maint-type').val('');
            $('#edit-as-create-as-form-station-maint-end-ymd').val('');
            $('#edit-as-create-as-form-station-repr-name').val('');
            $('#edit-as-create-as-form-station-mobile').val('');
            $('#edit-as-create-as-form-station-telephone').val('');
            $('#edit-as-create-as-form-station-manager').val('');
        }
    } else {
        if (dataRecord) {
            $('#edit-as-form-locker-name').val(dataRecord.LOCKER_NAME ? dataRecord.LOCKER_NAME : '');
            $('#edit-as-form-new-locker-id').val(dataRecord.ID ? dataRecord.ID : '');
            $('#edit-as-form-station-name').val(dataRecord.STATION_NAME ? dataRecord.STATION_NAME : '');
            $('#edit-as-form-station-type').val(dataRecord.STATION_TYPE ? dataRecord.STATION_TYPE : '');
            $('#edit-as-form-station-code').val(dataRecord.STATION_CODE ? dataRecord.STATION_CODE : '');
            $('#edit-as-form-station-maint-type').val(dataRecord.STATION_MAINT_TYPE ? dataRecord.STATION_MAINT_TYPE : '');
            $('#edit-as-form-station-maint-end-ymd').val(dataRecord.STATION_MAINT_END_YMD ? dataRecord.STATION_MAINT_END_YMD : '');
            $('#edit-as-form-station-repr-name').val(dataRecord.STATION_REPR_NM ? dataRecord.STATION_REPR_NM : '');
            $('#edit-as-form-station-mobile').val(dataRecord.STATION_MOBL_NO ? dataRecord.STATION_MOBL_NO : '');
            $('#edit-as-form-station-telephone').val(dataRecord.STATION_TEL_NO ? dataRecord.STATION_TEL_NO : '');
            $('#edit-as-form-station-manager').val(dataRecord.STATION_MNGR_NM ? dataRecord.STATION_MNGR_NM : '');
        } else {
            $('#edit-as-form-locker-name').val('');
            $('#edit-as-form-new-locker-id').val('');
            $('#edit-as-form-station-name').val('');
            $('#edit-as-form-station-type').val('');
            $('#edit-as-form-station-code').val( '');
            $('#edit-as-form-station-maint-type').val('');
            $('#edit-as-form-station-maint-end-ymd').val('');
            $('#edit-as-form-station-repr-name').val('');
            $('#edit-as-form-station-mobile').val('');
            $('#edit-as-form-station-telephone').val('');
            $('#edit-as-form-station-manager').val('');
        }
    }
}
