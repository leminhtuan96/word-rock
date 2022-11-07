function resetLockersPage(name = '') {
    $('#lockers-create-choose-station-window').jqxWindow('destroy');
    $('#lockers-edit-choose-station-window').jqxWindow('destroy');
    let currentTab = $('#jqxTabs').jqxTabs('selectedItem');
    $.ajax({
        url: 'lockers/',
        type: 'GET',
        success: function (data) {
            $('#jqxTabs').jqxTabs('setContentAt', currentTab, data);
            getLockers(name);
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

function lockersSearchLockers() {
    let name = $('#lockers-filter-name').val() ? $('#lockers-filter-name').val() : '';
    resetLockersPage(name);
}

function deleteLocker(id) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: `/api/lockers/delete/${id}`,
        type: 'DELETE',
        success: function (response) {
            if (response.code === 200) {
                onlyShowSuccessMessage('Success!', response.message);
                lockersSearchLockers();
            } else {
                onlyShowErrorMessage('Error!', response.message);
                $('#lockers-delete').jqxButton({disabled: false});
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Delete locker error. Please try again!');
                console.log('Delete locker error ' + errorThrown);
                $('#lockers-delete').jqxButton({disabled: false});
            }
        },
    });
}

function createLocker() {
    let formData = new FormData();
    formData.append('name', $('#lockers-create-name').val());
    formData.append('code', $('#lockers-create-unit-code').val());
    formData.append('station_id', $('#lockers-create-station-id').val());
    formData.append('radial_no', $('#lockers-create-radial-no').val());
    formData.append('kind', $('#lockers-create-kind').val());
    formData.append('mcu_kind', $('#lockers-create-mcu-kind').val());
    formData.append('ctrl_box_type', $('#lockers-create-ctrl-box-type').val());
    formData.append('sub_mcu_yn', $('#lockers-create-sub-mcu-yn').val());
    formData.append('computer_type', $('#lockers-create-computer-type').val());
    formData.append('os', $('#lockers-create-os').val());
    formData.append('rfid_reader', $('#lockers-create-rfid-reader').val());
    formData.append('webcam', $('#lockers-create-webcam').val());
    formData.append('monitor_size', $('#lockers-create-monitor-size').val());
    formData.append('printer', $('#lockers-create-printer').val());
    formData.append('card_terminal', $('#lockers-create-card-terminal').val());
    formData.append('locker_cnt', $('#lockers-create-locker-cnt').val());
    formData.append('banknote_inserter', $('#lockers-create-banknote-inserter').val());
    formData.append('banknote_dispenser', $('#lockers-create-banknote-dispenser').val());
    formData.append('lock_kind', $('#lockers-create-lock-kind').val());
    formData.append('coin_inserter', $('#lockers-create-coin-inserter').val());
    formData.append('coin_dispenser', $('#lockers-create-coin-dispenser').val());

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: `/api/lockers/store`,
        type: 'POST',
        data: formData,
        cache : false,
        contentType : false,
        processData: false,
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                onlyShowSuccessMessage('Success!', response.message);
                lockersSearchLockers();
            } else {
                onlyShowErrorMessage('Error!', response.message);
                $('#lockers-save').jqxButton({disabled: false});
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Create locker error. Please try again!');
                console.log('Create locker error' + errorThrown);
                $('#lockers-save').jqxButton({disabled: false});
            }
        },
    });
}

