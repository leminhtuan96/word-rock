//function
function resetHandleASPage(keyword = '', start = formatOnlyDate(new Date()), end = formatOnlyDate(new Date()), use_date = '', except_complete = 'Y') {
    $('#handle-as-form-choose-locker-window').jqxWindow('destroy');
    let currentTab = $('#jqxTabs').jqxTabs('selectedItem');
    let url = `as/handle?keyword=${keyword}&start=${start}&end=${end}&use_date=${use_date}&except_complete=${except_complete}`;
    setContentTab(url, currentTab, getHandleAS);
}

function searchHandleAS() {
    let keyword = $('#handle-as-filter-keyword').val() ? $('#handle-as-filter-keyword').val() : '';
    let start = $('#handle-as-filter-date-receipt-start').val() ? $('#handle-as-filter-date-receipt-start').val() : '';
    let end = $('#handle-as-filter-date-receipt-end').val() ? $('#handle-as-filter-date-receipt-end').val() : '';
    let use_date = $('#handle-as-filter-use-date').is(":checked") ? '' : 'Y';
    let except_complete = $('#handle-as-filter-except-complete').is(":checked") ? 'Y' : '';
    resetHandleASPage(keyword, start, end, use_date, except_complete);
}

function handleASGetASByLocker(locker_id = '', sourceAS, as_id) {
    let start = $('#handle-as-filter-date-receipt-start').val() ? $('#handle-as-filter-date-receipt-start').val() : '';
    let end = $('#handle-as-filter-date-receipt-end').val() ? $('#handle-as-filter-date-receipt-end').val() : '';
    let use_date = $('#handle-as-filter-use-date').is(":checked") ? '' : 'Y';
    let except_complete = $('#handle-as-filter-except-complete').is(":checked") ? 'Y' : '';
    //active selected locker
    let url = `/api/as/get-by-locker?locker_id=${locker_id}&start=${start}&end=${end}&use_date=${use_date}&except_complete=${except_complete}`;
    if (!locker_id) {
        let locker_element = $('#handle-as-lockers-menu ul li').first();
        locker_element.attr('id', 'handle-as-item-locker-active');
    } else {
        $(`#handle-as-lockers-menu li[data-id=${locker_id}]`).attr('id', 'handle-as-item-locker-active');
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
                $('#handle-as-grid').jqxGrid('updatebounddata');
                if (as_id) {
                    let as_select_index = response.data.findIndex(e => e.ID == as_id);
                    if (as_select_index > -1) {
                        $("#handle-as-grid").jqxGrid('selectrow', as_select_index);
                        handleASShowPage();
                    } else {
                        $('#handle-as-grid').jqxGrid('clearselection');
                    }
                } else {
                    $('#handle-as-grid').jqxGrid('clearselection');
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

function handleASShowChooseLockerPopup(lockerId) {
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
                $('#handle-as-form-choose-locker-window-content').jqxGrid('clearselection');
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
                $("#handle-as-form-choose-locker-window-content").jqxGrid(
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
                            // $("#handle-as-form-choose-locker-window-content").jqxGrid('selectrow', 0);
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
                    let rows = $("#handle-as-form-choose-locker-window-content").jqxGrid('getrows');
                    rows.forEach(function (row) {
                        if (row.ID == lockerId) {
                            $("#handle-as-form-choose-locker-window-content").jqxGrid('selectrow', row.uid);
                            return false;
                        }
                    });
                }

                $("#handle-as-form-choose-locker-window").jqxWindow({height: (190 + (response.data.length > 0 ? (response.data.length > 10 ? 10 : response.data.length) * ROW_HEIGHT : ROW_HEIGHT))});
                $("#handle-as-form-choose-locker-window").jqxWindow('open');

                //handle choose parent
                $('#handle-as-form-choose-locker-window-ok').on('click', function () {
                    let selectedRowIndex = $('#handle-as-form-choose-locker-window-content').jqxGrid('getselectedrowindex');
                    let dataRecord = $("#handle-as-form-choose-locker-window-content").jqxGrid('getrowdata', selectedRowIndex);
                    handleASFormSetValueAfterChooseLocker(dataRecord)
                    $("#handle-as-form-choose-locker-window").jqxWindow('close');
                })
                $('#handle-as-form-choose-locker-window-content').on('rowdoubleclick', function (event)
                {
                    let args = event.args;
                    let dataRecord = args.row.bounddata;
                    handleASFormSetValueAfterChooseLocker(dataRecord)
                    $("#handle-as-form-choose-locker-window").jqxWindow('close');
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

function handleASRedirectDetailLocker(locker_id) {
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

function handleASRedirectEdit(as_id = '') {
    let today = formatOnlyDate(new Date());
    let urlApi = `as/edit?start=${today}&end=${today}&except_complete=Y`;
    if (as_id) {
        urlApi = `as/edit?as_id=${as_id}&start=${today}&end=${today}`;
    }
    let new_tab_title = 'A/S 접수등록';
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
                getEditAS(as_id);
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
                getEditAS(as_id);
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

function handleAS() {
    let id = $('#handle-as-form-id').val();
    let formData = new FormData();
    formData.append('plan_date', $('#handle-as-form-plan-date').val());
    formData.append('defect_type', $('#handle-as-form-defect-type').val());
    formData.append('emergency_type', $('#handle-as-form-emergency-type').val());
    formData.append('prog_status', $('#handle-as-form-prog-status').val());
    formData.append('complete_date', $('#handle-as-form-complete-date').val());
    formData.append('blling_date', $('#handle-as-form-blling-date').val());
    let manager = $('#handle-as-form-manager').jqxComboBox('getSelectedItem');
    if (manager) formData.append('manager_id', manager.value);
    if ($('#handle-as-form-new-locker-id').val()) {
        formData.append('locker_id', $('#handle-as-form-new-locker-id').val());
    } else {
        formData.append('locker_id', $('#handle-as-form-locker-id').val());
    }
    formData.append('ask_remark', $('#handle-as-form-ask-remark').val());
    formData.append('complete_remark', $('#handle-as-form-complete-remark').val());
    if ($('#handle-as-form-attach-file')[0].files.length !== 0) {
        formData.append('attach_file', $('#handle-as-form-attach-file')[0].files[0]);
    }

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: `/api/as/handle/${id}`,
        type: 'POST',
        data: formData,
        cache : false,
        contentType : false,
        processData: false,
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                onlyShowSuccessMessage('Success!', response.message);
                searchHandleAS();
            } else {
                onlyShowErrorMessage('Error!', response.message);
                $('#handle-as-save').jqxButton({disabled: false});
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Handle AS error. Please try again!');
                console.log('Handle AS error' + errorThrown);
                $('#handle-as-save').jqxButton({disabled: false});
            }
        },
    });
}

function handleASDeleteAS(id) {
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
                searchHandleAS();
            } else {
                onlyShowErrorMessage('Error!', response.message);
                $('#handle-as-delete').jqxButton({disabled: false});
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Delete AS error. Please try again!');
                console.log('Delete AS error ' + errorThrown);
                $('#handle-as-delete').jqxButton({disabled: false});
            }
        },
    });
}

