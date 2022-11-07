function getEquipments(kind = '', name = '', model = '', purc_name = '') {
    $(document).ready(function () {
        try {
            if (!$("#equipments-loader").length) return;
            $('input').attr('autocomplete','off');
            //loader
            $("#equipments-loader").jqxLoader({ autoOpen: true, width: 100, height: 60, imagePosition: 'top' });

            //control
            $("#equipments-search").jqxButton({});
            $("#equipments-create").jqxButton({});
            $("#equipments-save").jqxButton({});
            $("#equipments-delete").jqxButton({});
            $("#equipments-excel").jqxButton({});

            //filter
            $('#equipments-filter-kind').val(kind);
            $('#equipments-filter-name').val(name);
            $('#equipments-filter-model').val(model);
            $('#equipments-filter-purc-name').val(purc_name);

            //create form
            // Create jqxValidator.
            $("#equipments-create-form").jqxValidator({
                hintType: "label",
                rules: [
                    { input: "#equipments-create-name", message: "장비명 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    {
                        input: "#equipments-create-manu-ym", message: "제조년월 invalid!", action: 'keyup, blur', rule: function (input, commit) {
                            let value = $("#equipments-create-manu-ym").val();
                            if (!value) return true;
                            let regEx = /^\d{4}\.\d{2}$/;
                            if(!value.match(regEx)) return false;  // Invalid format
                            var d = new Date(value);
                            var dNum = d.getTime();
                            if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
                            return true;
                        }
                    },
                ]
            });

            //change kind
            $('#equipments-create-kind').on('change', function () {
                if ($(this).val() == DETAIL_CODES.EQUIP_KIND.COMPUTER) {
                    $('#create-computer-kind').show();
                    $('#create-monitor-kind').hide();
                    $('#create-other-kind').hide();
                    $('#equipments-create-interface-area').hide();
                } else if ($(this).val() == DETAIL_CODES.EQUIP_KIND.MONITOR) {
                    $('#create-computer-kind').hide();
                    $('#create-monitor-kind').show();
                    $('#create-other-kind').hide();
                    $('#equipments-create-interface-area').show();
                } else {
                    $('#create-computer-kind').hide();
                    $('#create-monitor-kind').hide();
                    $('#create-other-kind').show();
                    $('#equipments-create-interface-area').show();
                }
            });

            //show create form
            $('#equipments-create').on('click', function () {
                $('#equipments-create-form').trigger("reset");
                $("#equipments-grid").jqxGrid('clearselection');
                $('#equipments-edit-form').hide();
                $('#equipments-create-form').show();
            })

            $('#equipments-create-form').on('validationError', function () {
                $('#equipments-save').jqxButton({disabled: false});
            });

            $('#equipments-create-form').on('validationSuccess', function () {
                $("#edit-window").jqxWindow('open');
                $('#edit-window').on('close', function (event) {
                    if (event.type === 'close') {
                        if (event.args.dialogResult.OK) {
                            // click Ok
                            createEquipment();
                        } else if (event.args.dialogResult.Cancel) {
                            // click Cancel
                            $('#equipments-save').jqxButton({disabled: false});
                        } else {
                            // click Close
                            $('#equipments-save').jqxButton({disabled: false});
                        }
                    } else {
                        $('#equipments-save').jqxButton({disabled: false});
                    }
                    $('#edit-window').jqxWindow('destroy');
                    $('#edit-window-area').html(htmlConfirmEditModal())
                });
            });

        //edit form
            // Create jqxValidator.
            $("#equipments-edit-form").jqxValidator({
                hintType: "label",
                rules: [
                    { input: "#equipments-edit-name", message: "장비명 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                ]
            });

            //select equipment
            $("#equipments-grid").on('rowselect', function (event) {
                let rowData = event.args.row;
                if (rowData) {
                    $("#equipments-edit-id").val(rowData.ID);
                    $("#equipments-edit-kind").val(rowData.EQUIP_KIND ? rowData.EQUIP_KIND : '');
                    $("#equipments-edit-name").val(rowData.EQUIP_NAME ? rowData.EQUIP_NAME : '');
                    $("#equipments-edit-model").val(rowData.MODEL_NAME ? rowData.MODEL_NAME : '');
                    $("#equipments-edit-manu-name").val(rowData.MANU_NAME ? rowData.MANU_NAME : '');
                    $("#equipments-edit-manu-ym").val(rowData.MANU_YM ? rowData.MANU_YM : '');
                    $("#equipments-edit-os").val(rowData.OS_KIND ? rowData.OS_KIND : '');

                    $("#equipments-edit-touch-method").val(rowData.TOUCH_MTH ? rowData.TOUCH_MTH : '');
                    $("#equipments-edit-interface").val(rowData.INTERFACE ? rowData.INTERFACE : '');
                    $("#equipments-edit-power").val(rowData.POWER ? rowData.POWER : '');

                    $("#equipments-edit-purc-mth").val(rowData.PURC_MTH ? rowData.PURC_MTH : '');
                    $("#equipments-edit-purc-name").val(rowData.PURC_NAME ? rowData.PURC_NAME : '');
                    $("#equipments-edit-telephone").val(rowData.TEL_NO ? rowData.TEL_NO : '');
                    $("#equipments-edit-use-flag").val(rowData.USE_FLAG ? rowData.USE_FLAG : '');

                    if (rowData.EQUIP_KIND == DETAIL_CODES.EQUIP_KIND.COMPUTER) {
                        $('#edit-computer-kind').show();
                        $('#edit-monitor-kind').hide();
                        $('#edit-other-kind').hide();
                    } else if (rowData.EQUIP_KIND == DETAIL_CODES.EQUIP_KIND.MONITOR) {
                        $('#edit-computer-kind').hide();
                        $('#edit-monitor-kind').show();
                        $('#edit-other-kind').hide();
                    } else {
                        $('#edit-computer-kind').hide();
                        $('#edit-monitor-kind').hide();
                        $('#edit-other-kind').show();
                    }

                    $('#equipments-create-form').jqxValidator('hide');
                    $('#equipments-create-form').hide();
                    $('#equipments-edit-form').show();
                }
            });

            //change kind
            $('#equipments-edit-kind').on('change', function () {
                if ($(this).val() == DETAIL_CODES.EQUIP_KIND.COMPUTER) {
                    $('#edit-computer-kind').show();
                    $('#edit-monitor-kind').hide();
                    $('#edit-other-kind').hide();
                    $('#equipments-edit-interface-area').hide();
                } else if ($(this).val() == DETAIL_CODES.EQUIP_KIND.MONITOR) {
                    $('#edit-computer-kind').hide();
                    $('#edit-monitor-kind').show();
                    $('#edit-other-kind').hide();
                    $('#equipments-edit-interface-area').show();
                } else {
                    $('#edit-computer-kind').hide();
                    $('#edit-monitor-kind').hide();
                    $('#edit-other-kind').show();
                    $('#equipments-edit-interface-area').show();
                }
            });

            $('#equipments-edit-form').on('validationError', function () {
                $('#equipments-save').jqxButton({disabled: false});
            });
            $('#equipments-edit-form').on('validationSuccess', function () {
                $("#edit-window").jqxWindow('open');
                $('#edit-window').on('close', function (event) {
                    if (event.type === 'close') {
                        if (event.args.dialogResult.OK) {
                            // click Ok
                            editEquipment();
                        } else if (event.args.dialogResult.Cancel) {
                            // click Cancel
                            $('#equipments-save').jqxButton({disabled: false});
                        } else {
                            // click Close
                            $('#equipments-save').jqxButton({disabled: false});
                        }
                    } else {
                        $('#equipments-save').jqxButton({disabled: false});
                    }
                    $('#edit-window').jqxWindow('destroy');
                    $('#edit-window-area').html(htmlConfirmEditModal())
                });
            });

        //get equipments
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url: `/api/equipments?kind=${kind}&name=${name}&model=${model}&purc_name=${purc_name}`,
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
                                        {name: 'EQUIP_KIND', type: 'number'},
                                        {name: 'EQUIP_KIND_NAME', type: 'string'},
                                        {name: 'EQUIP_NAME', type: 'string'},
                                        {name: 'MODEL_NAME', type: 'string'},
                                        {name: 'MANU_NAME', type: 'string'},
                                        {name: 'MANU_YM', type: 'string'},
                                        {name: 'OS_KIND', type: 'number'},
                                        {name: 'TOUCH_MTH', type: 'number'},
                                        {name: 'POWER', type: 'string'},
                                        {name: 'INTERFACE', type: 'number'},
                                        {name: 'PURC_MTH', type: 'number'},
                                        {name: 'PURC_NAME', type: 'string'},
                                        {name: 'TEL_NO', type: 'string'},
                                        {name: 'USE_FLAG', type: 'number'},
                                        {name: 'USE_FLAG_NAME', type: 'string'},
                                        {name: 'CREATED_AT', type: 'string'}
                                    ],
                            };
                        let dataAdapter = new $.jqx.dataAdapter(source);
                        // create jqxGrid.
                        $("#equipments-grid").jqxGrid(
                            {
                                width: '98.5%',
                                source: dataAdapter,
                                sortable: true,
                                filterable: true,
                                autoheight: true,
                                pageable: true,
                                pagerheight: ROW_HEIGHT + 7,
                                pagesizeoptions: PAGE_SIZE_OPTIONS,
                                pagesize: localStorage.getItem('equipments-pagesize') ?? PAGE_SIZE_DEFAULT,
                                columnsresize: true,
                                columnsreorder: true,
                                columnsheight: ROW_HEIGHT,
                                rowsheight: ROW_HEIGHT,
                                ready: function () {
                                    // $("#equipments-grid").jqxGrid('selectrow', 0);
                                },
                                altrows: true,
                                columns: [
                                    { text: '장비명', align: 'center', datafield: 'EQUIP_NAME', width: '20%'},
                                    { text: '장비분류', align: 'center', datafield: 'EQUIP_KIND_NAME', width: '15%'},
                                    { text: '모델명', align: 'center', datafield: 'MODEL_NAME', width: '15%'},
                                    { text: '인터페이스', align: 'center', dataField: 'INTERFACE', width: '15%'},
                                    { text: '제조년월', align: 'center', cellsalign: 'center', datafield: 'MANU_YM', width: '10%'},
                                    { text: '구매처', align: 'center', datafield: 'PURC_NAME', width: '15%'},
                                    { text: '연락처', align: 'center', datafield: 'TEL_NO', width: '10%'},
                                ]
                            });
                        setTimeout(function () {
                            $('#equipments').show();
                            $('#equipments-loader').jqxLoader('close');

                            //splitter
                            if (screenHeight > 815) {
                                $('#equipments-splitter').jqxSplitter({ width: '100%', height: PAGE_CONTENT_HEIGHT, orientation: 'horizontal', panels: [{ size: 305, min: 150 }, { min: 100}]});
                            } else {
                                $('#equipments-splitter').jqxSplitter({ width: '100%', height: PAGE_CONTENT_HEIGHT, orientation: 'horizontal', panels: [{ size: '55%', min: 150 }, { size: '45%', min: 100}]});
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
                        onlyShowErrorMessage('Error!', 'Get equipments list error. Please try again!');
                        console.log('Get equipments list error ' + errorThrown);
                    }
                },
            });
            //save page size
            $("#equipments-grid").on("pagesizechanged", function (event) {
                // event arguments.
                let args = event.args;
                // new page size.
                let pagesize = args.pagesize;
                localStorage.setItem('equipments-pagesize', pagesize);
            });

            //search
            $('#equipments-search').on('click', function () {
                equipmentsSearchEquipments();
            });
            $('#equipments-filter-name').on('keypress', function (e) {
                if(e.which == 13) {
                    equipmentsSearchEquipments();
                }
            });
            $('#equipments-filter-model').on('keypress', function (e) {
                if(e.which == 13) {
                    equipmentsSearchEquipments();
                }
            });
            $('#equipments-filter-purc-name').on('keypress', function (e) {
                if(e.which == 13) {
                    equipmentsSearchEquipments();
                }
            });

            //submit
            $('#equipments-save').on('click', function () {
                $('#equipments-save').jqxButton({disabled: true});
                //check which form to submit
                if ($('#equipments-create-form').is(":visible")) {
                    $('#equipments-create-form').jqxValidator('validate');
                }
                if ($('#equipments-edit-form').is(":visible")) {
                    $('#equipments-edit-form').jqxValidator('validate');
                }
            });

            //delete
            $('#equipments-delete').on('click', function () {
                if ($('#equipments-edit-form').is(":visible")) {
                    $('#equipments-delete').jqxButton({disabled: true});
                    $("#delete-window").jqxWindow('open');
                    $('#delete-window').on('close', function (event) {
                        if (event.type === 'close') {
                            if (event.args.dialogResult.OK) {
                                // click Ok
                                let id = $('#equipments-edit-id').val();
                                deleteEquipment(id);
                            } else if (event.args.dialogResult.Cancel) {
                                $('#equipments-delete').jqxButton({disabled: false});
                                // click Cancel
                            } else {
                                // click Close
                                $('#equipments-delete').jqxButton({disabled: false});
                            }
                        } else {
                            $('#equipments-delete').jqxButton({disabled: false});
                        }
                        $('#delete-window').jqxWindow('destroy');
                        $('#delete-window-area').html(htmlConfirmDeleteModal())
                    });
                }
            });

            //export excel
            $("#equipments-excel").click(function () {
                $("#equipments-grid").jqxGrid('exportdata', 'xlsx', 'equipments-list');
            });

            //function

        } catch (err) {
            console.log('Error: ', err)
        }

    });
}