function editLocker() {
    let id = $('#lockers-edit-id').val();
    let formData = new FormData();
    formData.append('name', $('#lockers-edit-name').val());
    formData.append('code', $('#lockers-edit-unit-code').val());
    formData.append('station_id', $('#lockers-edit-station-id').val());
    formData.append('radial_no', $('#lockers-edit-radial-no').val());
    formData.append('kind', $('#lockers-edit-kind').val());
    formData.append('mcu_kind', $('#lockers-edit-mcu-kind').val());
    formData.append('ctrl_box_type', $('#lockers-edit-ctrl-box-type').val());
    formData.append('sub_mcu_yn', $('#lockers-edit-sub-mcu-yn').val());
    formData.append('computer_type', $('#lockers-edit-computer-type').val());
    formData.append('os', $('#lockers-edit-os').val());
    formData.append('rfid_reader', $('#lockers-edit-rfid-reader').val());
    formData.append('webcam', $('#lockers-edit-webcam').val());
    formData.append('monitor_size', $('#lockers-edit-monitor-size').val());
    formData.append('printer', $('#lockers-edit-printer').val());
    formData.append('card_terminal', $('#lockers-edit-card-terminal').val());
    formData.append('locker_cnt', $('#lockers-edit-locker-cnt').val());
    formData.append('banknote_inserter', $('#lockers-edit-banknote-inserter').val());
    formData.append('banknote_dispenser', $('#lockers-edit-banknote-dispenser').val());
    formData.append('lock_kind', $('#lockers-edit-lock-kind').val());
    formData.append('coin_inserter', $('#lockers-edit-coin-inserter').val());
    formData.append('coin_dispenser', $('#lockers-edit-coin-dispenser').val());

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        url: `/api/lockers/update/${id}`,
        type: 'POST',
        data: formData,
        cache : false,
        contentType : false,
        processData: false,
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                onlyShowSuccessMessage('Success!', response.message);
                lockersSearchLockers();
            } else {
                onlyShowErrorMessage('Error!', response.message);
                $('#lockers-save').jqxButton({disabled: false});
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Edit locker error. Please try again!');
                console.log('Edit locker error' + errorThrown);
                $('#lockers-save').jqxButton({disabled: false});
            }
        },
    });
}

