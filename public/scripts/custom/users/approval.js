function getApprovalUsers(station_name = '', name = '', login_id = '') {
    $(document).ready(function () {
        try {
            if (!$("#approval-users-loader").length) return;
            $('input').attr('autocomplete','off');
            //remove approval data in localstorage
            localStorage.removeItem("approval_data");

            //loader
            $("#approval-users-loader").jqxLoader({ autoOpen: true, width: 100, height: 60, imagePosition: 'top' });

            //control
            $("#approval-users-reset").jqxButton({});
            $("#approval-users-search").jqxButton({});
            $("#approval-users-save").jqxButton({});
            $("#approval-users-excel").jqxButton({});

            //filter
            $('#approval-users-filter-station-name').val(station_name)
            $('#approval-users-filter-name').val(name)
            $('#approval-users-filter-login-id').val(login_id)

            //choose station popup
            $("#approval-users-choose-station-window").jqxWindow({
                width: 800, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#approval-users-choose-station-window-cancel"), modalOpacity: 0.01
            });
            $('#approval-users-choose-station-window-ok').jqxButton({});
            $('#approval-users-choose-station-window-cancel').jqxButton({});

            // Create jqxValidator.
            $("#approval-users-form").jqxValidator({
                hintType: "label",
                rules: [
                    { input: "#approval-users-approval-station-name", message: "Station 명 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    {
                        input: "#approval-users-level", message: "권한레벨 을(를) 입력하세요.", action: 'keyup, blur', rule: function (input, commit) {
                            let value = $("#approval-users-level").val();
                            return !!value;
                        }
                    },
                ]
            });
            $('#approval-users-form').on('validationError', function () {
                $('#approval-users-save').jqxButton({disabled: false});
            });
            $('#approval-users-form').on('validationSuccess', function () {
                $("#edit-window").jqxWindow('open');
                $('#edit-window').on('close', function (event) {
                    if (event.type === 'close') {
                        if (event.args.dialogResult.OK) {
                            // click Ok
                            approvalUser();
                        } else if (event.args.dialogResult.Cancel) {
                            // click Cancel
                            $('#approval-users-save').jqxButton({disabled: false});
                        } else {
                            // click Close
                            $('#approval-users-save').jqxButton({disabled: false});
                        }
                    } else {
                        $('#users-save').jqxButton({disabled: false});
                    }
                    $('#edit-window').jqxWindow('destroy');
                    $('#edit-window-area').html(htmlConfirmEditModal())
                });
            });

        //get users
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            $.ajax({
                url: `/api/users/approval-users?station_name=${station_name}&name=${name}&login_id=${login_id}`,
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
                                        {name: 'USER_NAME', type: 'string'},
                                        {name: 'LOGIN_ID', type: 'string'},
                                        {name: 'DEPT_ID', type: 'number'},
                                        {name: 'USER_LVL', type: 'number'},
                                        {name: 'USER_LVL_NAME', type: 'string'},
                                        {name: 'REQ_AREA1_DIV', type: 'number'},
                                        {name: 'REQ_AREA2_NM', type: 'string'},
                                        {name: 'REQ_STATION_NM', type: 'string'},
                                        {name: 'CFM_STATION_ID', type: 'number'},
                                        {name: 'CFM_STATION_NAME', type: 'string'},
                                        {name: 'EMAIL', type: 'string'},
                                        {name: 'TEL_NO', type: 'string'},
                                        {name: 'MOBL_NO', type: 'string'},
                                        {name: 'USE_FLAG', type: 'number'}
                                    ],
                            };
                        let dataAdapter = new $.jqx.dataAdapter(source);
                        // create jqxGrid.
                        $("#approval-users-grid").jqxGrid(
                            {
                                width: '98.5%',
                                source: dataAdapter,
                                sortable: true,
                                filterable: true,
                                autoheight: true,
                                pageable: true,
                                pagerheight: ROW_HEIGHT + 7,
                                pagesizeoptions: PAGE_SIZE_OPTIONS,
                                pagesize: localStorage.getItem('approval-users-pagesize') ?? PAGE_SIZE_DEFAULT,
                                columnsresize: true,
                                columnsreorder: true,
                                columnsheight: ROW_HEIGHT,
                                rowsheight: ROW_HEIGHT,
                                ready: function () {
                                    $("#approval-users-grid").jqxGrid('selectrow', 0);
                                },
                                altrows: true,
                                columns: [
                                    { text: '이름', align: 'center', datafield: 'USER_NAME', width: '15%'},
                                    { text: '아이디', align: 'center', datafield: 'LOGIN_ID', width: '15%'},
                                    { text: '권한레벨', align: 'center', cellsalign: 'center', datafield: 'USER_LVL_NAME', width: '10%'},
                                    { text: '소 속(그룹)', align: 'center', dataField: 'REQ_STATION_NM', width: '25%'},
                                    { text: '연락처', align: 'center', datafield: 'TEL_NO', width: '10%'},
                                    { text: '비상연락처', align: 'center', datafield: 'MOBL_NO', width: '10%'},
                                    { text: 'E-Mail', align: 'center', datafield: 'EMAIL', width: '15%'},
                                ]
                            });
                        setTimeout(function () {
                            $('#approval-users').show();
                            $('#approval-users-loader').jqxLoader('close');
                            //splitter
                            if (screenHeight > 770) {
                                $('#approval-users-splitter').jqxSplitter({ width: '100%', height: PAGE_CONTENT_HEIGHT, orientation: 'horizontal', panels: [{ size: 280, min: 150 }, { min: 100}]});
                            } else {
                                $('#approval-users-splitter').jqxSplitter({ width: '100%', height: PAGE_CONTENT_HEIGHT, orientation: 'horizontal', panels: [{ size: '55%', min: 150 }, { size: '45%', min: 100}]});
                            }
                        }, SET_TIMEOUT_LOADER);
                    }
                },
                error: function (err, status, errorThrown) {
                    if (err.status === 401) {
                        window.location.reload();
                    } else {
                        onlyShowErrorMessage('Error!', 'Get approval users list error. Please try again!');
                        console.log('Get approval users list error ' + errorThrown);
                    }
                },
            });
            //save page size
            $("#approval-users-grid").on("pagesizechanged", function (event) {
                // event arguments.
                let args = event.args;
                // new page size.
                let pagesize = args.pagesize;
                localStorage.setItem('approval-users-pagesize', pagesize);
            });
            //select approval user
            $("#approval-users-grid").on('rowselect', function (event) {
                let rowData = event.args.row;
                if (rowData) {
                    //save approval data
                    localStorage.setItem("approval_data", JSON.stringify(rowData))

                    approvalUsersDumpDataIntoTheForm(rowData);

                    $('#approval-users-form').jqxValidator('hide');
                    $('#approval-users-form').show();
                }
            });

            //handle popup choose parent
            $('#approval-users-approval-station-name').on('click', function () {
                let stationId = $('#approval-users-approval-station-id').val();
                showChooseStationPopup(stationId);
            });
            $('#approval-users-choose-station').on('click', function () {
                let stationId = $('#approval-users-approval-station-id').val();
                showChooseStationPopup(stationId);
            });

            //reset
            $('#approval-users-reset').on('click', function () {
                //get as handle data
                let data = JSON.parse(localStorage.getItem("approval_data"));
                $('#approval-users-form').jqxValidator('hide');
                approvalUsersDumpDataIntoTheForm(data);
            })

            //search
            $('#approval-users-search').on('click', function () {
                approvalSearchApproval();
            });
            $('#approval-users-filter-station-name').on('keypress', function (e) {
                if(e.which == 13) {
                    approvalSearchApproval();
                }
            });
            $('#approval-users-filter-name').on('keypress', function (e) {
                if(e.which == 13) {
                    approvalSearchApproval();
                }
            });
            $('#approval-users-filter-login-id').on('keypress', function (e) {
                if(e.which == 13) {
                    approvalSearchApproval();
                }
            });

            //submit form
            $('#approval-users-save').on('click', function () {
                $('#approval-users-save').jqxButton({disabled: true});
                $('#approval-users-form').jqxValidator('validate');
            });

            //export excel
            $("#approval-users-excel").click(function () {
                $("#approval-users-grid").jqxGrid('exportdata', 'xlsx', 'approval-users-list');
            });


            //function


        } catch (err) {
            console.log('Error: ', err);
        }

    });
}
