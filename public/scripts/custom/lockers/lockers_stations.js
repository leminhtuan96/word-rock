function getLockersStations(station_name = '') {
    $(document).ready(function () {
        try {
            if (!$("#lockers-stations-loader").length) return;
            $('input').attr('autocomplete','off');
            //check call api
            let call_api_cnt = 0
            //loader
            $("#lockers-stations-loader").jqxLoader({ autoOpen: true, width: 100, height: 60, imagePosition: 'top' });

            //control
            $("#lockers-stations-search").jqxButton({});
            $("#lockers-stations-excel").jqxButton({});

            //filter
            $('#lockers-stations-filter-station-name').val(station_name);

            //source
            let sourceStation =
                {
                    localdata: [],
                    dataType: "array",
                    datafields:
                        [
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
                            {name: 'MAINT_TYPE', type: 'number'},
                            {name: 'MAINT_TYPE_NAME', type: 'string'},
                            {name: 'MAINT_ST_YMD', type: 'string'},
                            {name: 'MAINT_END_YMD', type: 'string'},
                            {name: 'USE_FLAG', type: 'number'},
                            {name: 'USE_FLAG_NAME', type: 'string'},
                            {name: 'CREATED_AT', type: 'string'}
                        ],
                };
            let dataAdapterStation = new $.jqx.dataAdapter(sourceStation);
            // create jqxGrid.
            $("#lockers-stations-stations-grid").jqxGrid(
                {
                    width: '98.5%',
                    source: dataAdapterStation,
                    sortable: true,
                    autoheight: true,
                    pageable: true,
                    pagerheight: ROW_HEIGHT + 7,
                    pagesizeoptions: PAGE_SIZE_OPTIONS,
                    pagesize: localStorage.getItem('lockers-stations-stations-pagesize') ?? PAGE_SIZE_DEFAULT,
                    columnsresize: true,
                    columnsreorder: true,
                    columnsheight: ROW_HEIGHT,
                    rowsheight: ROW_HEIGHT,
                    ready: function () {
                        // $("#lockers-stations-stations-grid").jqxGrid('selectrow', 0);
                    },
                    altrows: true,
                    columns: [
                        { text: '등록일', align: 'center', cellsalign: 'center', datafield: 'CREATED_AT', width: '8%'},
                        { text: '지역', align: 'center', datafield: 'AREA1_DIV_NAME', width: '8%'},
                        { text: '세부지역', align: 'center', datafield: 'AREA2_NM', width: '8%'},
                        { text: '구분', align: 'center', dataField: 'STATION_TYPE_NAME', width: '8%'},
                        {
                            text: 'Station 명',
                            align: 'center',
                            datafield: 'STATION_NAME',
                            width: '28%',
                            cellclassname: 'd-flex align-items-center',
                            cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
                                return '<div class="grid-cell-redirect">\n' +
                                    value +
                                    '</div>';
                            }
                        },
                        { text: '담당자', align: 'center', datafield: 'MNGR_NM', width: '8%'},
                        { text: '대표연락처', align: 'center', datafield: 'TEL_NO', width: '8%'},
                        { text: 'Mobile', align: 'center', datafield: 'MOBL_NO', width: '8%'},
                        { text: '유지보수', align: 'center', cellsalign: 'center', datafield: 'MAINT_TYPE_NAME', width: '8%'},
                        { text: '유지보수종료일', align: 'center', cellsalign: 'center', datafield: 'MAINT_END_YMD', width: '8%'},
                    ]
                });
            //save page size
            $("#lockers-stations-stations-grid").on("pagesizechanged", function (event) {
                // event arguments.
                let args = event.args;
                // new page size.
                let pagesize = args.pagesize;
                localStorage.setItem('lockers-stations-stations-pagesize', pagesize);
            });

            let sourceLocker =
                {
                    localdata: [],
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
            let dataAdapterLocker = new $.jqx.dataAdapter(sourceLocker);
            // create jqxGrid.
            $("#lockers-stations-lockers-grid").jqxGrid(
                {
                    width: '98.5%',
                    source: dataAdapterLocker,
                    sortable: true,
                    autoheight: true,
                    pageable: true,
                    pagerheight: ROW_HEIGHT + 7,
                    pagesizeoptions: PAGE_SIZE_OPTIONS,
                    pagesize: localStorage.getItem('lockers-stations-lockers-pagesize') ?? PAGE_SIZE_DEFAULT,
                    columnsresize: true,
                    columnsreorder: true,
                    columnsheight: ROW_HEIGHT,
                    rowsheight: ROW_HEIGHT,
                    ready: function () {
                        // $("#lockers-stations-lockers-grid").jqxGrid('selectrow', 0);
                    },
                    altrows: true,
                    columns: [
                        {
                            text: '보관함명',
                            align: 'center',
                            datafield: 'LOCKER_NAME',
                            width: '15%',
                            cellclassname: 'd-flex align-items-center',
                            cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
                                return '<div class="grid-cell-redirect">\n' +
                                    value +
                                    '</div>';
                            }
                        },
                        { text: 'Station 명', align: 'center', datafield: 'STATION_NAME', width: '15%',},
                        { text: 'CODE', align: 'center', cellsalign: 'center', datafield: 'STATION_CODE', width: '5%'},
                        { text: '지역', align: 'center', datafield: 'STATION_AREA', width: '10%'},
                        { text: '세부지역', align: 'center', datafield: 'AREA2_NM', width: '10%'},
                        { text: '종류', align: 'center', dataField: 'LOCKER_KIND_NAME', width: '15%'},
                        { text: '래디알', align: 'center', cellsalign: 'center', datafield: 'RADIAL_NO', width: '10%'},
                        { text: '담당자', align: 'center', datafield: 'STATION_MNGR_NM', width: '10%'},
                        { text: '연락처', align: 'center', datafield: 'STATION_TEL_NO', width: '10%'},
                    ]
                });
            //save page size
            $("#lockers-stations-lockers-grid").on("pagesizechanged", function (event) {
                // event arguments.
                let args = event.args;
                // new page size.
                let pagesize = args.pagesize;
                localStorage.setItem('lockers-stations-lockers-pagesize', pagesize);
            });

            //get stations
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url: `/api/stations?station_name=${station_name}`,
                type: 'GET',
                dataType: 'JSON',
                success: function (response) {
                    if (response.code === 200) {
                        sourceStation.localdata = response.data;
                        $('#lockers-stations-stations-grid').jqxGrid('updatebounddata');
                        $("#lockers-stations-stations-grid").jqxGrid('selectrow', 0);

                        call_api_cnt += 1;
                        showLockersStationsGrid(call_api_cnt);
                    } else {
                        onlyShowErrorMessage('Error!', response.message);
                    }
                },
                error: function (err, status, errorThrown) {
                    if (err.status === 401) {
                        window.location.reload();
                    } else {
                        onlyShowErrorMessage('Error!', 'Get stations list error. Please try again!');
                        console.log('Get stations list error ' + errorThrown);
                    }
                },

            });

            //handle select row
            $("#lockers-stations-stations-grid").on('rowselect', function (event)
            {
                let rowData = event.args.row;
                showLockersStationsLockersGrid(rowData, sourceLocker, call_api_cnt);
            });

            //redirect detail station
            $("#lockers-stations-stations-grid").on("cellclick", function (event) {
                let args = event.args;
                let rowBoundIndex = args.rowindex;
                let dataField = args.datafield;
                if (dataField === 'STATION_NAME') {
                    let rowData = $('#lockers-stations-stations-grid').jqxGrid('getrowdata', rowBoundIndex);
                    if (rowData.ID) lockersStationsRedirectDetailStation(rowData.ID);
                }
            });

            //redirect detail locker
            $("#lockers-stations-lockers-grid").on("cellclick", function (event) {
                let args = event.args;
                let rowBoundIndex = args.rowindex;
                let dataField = args.datafield;
                if (dataField === 'LOCKER_NAME') {
                    let rowData = $('#lockers-stations-lockers-grid').jqxGrid('getrowdata', rowBoundIndex);
                    if (rowData.ID) lockersStationsRedirectDetailLocker(rowData.ID);
                }
            });

            //search
            $('#lockers-stations-search').on('click', function () {
                lockersStationsSearchStations();
            });
            $('#lockers-stations-filter-station-name').on('keypress', function (e) {
                if(e.which == 13) {
                    lockersStationsSearchStations();
                }
            });

            //function
            function showLockersStationsLockersGrid(station, sourceLocker) {
                if (station) {
                    $.ajaxSetup({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        }
                    });
                    $.ajax({
                        url: '/api/lockers/get-by-station/' + station.ID,
                        type: 'GET',
                        dataType: 'JSON',
                        success: function (response) {
                            if (response.code === 200) {
                                sourceLocker.localdata = response.data;
                                $('#lockers-stations-lockers-grid').jqxGrid('updatebounddata');

                                call_api_cnt += 1;
                                showLockersStationsGrid(call_api_cnt);
                            } else {
                                onlyShowErrorMessage('Error!', response.message);
                                sourceLocker.localdata = [];
                                $('#lockers-stations-lockers-grid').jqxGrid('updatebounddata');
                            }
                        },
                        error: function (err, status, errorThrown) {
                            if (err.status === 401) {
                                window.location.reload();
                            } else {
                                onlyShowErrorMessage('Error!', 'Get lockers list error. Please try again!');
                                console.log('Get detail codes list error ' + errorThrown);
                                sourceLocker.localdata = [];
                                $('#lockers-stations-lockers-grid').jqxGrid('updatebounddata');
                            }
                        },
                    });
                } else {
                    sourceLocker.localdata = [];
                    $('#lockers-stations-lockers-grid').jqxGrid('updatebounddata');
                    call_api_cnt += 1;
                    showLockersStationsGrid(call_api_cnt);
                }
            }
        } catch (err) {
            console.log('Error: ', err)
        }

    });
}