function createLockerShowChooseStationPopup(stationId) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: `/api/lockers/get-stations`,
        type: 'GET',
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                let source =
                    {
                        datatype: "array",
                        datafields: [
                            {name: 'ID', type: 'number'},
                            {name: 'STATION_NAME', type: 'string'},
                            {name: 'STATION_GROUP', type: 'string'},
                            {name: 'STATION_TYPE', type: 'number'},
                            {name: 'STATION_TYPE_NAME', type: 'string'},
                            {name: 'HHLD_CNT', type: 'number'},
                            {name: 'REG_CODE', type: 'string'},
                            {name: 'CTRL_CNT', type: 'number'},
                            {name: 'LOCKER_CNT', type: 'number'},
                            {name: 'AREA1_DIV', type: 'number'},
                            {name: 'AREA1_DIV_NAME', type: 'string'},
                            {name: 'AREA2_NM', type: 'string'},
                            {name: 'DTL_ADDR', type: 'string'},
                            {name: 'REPR_NM', type: 'string'},
                            {name: 'MNGR_NM', type: 'string'},
                            {name: 'TEL_NO', type: 'string'},
                            {name: 'MOBL_NO', type: 'string'},
                            {name: 'EMAIL', type: 'string'},
                        ],
                        root: "entry",
                        record: "content",
                        id: 'id',
                        localdata: response.data
                    };
                let dataAdapter = new $.jqx.dataAdapter(source);
                // create grid.
                $("#lockers-create-choose-station-window-content").jqxGrid(
                    {
                        width: 'calc(100% - 2px)',
                        source: dataAdapter,
                        sortable: true,
                        showfilterrow: true,
                        filterrowheight: ROW_HEIGHT + 7,
                        filterable: true,
                        autoheight: true,
                        pageable: true,
                        pagerheight: ROW_HEIGHT + 7,
                        pagesizeoptions: PAGE_SIZE_OPTIONS,
                        pagesize: localStorage.getItem('lockers-create-choose-station-window-content-pagesize') ?? PAGE_SIZE_DEFAULT,
                        columnsresize: true,
                        columnsreorder: true,
                        columnsheight: ROW_HEIGHT,
                        rowsheight: ROW_HEIGHT,
                        ready: function ()
                        {
                            // $("#lockers-create-choose-station-window-content").jqxGrid('selectrow', 0);
                        },
                        altrows: true,
                        columns: [
                            { text: '지역', align: 'center', datafield: 'AREA1_DIV_NAME', width: '10%'},
                            { text: '세부지역', align: 'center', datafield: 'AREA2_NM', width: '20%'},
                            { text: 'CODE',  align: 'center', cellsalign: 'center', datafield: 'REG_CODE', width: '6%'},
                            { text: '구분', align: 'center', dataField: 'STATION_TYPE_NAME', width: '10%'},
                            { text: 'Station 명', align: 'center',  datafield: 'STATION_NAME', width: '20%'},
                            { text: '담당자', align: 'center', datafield: 'MNGR_NM', width: '10%'},
                            { text: '대표연락처', align: 'center', datafield: 'TEL_NO', width: '12%'},
                            { text: 'Mobile', align: 'center', datafield: 'MOBL_NO', width: '12%'},
                        ]
                    });
                let rowSelect = 0;
                let rows = $("#lockers-create-choose-station-window-content").jqxGrid('getrows');
                rows.forEach(function (row) {
                    if (row.ID == stationId) {
                        rowSelect = row.uid;
                        return false;
                    }
                });
                $("#lockers-create-choose-station-window-content").jqxGrid('selectrow', rowSelect);

                $("#lockers-create-choose-station-window").jqxWindow({height: (190 + (response.data.length > 0 ? (response.data.length > 10 ? 10 : response.data.length) * ROW_HEIGHT : ROW_HEIGHT))});
                $("#lockers-create-choose-station-window").jqxWindow('open');

                //handle choose parent
                $('#lockers-create-choose-station-window-ok').on('click', function () {
                    let selectedRowIndex = $('#lockers-create-choose-station-window-content').jqxGrid('getselectedrowindex');
                    let dataRecord = $("#lockers-create-choose-station-window-content").jqxGrid('getrowdata', selectedRowIndex);
                    $('#lockers-create-station-name').val(dataRecord.STATION_NAME);
                    $('#lockers-create-station-id').val(dataRecord.ID);
                    $('#lockers-create-station-code').val(dataRecord.REG_CODE ? dataRecord.REG_CODE : '');
                    $("#lockers-create-choose-station-window").jqxWindow('close');
                    $('#lockers-create-form').jqxValidator('hideHint', '#lockers-create-station-name');
                })
                $('#lockers-create-choose-station-window-content').on('rowdoubleclick', function (event)
                {
                    let args = event.args;
                    let dataRecord = args.row.bounddata;
                    $('#lockers-create-station-name').val(dataRecord.STATION_NAME);
                    $('#lockers-create-station-id').val(dataRecord.ID);
                    $('#lockers-create-station-code').val(dataRecord.REG_CODE ? dataRecord.REG_CODE : '');
                    $("#lockers-create-choose-station-window").jqxWindow('close');
                    $('#lockers-create-form').jqxValidator('hideHint', '#lockers-create-station-name');
                });
            } else {
                onlyShowErrorMessage('Error!', response.message);
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Get stations error. Please try again!');
                console.log('Get stations error ' + errorThrown);
            }
        },
    })
    //save page size
    $("#lockers-create-choose-station-window-content").on("pagesizechanged", function (event) {
        // event arguments.
        let args = event.args;
        // new page size.
        let pagesize = args.pagesize;
        localStorage.setItem('lockers-create-choose-station-window-content-pagesize', pagesize);
    });
}

