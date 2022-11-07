function getCodes(code = '', name = '') {
    $(document).ready(function () {
        try {
            if (!$("#codes-loader").length) return;
            $('input').attr('autocomplete','off');
            //remove codes in localstorage
            localStorage.removeItem("master_codes");
            localStorage.removeItem("detail_codes");
            localStorage.removeItem("delete_master_codes");
            localStorage.removeItem("delete_detail_codes");

            //loader
            $("#codes-loader").jqxLoader({ autoOpen: true, width: 100, height: 60, imagePosition: 'top' });

            //control
            $("#codes-search").jqxButton({});
            $("#codes-save").jqxButton({});
            $("#codes-reset").jqxButton({});
            $("#codes-excel").jqxButton({});

            //filter
            $('#codes-code').val(code);
            $('#codes-name').val(name);

        //get codes
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url: `/api/codes?code=${code}&name=${name}`,
                type: 'GET',
                dataType: 'JSON',
                success: function (response) {
                    if (response.code === 200) {
                        let use_flag = response.use_flag;

                        //master codes edit popup

                        // Create jqxValidator.
                        $("#master-codes-popup-edit").jqxValidator({
                            hintType: "label",
                            rules: [
                                { input: "#master-codes-popup-edit-code", message: "Code 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                                { input: "#master-codes-popup-edit-name", message: "Name 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                            ]
                        });
                        // initialize the popup window and buttons.
                        $("#master-codes-popup-edit").jqxWindow({
                            width: 270, height: 190, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#master-codes-popup-edit-cancel"), modalOpacity: 0.01
                        });
                        $("#master-codes-popup-edit").on('open', function () {
                            $("#master-codes-popup-edit-code").jqxInput('selectAll');
                        });
                        $("#master-codes-popup-edit").on('close', function () {
                            $('#master-codes-popup-edit').jqxValidator('hide');
                        });

                        $("#master-codes-popup-edit-cancel").jqxButton({ height: ROW_HEIGHT });
                        // $("#master-codes-popup-edit-delete").jqxButton({ height: ROW_HEIGHT });
                        $("#master-codes-popup-edit-save").jqxButton({ height: ROW_HEIGHT });
                        // delete row when the user clicks the 'Delete' button.
                        $("#master-codes-popup-edit-delete").click(function () {
                            let uid = $('#master-codes-popup-edit-uid').val();
                            let id = $('#master-codes-popup-edit-id').val();

                            let deleteData = {
                                uid,
                                id
                            };
                            saveDeletedMasterCodeToStorage(deleteData);

                            $("#master-codes-grid").jqxGrid('deleterow', uid);

                            //delete detail codes grid
                            sourceDetail.localdata = [];
                            $('#detail-codes-grid').jqxGrid('updatebounddata');

                            $("#master-codes-popup-edit").jqxWindow('hide');
                        });

                        // update the edited row when the user clicks the 'Save' button.
                        $("#master-codes-popup-edit-save").click(function () {
                            $('#master-codes-popup-edit').jqxValidator('validate');
                        });



                        $('#master-codes-popup-edit').on('validationSuccess', function () {
                            let uid = $('#master-codes-popup-edit-uid').val();
                            let id = $('#master-codes-popup-edit-id').val();

                            //update storage
                            let dataStorage = {
                                uid,
                                id,
                                code: $('#master-codes-popup-edit-code').val(),
                                name: $('#master-codes-popup-edit-name').val(),
                                use_flag: $('#master-codes-popup-edit-use-flag').val(),
                            }
                            saveChangedMasterCodeToStorage(dataStorage);

                            //update grid
                            let rowDataNew = {
                                ID: id,
                                CODEM_CD: $('#master-codes-popup-edit-code').val(),
                                CODEM_NAME: $('#master-codes-popup-edit-name').val(),
                                USE_FLAG: $('#master-codes-popup-edit-use-flag').val(),
                                USE_FLAG_NAME: getKeyForValue(use_flag.detail, $('#master-codes-popup-edit-use-flag').val()),
                            }
                            $('#master-codes-grid').jqxGrid('updaterow', uid, rowDataNew);

                            $("#master-codes-popup-edit").jqxWindow('hide');
                        });

                        //detail codes edit popup
                        // Create jqxValidator.
                        $("#detail-codes-popup-edit").jqxValidator({
                            hintType: "label",
                            rules: [
                                { input: "#detail-codes-popup-edit-code", message: "Code 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                                { input: "#detail-codes-popup-edit-name", message: "Name 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                                // { input: "#detail-codes-popup-edit-sort", message: "Order sort 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                                {
                                    input: "#detail-codes-popup-edit-sort", message: "Order sort must be greater than 0 and required!", action: 'keyup, blur', rule: function (input, commit) {
                                        let value = $("#detail-codes-popup-edit-sort").val();
                                        return value > 0;
                                    }
                                },
                            ]
                        });
                        // initialize the popup window and buttons.
                        $("#detail-codes-popup-edit").jqxWindow({
                            width: 270, height: 240, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#detail-codes-popup-edit-cancel"), modalOpacity: 0.01
                        });
                        $("#detail-codes-popup-edit").on('open', function () {
                            $("#detail-codes-popup-edit-code").focus();
                        });
                        $("#detail-codes-popup-edit").on('close', function () {
                            $('#detail-codes-popup-edit').jqxValidator('hide');
                        });

                        $("#detail-codes-popup-edit-cancel").jqxButton({ height: ROW_HEIGHT });
                        // $("#detail-codes-popup-edit-delete").jqxButton({ height: ROW_HEIGHT });
                        $("#detail-codes-popup-edit-save").jqxButton({ height: ROW_HEIGHT });
                        // delete the edited row when the user clicks the 'Delete' button.
                        $("#detail-codes-popup-edit-delete").click(function () {
                            let uid = $('#detail-codes-popup-edit-uid').val();
                            let id = $('#detail-codes-popup-edit-id').val();

                            let deleteData = {
                                uid,
                                id,
                            };
                            saveDeletedDetailCodeToStorage(deleteData);

                            $("#detail-codes-grid").jqxGrid('deleterow', uid);

                            $("#detail-codes-popup-edit").jqxWindow('hide');
                        });
                        // update the edited row when the user clicks the 'Save' button.
                        $("#detail-codes-popup-edit-save").click(function () {
                            $('#detail-codes-popup-edit').jqxValidator('validate');
                        });

                        $('#detail-codes-popup-edit').on('validationSuccess', function () {
                            let uid = $('#detail-codes-popup-edit-uid').val();
                            let id = $('#detail-codes-popup-edit-id').val();

                            //update storage
                            let dataStorage = {
                                uid,
                                id,
                                master_uid: $('#detail-codes-popup-edit-master-uid').val(),
                                master_id: $('#detail-codes-popup-edit-master-id').val(),
                                code: $('#detail-codes-popup-edit-code').val(),
                                name: $('#detail-codes-popup-edit-name').val(),
                                sort: $('#detail-codes-popup-edit-sort').val(),
                                use_flag: $('#detail-codes-popup-edit-use-flag').val(),
                            }
                            saveChangedDetailCodeToStorage(dataStorage);

                            //update grid
                            let rowDataNew = {
                                ID: id,
                                CODED_CD: $('#detail-codes-popup-edit-code').val(),
                                CODED_NAME: $('#detail-codes-popup-edit-name').val(),
                                DISP_SORT: $('#detail-codes-popup-edit-sort').val(),
                                USE_FLAG: $('#detail-codes-popup-edit-use-flag').val(),
                                USE_FLAG_NAME: getKeyForValue(use_flag.detail, $('#detail-codes-popup-edit-use-flag').val()),
                            }
                            $('#detail-codes-grid').jqxGrid('updaterow', uid, rowDataNew);

                            $("#detail-codes-popup-edit").jqxWindow('hide');
                        });

                        //master codes grid
                        let sourceMaster =
                            {
                                datatype: "array",
                                datafields: [
                                    { name: 'ID', type: 'number' },
                                    { name: 'CODEM_CD', type: 'string' },
                                    { name: 'CODEM_NAME', type: 'string' },
                                    { name: 'USE_FLAG', type: 'number' },
                                    { name: 'USE_FLAG_NAME', type: 'string' },
                                ],
                                localdata: response.master_codes,
                            };

                        let sourceDetail =
                            {
                                datatype: "array",
                                datafields: [
                                    { name: 'ID', type: 'number' },
                                    { name: 'CODED_CD', type: 'string' },
                                    { name: 'CODED_NAME', type: 'string' },
                                    { name: 'DISP_SORT', type: 'number' },
                                    { name: 'USE_FLAG', type: 'number' },
                                    { name: 'USE_FLAG_NAME', type: 'string' },
                                ],
                                localdata: [],
                            };

                        let dataAdapterMaster = new $.jqx.dataAdapter(sourceMaster);
                        $("#master-codes-grid").jqxGrid(
                            {
                                width: '98.5%',
                                source: dataAdapterMaster,
                                sortable: true,
                                autoheight: true,
                                showtoolbar: true,
                                columnsresize: true,
                                columnsheight: ROW_HEIGHT,
                                rowsheight: ROW_HEIGHT,
                                toolbarheight: ROW_HEIGHT + 7,
                                ready: function () {
                                    $("#master-codes-grid").jqxGrid('selectrow', 0);
                                },
                                rendertoolbar: function (toolbar) {
                                    let container = $("<div class='p-1'></div>");
                                    toolbar.append(container);
                                    container.append('<b class="title-grid"><img src="/icons/edit.png">공통코드</b>');
                                    container.append('<input style="float: right; font-size: 12px" class="secondary-button" id="master-codes-addrowbutton" type="button" value="추가" />');
                                    $("#master-codes-addrowbutton").jqxButton({width: 75, height: ROW_HEIGHT});
                                    // create new row.
                                    $("#master-codes-addrowbutton").on('click', function () {
                                        let rows = $('#master-codes-grid').jqxGrid('getrows');
                                        let commit = $("#master-codes-grid").jqxGrid('addrow', null, {uid: rows.length });
                                        $("#master-codes-grid").jqxGrid('selectrow', rows.length - 1);
                                        showPopupMasterCodesEdit(rows.length - 1)
                                    });
                                },
                                altrows: true,
                                columns: [
                                    {
                                        text: '#',
                                        align: 'center',
                                        datafield: 'uid',
                                        cellsalign: 'center',
                                        width: '10%',
                                        cellclassname : 'd-flex align-items-center',
                                        cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
                                            return (+value + 1) + '';
                                        }
                                    },
                                    {
                                        text: '코드',
                                        align: 'center',
                                        cellsalign: 'center',
                                        datafield: 'CODEM_CD',
                                        width: '20%',
                                    },
                                    {
                                        text: '코드명',
                                        align: 'center',
                                        datafield: 'CODEM_NAME',
                                        width: '35%',
                                    },
                                    {
                                        text: '사용유무',
                                        align: 'center',
                                        cellsalign: 'center',
                                        datafield: 'USE_FLAG_NAME',
                                        width: '20%',
                                    },
                                    {
                                        text: '행동',
                                        align: 'center',
                                        cellsalign: 'center',
                                        columntype: 'button',
                                        cellclassname: 'secondary-button-area',
                                        sortable: false,
                                        filterable : false,
                                        width: '15%',
                                        cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
                                            return '편집';
                                        },
                                        buttonclick: function (row) {
                                            // open the popup window when the user clicks a button.
                                            showPopupMasterCodesEdit(row);
                                        }
                                    }
                                ]
                            });
                        //handle select row
                        $("#master-codes-grid").on('rowselect', function (event)
                        {
                            let rowData = event.args.row;
                            showDetailCodesGrid(rowData, sourceDetail);
                            $("#detail-codes-popup-edit-master-id").val(rowData ? rowData.ID : '')
                            $("#detail-codes-popup-edit-master-uid").val(rowData ? rowData.uid : '')
                        });

                        //detail codes grid
                        let dataAdapterDetail = new $.jqx.dataAdapter(sourceDetail);
                        $("#detail-codes-grid").jqxGrid(
                            {
                                width: '98.5%',
                                source: dataAdapterDetail,
                                sortable: true,
                                filterable: true,
                                autoheight: true,
                                showtoolbar: true,
                                columnsresize: true,
                                columnsheight: ROW_HEIGHT,
                                rowsheight: ROW_HEIGHT,
                                toolbarheight: ROW_HEIGHT + 7,
                                rendertoolbar: function (toolbar) {
                                    let container = $("<div class='p-1'></div>");
                                    toolbar.append(container);
                                    container.append('<b class="title-grid"><img src="/icons/edit.png">상세코드</b>');
                                    container.append('<input style="float: right; font-size: 12px" class="secondary-button" id="detail-codes-addrowbutton" type="button" value="추가" />');
                                    $("#detail-codes-addrowbutton").jqxButton({width: 75, height: ROW_HEIGHT});
                                    // create new row.
                                    $("#detail-codes-addrowbutton").on('click', function () {
                                        let rows = $('#detail-codes-grid').jqxGrid('getrows');
                                        let commit = $("#detail-codes-grid").jqxGrid('addrow', null, {uid: rows.length});
                                        showPopupDetailCodesEdit(rows.length - 1)
                                    });
                                },
                                altrows: true,
                                columns: [
                                    {
                                        text: '#',
                                        align: 'center',
                                        datafield: 'uid',
                                        cellsalign: 'center',
                                        width: '10%',
                                        cellclassname : 'd-flex align-items-center',
                                        cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
                                            return (+value + 1) + '';
                                        }
                                    },
                                    {
                                        text: '코드',
                                        align: 'center',
                                        cellsalign: 'center',
                                        datafield: 'CODED_CD',
                                        width: '20%'
                                    },
                                    {
                                        text: '코드명',
                                        align: 'center',
                                        datafield: 'CODED_NAME',
                                        width: '25%'
                                    },
                                    {
                                        text: '표시순서',
                                        align: 'center',
                                        cellsalign: 'center',
                                        datafield: 'DISP_SORT',
                                        width: '10%'
                                    },
                                    {
                                        text: '사용유무',
                                        align: 'center',
                                        cellsalign: 'center',
                                        datafield: 'USE_FLAG_NAME',
                                        width: '20%'
                                    },
                                    {
                                        text: '행동',
                                        align: 'center',
                                        cellsalign: 'center',
                                        datafield: 'Edit',
                                        columntype: 'button',
                                        cellclassname: 'secondary-button-area',
                                        sortable: false,
                                        filterable : false,
                                        width: '15%',
                                        cellsrenderer: function () {
                                            return "편집";
                                        }, buttonclick: function (row) {
                                            // open the popup window when the user clicks a button.
                                            showPopupDetailCodesEdit(row);
                                        }
                                    },
                                ]
                            });
                        //handle change value
                        setTimeout(function () {
                            $('#codes').show();
                            $('#codes-loader').jqxLoader('close');
                            //splitter
                            $('#codes-splitter').jqxSplitter({ width: '100%', height: PAGE_CONTENT_HEIGHT, panels: [{ size: '50%', min: 200 }, { size: '50%', min: 200}]});
                        }, SET_TIMEOUT_LOADER);

                    } else {
                        onlyShowErrorMessage('Error!', response.message);
                    }
                },
                error: function (err, status, errorThrown) {
                    if (err.status === 401) {
                        window.location.reload();
                    } else {
                        onlyShowErrorMessage('Error!', 'Get codes list error. Please try again!');
                        console.log('Get codes list error ' + errorThrown);
                    }
                },
            });

            //search
            $('#codes-search').on('click', function () {
                codesSearchCodes();
            });
            $('#codes-code').on('keypress', function (e) {
                if(e.which == 13) {
                    codesSearchCodes();
                }
            });
            $('#codes-name').on('keypress', function (e) {
                if(e.which == 13) {
                    codesSearchCodes();
                }
            });

            //submit
            $('#codes-save').on('click', function () {
                $("#edit-window").jqxWindow('open');
                $('#edit-window').on('close', function (event) {
                    if (event.type === 'close') {
                        if (event.args.dialogResult.OK) {
                            // click Ok
                            saveCodes();
                        } else if (event.args.dialogResult.Cancel) {
                            // click Cancel
                        } else {
                            // click Close
                        }
                        $('#edit-window').jqxWindow('destroy');
                        $('#edit-window-area').html(htmlConfirmEditModal())
                    }
                });
            });

            //export excel
            $("#codes-excel").click(function () {
                $("#master-codes-grid").jqxGrid('exportdata', 'xlsx', 'master_code_data');
            });

            //reset page
            $('#codes-reset').on('click', function () {
                resetCodesPage();
            })

            //function

        } catch (err) {
            console.log('Error: ', err)
        }

    });
}
