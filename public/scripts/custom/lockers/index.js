function getLockers(name = '') {
    $(document).ready(function () {
        try {
            if (!$("#lockers-loader").length) return;
            $('input').attr('autocomplete','off');
            //loader
            $("#lockers-loader").jqxLoader({ autoOpen: true, width: 100, height: 60, imagePosition: 'top' });

            //control
            $("#lockers-search").jqxButton({});
            $("#lockers-create").jqxButton({});
            $("#lockers-save").jqxButton({});
            $("#lockers-delete").jqxButton({});
            $("#lockers-copy").jqxButton({});
            $("#lockers-redirect-create-station").jqxButton({});
            $("#lockers-free").jqxButton({});

            //filter
            $('#lockers-filter-name').val(name);
            $('#lockers-filter-name').on('keypress', function (e) {
                if(e.which == 13) {
                    lockersSearchLockers();
                }
            });

            //choose station popup
            $("#lockers-create-choose-station-window").jqxWindow({
                width: 800, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#lockers-create-choose-station-window-cancel"), modalOpacity: 0.01
            });
            $('#lockers-create-choose-station-window-ok').jqxButton({});
            $('#lockers-create-choose-station-window-cancel').jqxButton({});

            $("#lockers-edit-choose-station-window").jqxWindow({
                width: 800, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#lockers-edit-choose-station-window-cancel"), modalOpacity: 0.01
            });
            $('#lockers-edit-choose-station-window-ok').jqxButton({});
            $('#lockers-edit-choose-station-window-cancel').jqxButton({});

            //create form
            // Create jqxValidator.
            $("#lockers-create-form").jqxValidator({
                hintType: "label",
                rules: [
                    { input: "#lockers-create-name", message: "명칭 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    { input: "#lockers-create-unit-code", message: "UNIT CODE 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    {
                        input: "#lockers-create-unit-code", message: "UNIT CODE invalid!", action: 'keyup, blur', rule: function (input, commit) {
                            let value = $("#lockers-create-unit-code").val();
                            let code = $('#lockers-create-station-code').val();
                            let matcher = new RegExp("^\\d{4}-" + code + "-\\d{4}$", "g");
                            return matcher.test(value) && value.length === 14;
                        }
                    },
                    { input: "#lockers-create-station-name", message: "Station 명 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                ]
            });
            //show create form
            $('#lockers-create').on('click', function () {
                $('#lockers-create-form').trigger("reset");
                $('#lockers-create-station-id').val('');
                $('#lockers-create-station-code').val('');
                $("#lockers-grid").jqxGrid('clearselection');
                $('form').jqxValidator('hide');
                $('#lockers-edit-form').hide();
                $('#lockers-create-form').show();
            })

            //submit
            $('#lockers-create-form').on('validationError', function () {
                $('#lockers-save').jqxButton({disabled: false});
            });
            $('#lockers-create-form').on('validationSuccess', function () {
                $("#edit-window").jqxWindow('open');
                $('#edit-window').on('close', function (event) {
                    if (event.type === 'close') {
                        if (event.args.dialogResult.OK) {
                            // click Ok
                            createLocker();
                        } else if (event.args.dialogResult.Cancel) {
                            // click Cancel
                            $('#lockers-save').jqxButton({disabled: false});
                        } else {
                            // click Close
                            $('#lockers-save').jqxButton({disabled: false});
                        }
                    } else {
                        $('#lockers-save').jqxButton({disabled: false});
                    }
                    $('#edit-window').jqxWindow('destroy');
                    $('#edit-window-area').html(htmlConfirmEditModal())
                });
            });

            //edit form
            // Create jqxValidator.
            $("#lockers-edit-form").jqxValidator({
                hintType: "label",
                rules: [
                    { input: "#lockers-edit-name", message: "명칭 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    { input: "#lockers-edit-unit-code", message: "UNIT CODE 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    {
                        input: "#lockers-edit-unit-code", message: "UNIT CODE invalid!", action: 'keyup, blur', rule: function (input, commit) {
                            let value = $("#lockers-edit-unit-code").val();
                            let code = $('#lockers-edit-station-code').val();
                            let matcher = new RegExp("^\\d{4}-" + code + "-\\d{4}$", "g");
                            return matcher.test(value) && value.length === 14;
                        }
                    },
                    { input: "#lockers-edit-station-name", message: "Station 명 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                ]
            });
            //select station
            $("#lockers-grid").on('rowselect', function (event) {
                let rowData = event.args.row;
                if (rowData) {
                    $("#lockers-edit-id").val(rowData.ID);
                    $("#lockers-edit-name").val(rowData.LOCKER_NAME ? rowData.LOCKER_NAME : '');
                    $("#lockers-edit-unit-code").val(rowData.UNIT_CODE ? rowData.UNIT_CODE : '');
                    $("#lockers-edit-station-id").val(rowData.STATION_ID ? rowData.STATION_ID : '');
                    $("#lockers-edit-station-name").val(rowData.STATION_NAME ? rowData.STATION_NAME : '');
                    $("#lockers-edit-station-code").val(rowData.STATION_CODE ? rowData.STATION_CODE : '');
                    $("#lockers-edit-radial-no").val(rowData.RADIAL_NO ? rowData.RADIAL_NO : '');
                    $("#lockers-edit-kind").val(rowData.LOCKER_KIND ? rowData.LOCKER_KIND : '');
                    $("#lockers-edit-mcu-kind").val(rowData.MCU_KIND ? rowData.MCU_KIND : '');
                    $("#lockers-edit-ctrl-box-type").val(rowData.CTRL_BOX_TYPE ? rowData.CTRL_BOX_TYPE : '');
                    $("#lockers-edit-sub-mcu-yn").val(rowData.SUB_MCU_YN ? rowData.SUB_MCU_YN : '');
                    $("#lockers-edit-computer-type").val(rowData.COMPTR_TYPE ? rowData.COMPTR_TYPE : '');
                    $("#lockers-edit-os").val('');
                    $("#lockers-edit-rfid-reader").val(rowData.RFID_READER ? rowData.RFID_READER : '');
                    $("#lockers-edit-webcam").val(rowData.WEBCAM ? rowData.WEBCAM : '');
                    $("#lockers-edit-monitor-size").val(rowData.MONTR_SIZE ? rowData.MONTR_SIZE : '');
                    $("#lockers-edit-printer").val(rowData.PRINTER ? rowData.PRINTER : '');
                    $("#lockers-edit-card-terminal").val(rowData.CARD_TERMINAL ? rowData.CARD_TERMINAL : '');
                    $("#lockers-edit-locker-cnt").val(rowData.LOCKER_CNT ? rowData.LOCKER_CNT : '');
                    $("#lockers-edit-banknote-inserter").val(rowData.BANKNOTE_INSERTER ? rowData.BANKNOTE_INSERTER : '');
                    $("#lockers-edit-banknote-dispenser").val(rowData.BANKNOTE_DISPENSER ? rowData.BANKNOTE_DISPENSER : '');
                    $("#lockers-edit-lock-kind").val(rowData.LOCK_KIND ? rowData.LOCK_KIND : '');
                    $("#lockers-edit-coin-inserter").val(rowData.COIN_INSERTER ? rowData.COIN_INSERTER : '');
                    $("#lockers-edit-coin-dispenser").val(rowData.COIN_DISPENSER ? rowData.COIN_DISPENSER : '');

                    $('#lockers-create-form').jqxValidator('hide');
                    $('#lockers-create-form').hide();
                    $('#lockers-edit-form').show();
                }
            });
            $('#lockers-edit-form').on('validationError', function () {
                $('#lockers-save').jqxButton({disabled: false});
            });
            $('#lockers-edit-form').on('validationSuccess', function () {
                $("#edit-window").jqxWindow('open');
                $('#edit-window').on('close', function (event) {
                    if (event.type === 'close') {
                        if (event.args.dialogResult.OK) {
                            // click Ok
                            editLocker();
                        } else if (event.args.dialogResult.Cancel) {
                            // click Cancel
                            $('#lockers-save').jqxButton({disabled: false});
                        } else {
                            // click Close
                            $('#lockers-save').jqxButton({disabled: false});
                        }
                    } else {
                        $('#lockers-save').jqxButton({disabled: false});
                    }
                    $('#edit-window').jqxWindow('destroy');
                    $('#edit-window-area').html(htmlConfirmEditModal())
                });
            });


        //get lockers
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url: `/api/lockers?name=${name}`,
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
                        $("#lockers-grid").jqxGrid(
                            {
                                width: '98.5%',
                                source: dataAdapter,
                                sortable: true,
                                filterable: true,
                                autoheight: true,
                                pageable: true,
                                pagerheight: ROW_HEIGHT + 7,
                                pagesizeoptions: PAGE_SIZE_OPTIONS,
                                pagesize: localStorage.getItem('lockers-pagesize') ?? PAGE_SIZE_DEFAULT,
                                columnsresize: true,
                                columnsreorder: true,
                                columnsheight: ROW_HEIGHT,
                                rowsheight: ROW_HEIGHT,
                                ready: function () {
                                    // $("#lockers-grid").jqxGrid('selectrow', 0);
                                },
                                altrows: true,
                                columns: [
                                    { text: '보관함명', align: 'center', datafield: 'LOCKER_NAME', width: '15%'},
                                    { text: 'Station 명', align: 'center', datafield: 'STATION_NAME', width: '15%'},
                                    { text: 'CODE', align: 'center', cellsalign: 'center', datafield: 'STATION_CODE', width: '5%'},
                                    { text: '지역', align: 'center', datafield: 'STATION_AREA', width: '10%'},
                                    { text: '세부지역', align: 'center', datafield: 'AREA2_NM', width: '10%'},
                                    { text: '종류', align: 'center', dataField: 'LOCKER_KIND_NAME', width: '15%'},
                                    { text: '래디알', align: 'center', cellsalign: 'center', datafield: 'RADIAL_NO', width: '10%'},
                                    { text: '담당자', align: 'center', datafield: 'STATION_MNGR_NM', width: '10%'},
                                    { text: '연락처', align: 'center', datafield: 'STATION_TEL_NO', width: '10%'},
                                ]
                            });
                        setTimeout(function () {
                            $('#lockers').show();
                            $('#lockers-loader').jqxLoader('close');

                            //splitter
                            if (screenHeight > 770) {
                                $('#lockers-splitter').jqxSplitter({ width: '100%', height: PAGE_CONTENT_HEIGHT, orientation: 'horizontal', panels: [{ size: 280, min: 150 }, { min: 100}]});
                            } else {
                                $('#lockers-splitter').jqxSplitter({ width: '100%', height: PAGE_CONTENT_HEIGHT, orientation: 'horizontal', panels: [{ size: '55%', min: 150 }, { size: '45%', min: 100}]});
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
                        onlyShowErrorMessage('Error!', 'Get lockers list error. Please try again!');
                        console.log('Get lockers list error ' + errorThrown);
                    }
                },
            });
            //save page size
            $("#lockers-grid").on("pagesizechanged", function (event) {
                // event arguments.
                let args = event.args;
                // new page size.
                let pagesize = args.pagesize;
                localStorage.setItem('lockers-pagesize', pagesize);
            });

            //handle popup choose station
            $('#lockers-create-station-name').on('click', function () {
                let stationId = $('#lockers-create-station-id').val();
                createLockerShowChooseStationPopup(stationId);
            });
            $('#lockers-create-choose-station').on('click', function () {
                let stationId = $('#lockers-create-station-id').val();
                createLockerShowChooseStationPopup(stationId);
            });
            $('#lockers-edit-station-name').on('click', function () {
                let stationId = $('#lockers-edit-station-id').val();
                editLockerShowChooseStationPopup(stationId);
            })
            $('#lockers-edit-choose-station').on('click', function () {
                let stationId = $('#lockers-edit-station-id').val();
                editLockerShowChooseStationPopup(stationId);
            })

            //search
            $('#lockers-search').on('click', function () {
                lockersSearchLockers();
            });

            //submit
            $('#lockers-save').on('click', function () {
                $('#lockers-save').jqxButton({disabled: true});
                //check which form to submit
                if ($('#lockers-create-form').is(":visible")) {
                    $('#lockers-create-form').jqxValidator('validate');
                }
                if ($('#lockers-edit-form').is(":visible")) {
                    $('#lockers-edit-form').jqxValidator('validate');
                }
            });

            //delete
            $('#lockers-delete').on('click', function () {
                if ($('#lockers-edit-form').is(":visible")) {
                    $('#lockers-delete').jqxButton({disabled: true});
                    $("#delete-window").jqxWindow('open');
                    $('#delete-window').on('close', function (event) {
                        if (event.type === 'close') {
                            if (event.args.dialogResult.OK) {
                                // click Ok
                                let id = $('#lockers-edit-id').val();
                                deleteLocker(id);
                            } else if (event.args.dialogResult.Cancel) {
                                $('#lockers-delete').jqxButton({disabled: false});
                                // click Cancel
                            } else {
                                // click Close
                                $('#lockers-delete').jqxButton({disabled: false});
                            }
                        } else {
                            $('#lockers-delete').jqxButton({disabled: false});
                        }
                        $('#delete-window').jqxWindow('destroy');
                        $('#delete-window-area').html(htmlConfirmDeleteModal())
                    });
                }
            });

            //copy
            $('#lockers-copy').on('click', function () {
                let rowindex = $('#lockers-grid').jqxGrid('getselectedrowindex');
                if (rowindex > -1) {
                    let rowData = $('#lockers-grid').jqxGrid('getrowdata', rowindex);
                    if (rowData) {
                        $("#lockers-create-id").val(rowData.ID);
                        $("#lockers-create-name").val('');
                        $("#lockers-create-unit-code").val(rowData.UNIT_CODE ? rowData.UNIT_CODE : '');
                        $("#lockers-create-station-id").val(rowData.STATION_ID ? rowData.STATION_ID : '');
                        $("#lockers-create-station-name").val(rowData.STATION_NAME ? rowData.STATION_NAME : '');
                        $("#lockers-create-station-code").val(rowData.STATION_CODE ? rowData.STATION_CODE : '');
                        $("#lockers-create-radial-no").val(rowData.RADIAL_NO ? rowData.RADIAL_NO : '');
                        $("#lockers-create-kind").val(rowData.LOCKER_KIND ? rowData.LOCKER_KIND : '');
                        $("#lockers-create-mcu-kind").val(rowData.MCU_KIND ? rowData.MCU_KIND : '');
                        $("#lockers-create-ctrl-box-type").val(rowData.CTRL_BOX_TYPE ? rowData.CTRL_BOX_TYPE : '');
                        $("#lockers-create-sub-mcu-yn").val(rowData.SUB_MCU_YN ? rowData.SUB_MCU_YN : '');
                        $("#lockers-create-computer-type").val(rowData.COMPTR_TYPE ? rowData.COMPTR_TYPE : '');
                        $("#lockers-create-os").val('');
                        $("#lockers-create-rfid-reader").val(rowData.RFID_READER ? rowData.RFID_READER : '');
                        $("#lockers-create-webcam").val(rowData.WEBCAM ? rowData.WEBCAM : '');
                        $("#lockers-create-monitor-size").val(rowData.MONTR_SIZE ? rowData.MONTR_SIZE : '');
                        $("#lockers-create-printer").val(rowData.PRINTER ? rowData.PRINTER : '');
                        $("#lockers-create-card-terminal").val(rowData.CARD_TERMINAL ? rowData.CARD_TERMINAL : '');
                        $("#lockers-create-locker-cnt").val(rowData.LOCKER_CNT ? rowData.LOCKER_CNT : '');
                        $("#lockers-create-banknote-inserter").val(rowData.BANKNOTE_INSERTER ? rowData.BANKNOTE_INSERTER : '');
                        $("#lockers-create-banknote-dispenser").val(rowData.BANKNOTE_DISPENSER ? rowData.BANKNOTE_DISPENSER : '');
                        $("#lockers-create-lock-kind").val(rowData.LOCK_KIND ? rowData.LOCK_KIND : '');
                        $("#lockers-create-coin-inserter").val(rowData.COIN_INSERTER ? rowData.COIN_INSERTER : '');
                        $("#lockers-create-coin-dispenser").val(rowData.COIN_DISPENSER ? rowData.COIN_DISPENSER : '');

                        $('#lockers-create-form').jqxValidator('hide');
                        $('#lockers-edit-form').jqxValidator('hide');
                        $('#lockers-edit-form').hide();
                        $('#lockers-create-form').show();
                    }
                }
            });

            //redirect create station
            $("#lockers-redirect-create-station").on('click', function () {
                redirectCreateStation();
            });

            //function

        } catch (err) {
            console.log('Error: ', err);
        }
    });
}