function handleASChooseLocker(lockerId) {
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
                    handleASFormSetValueAfterChooseLocker(response.data);
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

function handleASShowPage() {
    $("#handle-as-lockers-menu").jqxMenu({width: '100%', mode: 'vertical'}).css('visibility', 'visible');
    setTimeout(function () {
        $('#handle-as').show();
        $('#handle-as-loader').jqxLoader('close');

        //splitter
        if (screenHeight > 960) {
            $('#handle-as-splitter').jqxSplitter({ width: '100%', height: PAGE_CONTENT_HEIGHT, orientation: 'horizontal', panels: [{ size: 402, min: 150 }, { min: 100}]});
        } else {
            $('#handle-as-splitter').jqxSplitter({ width: '100%', height: PAGE_CONTENT_HEIGHT, orientation: 'horizontal', panels: [{ size: '55%', min: 150 }, { size: '45%', min: 100}]});
        }
    }, SET_TIMEOUT_LOADER);
}

function handleASFormSetValueAfterChooseLocker(dataRecord = null) {
    if (dataRecord) {
        $('#handle-as-form-locker-name').val(dataRecord.LOCKER_NAME ? dataRecord.LOCKER_NAME : '');
        $('#handle-as-form-new-locker-id').val(dataRecord.ID ? dataRecord.ID : '');
        $('#handle-as-form-station-name').val(dataRecord.STATION_NAME ? dataRecord.STATION_NAME : '');
        $('#handle-as-form-station-type').val(dataRecord.STATION_TYPE ? dataRecord.STATION_TYPE : '');
        $('#handle-as-form-station-code').val(dataRecord.STATION_CODE ? dataRecord.STATION_CODE : '');
        $('#handle-as-form-station-maint-type').val(dataRecord.STATION_MAINT_TYPE ? dataRecord.STATION_MAINT_TYPE : '');
        $('#handle-as-form-station-maint-end-ymd').val(dataRecord.STATION_MAINT_END_YMD ? dataRecord.STATION_MAINT_END_YMD : '');
        $('#handle-as-form-station-repr-name').val(dataRecord.STATION_REPR_NM ? dataRecord.STATION_REPR_NM : '');
        $('#handle-as-form-station-mobile').val(dataRecord.STATION_MOBL_NO ? dataRecord.STATION_MOBL_NO : '');
        $('#handle-as-form-station-telephone').val(dataRecord.STATION_TEL_NO ? dataRecord.STATION_TEL_NO : '');
        $('#handle-as-form-station-manager').val(dataRecord.STATION_MNGR_NM ? dataRecord.STATION_MNGR_NM : '');
    } else {
        $('#handle-as-form-locker-name').val('');
        $('#handle-as-form-new-locker-id').val('');
        $('#handle-as-form-station-name').val('');
        $('#handle-as-form-station-type').val('');
        $('#handle-as-form-station-code').val('');
        $('#handle-as-form-station-maint-type').val('');
        $('#handle-as-form-station-maint-end-ymd').val('');
        $('#handle-as-form-station-repr-name').val('');
        $('#handle-as-form-station-mobile').val('');
        $('#handle-as-form-station-telephone').val('');
        $('#handle-as-form-station-manager').val('');
    }
}

function handleASDumpDataIntoTheForm(data) {
    $('#handle-as-form-id').val(data.ID);
    $('#handle-as-form-ask-type').val(data.ASK_TYPE ? data.ASK_TYPE : '');
    $('#handle-as-form-defect-type').val(data.DEFECT_TYPE ? data.DEFECT_TYPE : '');
    $('#handle-as-form-emergency-type').val(data.EMERGENCY_TYPE ? data.EMERGENCY_TYPE : '');
    $('#handle-as-form-plan-date').val(data.PROC_PLAN_YMD ? data.PROC_PLAN_YMD : '');
    $('#handle-as-form-blling-date').val(data.BLLING_YMD ? data.BLLING_YMD : '');
    if (data.USER_ID) {
        let manager = $("#handle-as-form-manager").jqxComboBox('getItemByValue', data.USER_ID);
        $("#handle-as-form-manager").jqxComboBox('val', manager);
    } else {
        $("#handle-as-form-manager").jqxComboBox('clearSelection');
    }
    $('#handle-as-form-ask-remark').val(data.ASK_REMARK ? data.ASK_REMARK : '');
    $('#handle-as-form-locker-id').val(data.LOCKER_ID ? data.LOCKER_ID : '');
    $('#handle-as-form-new-locker-id').val('');
    $('#handle-as-form-locker-name').val(data.LOCKER_NAME ? data.LOCKER_NAME : '');
    $('#handle-as-form-user-phone').val(data.TEL_NO ? data.TEL_NO : '');
    $('#handle-as-form-user-area1').val(data.AREA1_DIV ? data.AREA1_DIV : '');
    $('#handle-as-form-user-area2').val(data.AREA2_NM ? data.AREA2_NM : '');
    $('#handle-as-form-user-email').val(data.E_MAIL ? data.E_MAIL : '');
    $('#handle-as-form-user-location').val(data.LOCATION_NM ? data.LOCATION_NM : '');
    $('#handle-as-form-station-name').val(data.STATION_NAME ? data.STATION_NAME : '');
    $('#handle-as-form-station-type').val(data.STATION_TYPE ? data.STATION_TYPE : '');
    $('#handle-as-form-station-code').val(data.STATION_REG_CODE ? data.STATION_REG_CODE : '');
    $('#handle-as-form-station-maint-type').val(data.STATION_MAINT_TYPE ? data.STATION_MAINT_TYPE : '');
    $('#handle-as-form-station-maint-end-ymd').val(data.STATION_MAINT_END_YMD ? data.STATION_MAINT_END_YMD : '');
    $('#handle-as-form-station-repr-name').val(data.STATION_REPR_NM ? data.STATION_REPR_NM : '');
    $('#handle-as-form-station-telephone').val( data.STATION_TEL_NO ? data.STATION_TEL_NO : '');
    $('#handle-as-form-station-manager').val(data.STATION_MNGR_NM ? data.STATION_MNGR_NM : '');
    $('#handle-as-form-station-mobile').val(data.STATION_MOBL_NO ? data.STATION_MOBL_NO : '');
    $('#handle-as-form-complete-remark').val(data.CMPL_REMARK ? data.CMPL_REMARK : '');
    $('#handle-as-form-attach-file-name').val(data.ATTACH_FILE ? data.ATTACH_FILE.split('/')[data.ATTACH_FILE.split('/').length - 1] : '');
    if (data.LOCKER_ID) {
        $('.handle-as-no-member').hide();
    } else {
        $('.handle-as-no-member').show();
    }
}
