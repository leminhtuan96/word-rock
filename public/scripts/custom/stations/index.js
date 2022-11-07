function getStations(keyword = '') {
    $(document).ready(function () {
        try {
            if (!$("#stations-loader").length) return;
            $('input').attr('autocomplete','off');
            //loader
            $("#stations-loader").jqxLoader({ autoOpen: true, width: 100, height: 60, imagePosition: 'top' });

            //control
            $("#stations-search").jqxButton({});
            $("#stations-create").jqxButton({});
            $("#stations-save").jqxButton({});
            $("#stations-delete").jqxButton({});
            $("#stations-redirect-create-locker").jqxButton({});
            $("#stations-free").jqxButton({});

            //filter
            $('#stations-filter-keyword').val(keyword);
            $('#stations-filter-keyword').on('keypress', function (e) {
                if(e.which == 13) {
                    stationSSearchStations();
                }
            });

            //create form
            // Create jqxValidator.
            $("#stations-create-form").jqxValidator({
                hintType: "label",
                rules: [
                    { input: "#stations-create-name", message: "명칭을 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    {
                        input: "#stations-create-type", message: "구분을 입력하세요.", action: 'keyup, blur', rule: function (input, commit) {
                            let value = $("#stations-create-type").val();
                            return !!value;
                        }
                    },
                    { input: "#stations-create-reg-code", message: "등록코드를 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    {
                        input: "#stations-create-reg-code", message: "등록코드 은(는) 숫자 4자리입니다.", action: 'keyup, blur', rule: function (input, commit) {
                            let value = $("#stations-create-reg-code").val();
                            return /^([0-9]{4})$/.test(value) && value.length === 4;
                        }
                    },
                    {
                        input: "#stations-create-area1", message: "지역을 입력하세요.", action: 'keyup, blur', rule: function (input, commit) {
                            let value = $("#stations-create-area1").val();
                            return !!value;
                        }
                    },
                ]
            });

            //show create form
            $('#stations-create').on('click', function () {
                $('#stations-create-form').trigger("reset");
                $("#stations-grid").jqxGrid('clearselection');
                $('#stations-edit-form').hide();
                $('#stations-create-form').show();
            })

            $('#stations-create-form').on('validationError', function () {
                $('#stations-save').jqxButton({disabled: false});
            });

            $('#stations-create-form').on('validationSuccess', function () {
                $("#edit-window").jqxWindow('open');
                $('#edit-window').on('close', function (event) {
                    if (event.type === 'close') {
                        if (event.args.dialogResult.OK) {
                            // click Ok
                            createStation();
                        } else if (event.args.dialogResult.Cancel) {
                            // click Cancel
                            $('#stations-save').jqxButton({disabled: false});
                        } else {
                            // click Close
                            $('#stations-save').jqxButton({disabled: false});
                        }
                    } else {
                        $('#stations-save').jqxButton({disabled: false});
                    }
                    $('#edit-window').jqxWindow('destroy');
                    $('#edit-window-area').html(htmlConfirmEditModal())
                });
            });

            //edit form
            // Create jqxValidator.
            $("#stations-edit-form").jqxValidator({
                hintType: "label",
                rules: [
                    { input: "#stations-edit-name", message: "명칭을 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    {
                        input: "#stations-edit-type", message: "구분을 입력하세요.", action: 'keyup, blur', rule: function (input, commit) {
                            let value = $("#stations-edit-type").val();
                            return !!value;
                        }
                    },
                    { input: "#stations-edit-reg-code", message: "등록코드를 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    {
                        input: "#stations-edit-area1", message: "지역을 입력하세요.", action: 'keyup, blur', rule: function (input, commit) {
                            let value = $("#stations-edit-area1").val();
                            return !!value;
                        }
                    },
                ]
            });

            //select station
            $("#stations-grid").on('rowselect', function (event) {
                let rowData = event.args.row;
                if (rowData) {
                    $("#stations-edit-id").val(rowData.ID);
                    $("#stations-edit-name").val(rowData.STATION_NAME ? rowData.STATION_NAME : '');
                    $("#stations-edit-repr-name").val(rowData.REPR_NM ? rowData.REPR_NM : '');
                    $("#stations-edit-group").val(rowData.STATION_GROUP ? rowData.STATION_GROUP : '');
                    $("#stations-edit-manager").val(rowData.MNGR_NM ? rowData.MNGR_NM : '');
                    $("#stations-edit-type").val(rowData.STATION_TYPE ? rowData.STATION_TYPE : '');
                    $("#stations-edit-hhld-cnt").val(rowData.HHLD_CNT ? rowData.HHLD_CNT : '');
                    $("#stations-edit-telephone").val(rowData.TEL_NO ? rowData.TEL_NO : '');
                    $("#stations-edit-reg-code").val(rowData.REG_CODE ? rowData.REG_CODE : '');
                    $("#stations-edit-ctrl-cnt").val(rowData.CTRL_CNT ? rowData.CTRL_CNT : '');
                    $("#stations-edit-mobile").val(rowData.MOBL_NO ? rowData.MOBL_NO : '');
                    $("#stations-edit-area1").val(rowData.AREA1_DIV ? rowData.AREA1_DIV : '');
                    $("#stations-edit-locker-cnt").val(rowData.LOCKER_CNT ? rowData.LOCKER_CNT : '');
                    $("#stations-edit-email").val(rowData.EMAIL ? rowData.EMAIL : '');
                    $("#stations-edit-area2").val(rowData.AREA2_NM ? rowData.AREA2_NM : '');
                    $("#stations-edit-detail-address").val(rowData.DTL_ADDR ? rowData.DTL_ADDR : '');
                    $("#stations-edit-maint-type").val(rowData.MAINT_TYPE ? rowData.MAINT_TYPE : '');
                    $("#stations-edit-maint-end-ymd").val(rowData.MAINT_END_YMD ? rowData.MAINT_END_YMD : '');

                    $('#stations-create-form').jqxValidator('hide');
                    $('#stations-create-form').hide();
                    $('#stations-edit-form').show();
                }
            });

            $('#stations-edit-form').on('validationError', function () {
                $('#stations-save').jqxButton({disabled: false});
            });
            $('#stations-edit-form').on('validationSuccess', function () {
                $("#edit-window").jqxWindow('open');
                $('#edit-window').on('close', function (event) {
                    if (event.type === 'close') {
                        if (event.args.dialogResult.OK) {
                            // click Ok
                            editStation();
                        } else if (event.args.dialogResult.Cancel) {
                            // click Cancel
                            $('#stations-save').jqxButton({disabled: false});
                        } else {
                            // click Close
                            $('#stations-save').jqxButton({disabled: false});
                        }
                    } else {
                        $('#stations-save').jqxButton({disabled: false});
                    }
                    $('#edit-window').jqxWindow('destroy');
                    $('#edit-window-area').html(htmlConfirmEditModal())
                });
            });

        //get stations
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url: `/api/stations?keyword=${keyword}`,
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
                                        {name: 'MAINT_ST_YMD', type: 'string'},
                                        {name: 'MAINT_END_YMD', type: 'string'},
                                        {name: 'USE_FLAG', type: 'number'},
                                        {name: 'USE_FLAG_NAME', type: 'string'},
                                        {name: 'CREATED_AT', type: 'string'}
                                    ],
                            };
                        let dataAdapter = new $.jqx.dataAdapter(source);
                        // create jqxGrid.
                        $("#stations-grid").jqxGrid(
                            {
                                width: '98.5%',
                                source: dataAdapter,
                                sortable: true,
                                filterable: true,
                                autoheight: true,
                                pageable: true,
                                pagerheight: ROW_HEIGHT + 7,
                                pagesizeoptions: PAGE_SIZE_OPTIONS,
                                pagesize: localStorage.getItem('stations-pagesize') ?? PAGE_SIZE_DEFAULT,
                                columnsresize: true,
                                columnsreorder: true,
                                columnsheight: ROW_HEIGHT,
                                rowsheight: ROW_HEIGHT,
                                ready: function () {
                                    // $("#stations-grid").jqxGrid('selectrow', 0);
                                },
                                altrows: true,
                                columns: [
                                    { text: '등록일', align: 'center', cellsalign: 'center', datafield: 'CREATED_AT', width: '10%'},
                                    { text: '지역', align: 'center', datafield: 'AREA1_DIV_NAME', width: '10%'},
                                    { text: '세부지역', align: 'center', datafield: 'AREA2_NM', width: '10%'},
                                    { text: '구분', align: 'center', dataField: 'STATION_TYPE_NAME', width: '10%'},
                                    { text: 'Station 명', align: 'center', datafield: 'STATION_NAME', width: '30%'},
                                    { text: '담당자', align: 'center', datafield: 'MNGR_NM', width: '10%'},
                                    { text: '대표연락처', align: 'center', datafield: 'TEL_NO', width: '10%'},
                                    { text: 'Mobile', align: 'center', datafield: 'MOBL_NO', width: '10%'},
                                ]
                            });

                        setTimeout(function () {
                            $('#stations').show();
                            $('#stations-loader').jqxLoader('close');

                            //splitter
                            if (screenHeight > 724) {
                                $('#stations-splitter').jqxSplitter({ width: '100%', height: PAGE_CONTENT_HEIGHT, orientation: 'horizontal', panels: [{ size: 255, min: 150 }, { min: 100}]});
                            } else {
                                $('#stations-splitter').jqxSplitter({ width: '100%', height: PAGE_CONTENT_HEIGHT, orientation: 'horizontal', panels: [{ size: '55%', min: 150 }, { size: '45%', min: 100}]});
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
                        onlyShowErrorMessage('Error!', 'Get stations list error. Please try again!');
                        console.log('Get stations list error ' + errorThrown);
                    }
                },
            });
            //save page size
            $("#stations-grid").on("pagesizechanged", function (event) {
                // event arguments.
                let args = event.args;
                // new page size.
                let pagesize = args.pagesize;
                localStorage.setItem('stations-pagesize', pagesize);
            });

            //search
            $('#stations-search').on('click', function () {
                stationSSearchStations();
            });

            //submit
            $('#stations-save').on('click', function () {
                $('#stations-save').jqxButton({disabled: true});
                //check which form to submit
                if ($('#stations-create-form').is(":visible")) {
                    $('#stations-create-form').jqxValidator('validate');
                }
                if ($('#stations-edit-form').is(":visible")) {
                    $('#stations-edit-form').jqxValidator('validate');
                }
            });

            //delete
            $('#stations-delete').on('click', function () {
                if ($('#stations-edit-form').is(":visible")) {
                    $('#stations-delete').jqxButton({disabled: true});
                    $("#delete-window").jqxWindow('open');
                    $('#delete-window').on('close', function (event) {
                        if (event.type === 'close') {
                            if (event.args.dialogResult.OK) {
                                // click Ok
                                let id = $('#stations-edit-id').val();
                                deleteStation(id);
                            } else if (event.args.dialogResult.Cancel) {
                                $('#stations-delete').jqxButton({disabled: false});
                                // click Cancel
                            } else {
                                // click Close
                                $('#stations-delete').jqxButton({disabled: false});
                            }
                        } else {
                            $('#stations-delete').jqxButton({disabled: false});
                        }
                        $('#delete-window').jqxWindow('destroy');
                        $('#delete-window-area').html(htmlConfirmDeleteModal())
                    });
                }
            });

            //redirect create locker
            $("#stations-redirect-create-locker").on('click', function () {
                redirectCreateLocker();
            });

            //function

        } catch (err) {
            console.log('Error: ', err)
        }

    });
}
