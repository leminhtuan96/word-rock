function getStationsLockers(station_name = '') {
    $(document).ready(function () {
        try {
            if (!$("#stations-lockers-loader").length) return;
            $('input').attr('autocomplete','off');
            //check call api
            let call_api_cnt = 0
            //loader
            $("#stations-lockers-loader").jqxLoader({ autoOpen: true, width: 100, height: 60, imagePosition: 'top' });

            //control
            $("#stations-lockers-search").jqxButton({});
            $("#stations-lockers-excel").jqxButton({});

            //filter
            $('#stations-lockers-filter-station-name').val(station_name);

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
            $("#stations-lockers-stations-grid").jqxGrid(
                {
                    width: '98.5%',
                    source: dataAdapterStation,
                    sortable: true,
                    autoheight: true,
                    pageable: true,
                    pagerheight: ROW_HEIGHT + 7,
                    pagesizeoptions: PAGE_SIZE_OPTIONS,
                    pagesize: localStorage.getItem('stations-lockers-stations-pagesize') ?? PAGE_SIZE_DEFAULT,
                    columnsresize: true,
                    columnsreorder: true,
                    columnsheight: ROW_HEIGHT,
                    rowsheight: ROW_HEIGHT,
                    ready: function () {
                        // $("#stations-lockers-stations-grid").jqxGrid('selectrow', 0);
                    },
                    altrows: true,
                    columns: [
                        { text: '?????????', align: 'center', cellsalign: 'center', datafield: 'CREATED_AT', width: '8%'},
                        { text: '??????', align: 'center', datafield: 'AREA1_DIV_NAME', width: '8%'},
                        { text: '????????????', align: 'center', datafield: 'AREA2_NM', width: '8%'},
                        { text: '??????', align: 'center', dataField: 'STATION_TYPE_NAME', width: '8%'},
                        {
                            text: 'Station ???',
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
                        { text: '?????????', align: 'center', datafield: 'MNGR_NM', width: '8%'},
                        { text: '???????????????', align: 'center', datafield: 'TEL_NO', width: '8%'},
                        { text: 'Mobile', align: 'center', datafield: 'MOBL_NO', width: '8%'},
                        { text: '????????????', align: 'center', cellsalign: 'center', datafield: 'MAINT_TYPE_NAME', width: '8%'},
                        { text: '?????????????????????', align: 'center', cellsalign: 'center', datafield: 'MAINT_END_YMD', width: '8%'},
                    ]
                });
            //save page size
            $("#stations-lockers-stations-grid").on("pagesizechanged", function (event) {
                // event arguments.
                let args = event.args;
                // new page size.
                let pagesize = args.pagesize;
                localStorage.setItem('stations-lockers-stations-pagesize', pagesize);
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
            $("#stations-lockers-lockers-grid").jqxGrid(
                {
                    width: '98.5%',
                    source: dataAdapterLocker,
                    sortable: true,
                    autoheight: true,
                    pageable: true,
                    pagerheight: ROW_HEIGHT + 7,
                    pagesizeoptions: PAGE_SIZE_OPTIONS,
                    pagesize: localStorage.getItem('stations-lockers-lockers-pagesize') ?? PAGE_SIZE_DEFAULT,
                    columnsresize: true,
                    columnsreorder: true,
                    columnsheight: ROW_HEIGHT,
                    rowsheight: ROW_HEIGHT,
                    ready: function () {
                        // $("#stations-lockers-lockers-grid").jqxGrid('selectrow', 0);
                    },
                    altrows: true,
                    columns: [
                        {
                            text: '????????????',
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
                        { text: 'Station ???', align: 'center', datafield: 'STATION_NAME', width: '15%',},
                        { text: 'CODE', align: 'center', cellsalign: 'center', datafield: 'STATION_CODE', width: '5%'},
                        { text: '??????', align: 'center', datafield: 'STATION_AREA', width: '10%'},
                        { text: '????????????', align: 'center', datafield: 'AREA2_NM', width: '10%'},
                        { text: '??????', align: 'center', dataField: 'LOCKER_KIND_NAME', width: '15%'},
                        { text: '?????????', align: 'center', cellsalign: 'center', datafield: 'RADIAL_NO', width: '10%'},
                        { text: '?????????', align: 'center', datafield: 'STATION_MNGR_NM', width: '10%'},
                        { text: '?????????', align: 'center', datafield: 'STATION_TEL_NO', width: '10%'},
                    ]
                });
            //save page size
            $("#stations-lockers-lockers-grid").on("pagesizechanged", function (event) {
                // event arguments.
                let args = event.args;
                // new page size.
                let pagesize = args.pagesize;
                localStorage.setItem('stations-lockers-lockers-pagesize', pagesize);
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
                        $('#stations-lockers-stations-grid').jqxGrid('updatebounddata');
                        $("#stations-lockers-stations-grid").jqxGrid('selectrow', 0);

                        call_api_cnt += 1;
                        showStationsLockersGrid(call_api_cnt);
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
            $("#stations-lockers-stations-grid").on('rowselect', function (event)
            {
                let rowData = event.args.row;
                showStationsLockersLockersGrid(rowData, sourceLocker);
            });

            //redirect detail station
            $("#stations-lockers-stations-grid").on("cellclick", function (event) {
                let args = event.args;
                let rowBoundIndex = args.rowindex;
                let dataField = args.datafield;
                if (dataField === 'STATION_NAME') {
                    let rowData = $('#stations-lockers-stations-grid').jqxGrid('getrowdata', rowBoundIndex);
                    if (rowData.ID) redirectDetailStation(rowData.ID);
                }
            });

            //redirect detail locker
            $("#stations-lockers-lockers-grid").on("cellclick", function (event) {
                let args = event.args;
                let rowBoundIndex = args.rowindex;
                let dataField = args.datafield;
                if (dataField === 'LOCKER_NAME') {
                    let rowData = $('#stations-lockers-lockers-grid').jqxGrid('getrowdata', rowBoundIndex);
                    if (rowData.ID) redirectDetailLocker(rowData.ID);
                }
            });

            //search
            $('#stations-lockers-search').on('click', function () {
                stationsLockersSearchStations();
            });
            $('#stations-lockers-filter-station-name').on('keypress', function (e) {
                if(e.which == 13) {
                    stationsLockersSearchStations();
                }
            });

            //function
            function showStationsLockersLockersGrid(station, sourceLocker) {
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
                                $('#stations-lockers-lockers-grid').jqxGrid('updatebounddata');

                                call_api_cnt += 1;
                                showStationsLockersGrid(call_api_cnt);
                            } else {
                                onlyShowErrorMessage('Error!', response.message);
                                sourceLocker.localdata = [];
                                $('#stations-lockers-lockers-grid').jqxGrid('updatebounddata');
                            }
                        },
                        error: function (err, status, errorThrown) {
                            if (err.status === 401) {
                                window.location.reload();
                            } else {
                                onlyShowErrorMessage('Error!', 'Get lockers list error. Please try again!');
                                console.log('Get detail codes list error ' + errorThrown);
                                sourceLocker.localdata = [];
                                $('#stations-lockers-lockers-grid').jqxGrid('updatebounddata');
                            }
                        },
                    });
                } else {
                    sourceLocker.localdata = [];
                    $('#stations-lockers-lockers-grid').jqxGrid('updatebounddata');
                    call_api_cnt += 1;
                    showStationsLockersGrid(call_api_cnt);
                }
            }
        } catch (err) {
            console.log('Error: ', err)
        }

    });
}