function editLockerShowChooseStationPopup(stationId) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: `/api/lockers/get-stations`,
        type: 'GET',
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                let source =
                    {
                        datatype: "array",
                        datafields: [
                            {name: 'ID', type: 'number'},
                            {name: 'STATION_NAME', type: 'string'},
                            {name: 'STATION_GROUP', type: 'string'},
                            {name: 'STATION_TYPE', type: 'number'},
                            {name: 'STATION_TYPE_NAME', type: 'string'},
                            {name: 'HHLD_CNT', type: 'number'},
                            {name: 'REG_CODE', type: 'string'},
                            {name: 'CTRL_CNT', type: 'number'},
                            {name: 'LOCKER_CNT', type: 'number'},
                            {name: 'AREA1_DIV', type: 'number'},
                            {name: 'AREA1_DIV_NAME', type: 'string'},
                            {name: 'AREA2_NM', type: 'string'},
                            {name: 'DTL_ADDR', type: 'string'},
                            {name: 'REPR_NM', type: 'string'},
                            {name: 'MNGR_NM', type: 'string'},
                            {name: 'TEL_NO', type: 'string'},
                            {name: 'MOBL_NO', type: 'string'},
                            {name: 'EMAIL', type: 'string'},
                        ],
                        root: "entry",
                        record: "content",
                        id: 'id',
                        localdata: response.data
                    };
                let dataAdapter = new $.jqx.dataAdapter(source);
                // create grid.
                $("#lockers-edit-choose-station-window-content").jqxGrid(
                    {
                        width: 'calc(100% - 2px)',
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
                        ready: function ()
                        {
                            // $("#lockers-edit-choose-station-window-content").jqxGrid('selectrow', 0);
                        },
                        altrows: true,
                        columns: [
                            { text: '지역',  align: 'center', datafield: 'AREA1_DIV_NAME', width: '10%'},
                            { text: '세부지역',  align: 'center', datafield: 'AREA2_NM', width: '20%'},
                            { text: 'CODE',  align: 'center', cellsalign: 'center', datafield: 'REG_CODE', width: '6%'},
                            { text: '구분',  align: 'center', dataField: 'STATION_TYPE_NAME', width: '10%'},
                            { text: 'Station 명',  align: 'center', datafield: 'STATION_NAME', width: '20%'},
                            { text: '담당자',  align: 'center', datafield: 'MNGR_NM', width: '10%'},
                            { text: '대표연락처',  align: 'center', datafield: 'TEL_NO', width: '12%'},
                            { text: 'Mobile',  align: 'center', datafield: 'MOBL_NO', width: '12%'},
                        ]
                    });
                let rowSelect = 0;
                let rows = $("#lockers-edit-choose-station-window-content").jqxGrid('getrows');
                rows.forEach(function (row) {
                    if (row.ID == stationId) {
                        rowSelect = row.uid;
                        return false;
                    }
                });
                $("#lockers-edit-choose-station-window-content").jqxGrid('selectrow', rowSelect);

                $("#lockers-edit-choose-station-window").jqxWindow({height: (190 + (response.data.length > 0 ? (response.data.length > 10 ? 10 : response.data.length) * ROW_HEIGHT : ROW_HEIGHT))});
                $("#lockers-edit-choose-station-window").jqxWindow('open');

                //handle choose parent
                $('#lockers-edit-choose-station-window-ok').on('click', function () {
                    let selectedRowIndex = $('#lockers-edit-choose-station-window-content').jqxGrid('getselectedrowindex');
                    let dataRecord = $("#lockers-edit-choose-station-window-content").jqxGrid('getrowdata', selectedRowIndex);
                    $('#lockers-edit-station-name').val(dataRecord.STATION_NAME);
                    $('#lockers-edit-station-id').val(dataRecord.ID);
                    $('#lockers-edit-station-code').val(dataRecord.REG_CODE ? dataRecord.REG_CODE : '');
                    $("#lockers-edit-choose-station-window").jqxWindow('close');
                    $('#lockers-edit-form').jqxValidator('hideHint', '#lockers-edit-station-name');
                })
                $('#lockers-edit-choose-station-window-content').on('rowdoubleclick', function (event)
                {
                    let args = event.args;
                    let dataRecord = args.row.bounddata;
                    $('#lockers-edit-station-name').val(dataRecord.STATION_NAME);
                    $('#lockers-edit-station-id').val(dataRecord.ID);
                    $('#lockers-edit-station-code').val(dataRecord.REG_CODE ? dataRecord.REG_CODE : '');
                    $("#lockers-edit-choose-station-window").jqxWindow('close');
                    $('#lockers-edit-form').jqxValidator('hideHint', '#lockers-edit-station-name');
                });
            } else {
                onlyShowErrorMessage('Error!', response.message);
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Get stations error. Please try again!');
                console.log('Get stations error ' + errorThrown);
            }
        },
    })
}
