function getLockerDetailAndAS(locker_id, sourceAS) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: `/api/lockers/detail-and-as?id=${locker_id}`,
        type: 'GET',
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                if (response.locker) {
                    let locker = response.locker;
                    $("#lockers-detail-form-name").val(locker.LOCKER_NAME ? locker.LOCKER_NAME : '');
                    $("#lockers-detail-form-unit-code").val(locker.UNIT_CODE ? locker.UNIT_CODE : '');
                    $("#lockers-detail-form-station-name").val(locker.STATION_NAME ? locker.STATION_NAME : '');
                    $("#lockers-detail-form-station-id").val(locker.STATION_ID ? locker.STATION_ID : '');
                    $("#lockers-detail-form-radial-no").val(locker.RADIAL_NO ? locker.RADIAL_NO : '');
                    $("#lockers-detail-form-kind").val(locker.LOCKER_KIND ? locker.LOCKER_KIND : '');
                    $("#lockers-detail-form-mcu-kind").val(locker.MCU_KIND ? locker.MCU_KIND : '');
                    $("#lockers-detail-form-ctrl-box-type").val(locker.CTRL_BOX_TYPE ? locker.CTRL_BOX_TYPE : '');
                    $("#lockers-detail-form-sub-mcu-yn").val(locker.SUB_MCU_YN ? locker.SUB_MCU_YN : '');
                    $("#lockers-detail-form-computer-type").val(locker.COMPTR_TYPE ? locker.COMPTR_TYPE : '');
                    $("#lockers-detail-form-os").val('');
                    $("#lockers-detail-form-rfid-reader").val(locker.RFID_READER ? locker.RFID_READER : '');
                    $("#lockers-detail-form-webcam").val(locker.WEBCAM ? locker.WEBCAM : '');
                    $("#lockers-detail-form-monitor-size").val(locker.MONTR_SIZE ? locker.MONTR_SIZE : '');
                    $("#lockers-detail-form-printer").val(locker.PRINTER ? locker.PRINTER : '');
                    $("#lockers-detail-form-card-terminal").val(locker.CARD_TERMINAL ? locker.CARD_TERMINAL : '');
                    $("#lockers-detail-form-locker-cnt").val(locker.LOCKER_CNT ? locker.LOCKER_CNT : '');
                    $("#lockers-detail-form-banknote-inserter").val(locker.BANKNOTE_INSERTER ? locker.BANKNOTE_INSERTER : '');
                    $("#lockers-detail-form-banknote-dispenser").val(locker.BANKNOTE_DISPENSER ? locker.BANKNOTE_DISPENSER : '');
                    $("#lockers-detail-form-lock-kind").val(locker.LOCK_KIND ? locker.LOCK_KIND : '');
                    $("#lockers-detail-form-coin-inserter").val(locker.COIN_INSERTER ? locker.COIN_INSERTER : '');
                    $("#lockers-detail-form-coin-dispenser").val(locker.COIN_DISPENSER ? locker.COIN_DISPENSER : '');
                }
                sourceAS.localdata = response.as;
                $('#lockers-detail-as-grid').jqxGrid('updatebounddata');

                setTimeout(function () {
                    $('#lockers-detail').show();
                    $('#lockers-detail-loader').jqxLoader('close');

                    //splitter
                    if (screenHeight > 697) {
                        $('#lockers-detail-splitter').jqxSplitter({ width: '100%', height: PAGE_CONTENT_HEIGHT, orientation: 'horizontal', panels: [{ size: 240, min: 150 }, { min: 100}]});
                    } else {
                        $('#lockers-detail-splitter').jqxSplitter({ width: '100%', height: PAGE_CONTENT_HEIGHT, orientation: 'horizontal', panels: [{ size: '55%', min: 150 }, { size: '45%', min: 100}]});
                    }
                }, SET_TIMEOUT_LOADER);
            } else {
                onlyShowErrorMessage('Error!', response.message);
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Get locker detail error. Please try again!');
                console.log('Get locker detail error ' + errorThrown);
            }
        },
    });
}

function lockerDetailShowChooseLockerPopup(sourceAS, keyword) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: `/api/lockers/get-by-keyword?keyword=${keyword}`,
        type: 'GET',
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                // prepare the data
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
                $("#lockers-detail-choose-locker-window-content").jqxGrid(
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
                            // $("#lockers-detail-choose-locker-window-content").jqxGrid('selectrow', 0);
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

                $("#lockers-detail-choose-locker-window").jqxWindow({height: (190 + (response.data.length > 0 ? (response.data.length > 10 ? 10 : response.data.length) * ROW_HEIGHT : ROW_HEIGHT))});
                $("#lockers-detail-choose-locker-window").jqxWindow('open');

                //handle choose parent
                $('#lockers-detail-choose-locker-window-ok').on('click', function () {
                    let selectedRowIndex = $('#lockers-detail-choose-locker-window-content').jqxGrid('getselectedrowindex');
                    let dataRecord = $("#lockers-detail-choose-locker-window-content").jqxGrid('getrowdata', selectedRowIndex);
                    $('#lockers-detail-locker-id').val(dataRecord.ID);
                    getLockerDetailAndAS(dataRecord.ID, sourceAS);
                    $("#lockers-detail-choose-locker-window").jqxWindow('close');
                })
                $('#lockers-detail-choose-locker-window').on('rowdoubleclick', function (event)
                {
                    let args = event.args;
                    let dataRecord = args.row.bounddata;
                    $('#lockers-detail-locker-id').val(dataRecord.ID);
                    getLockerDetailAndAS(dataRecord.ID, sourceAS);
                    $("#lockers-detail-choose-locker-window").jqxWindow('close');
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

function redirectCreateLocker() {
    let new_tab_title = '보관함 등록';
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
        let url = `lockers`;
        setContentTab(url, index_selected, getLockers);
    } else {
        $('#jqxTabs').jqxTabs('select', index_exist);
    }
}

function redirectLockersStations() {
    let new_tab_title = '보관함 내역';
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
        let url = `lockers/lockers-stations`;
        setContentTab(url, index_selected, getLockersStations);
    } else {
        $('#jqxTabs').jqxTabs('select', index_exist);
    }
}
