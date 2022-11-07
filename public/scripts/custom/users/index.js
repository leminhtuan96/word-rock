function getUsers(station_name = '', name = '', login_id = '', level = '') {
    $(document).ready(function () {
        try {
            if (!$("#users-loader").length) return;
            $('input').attr('autocomplete','off');

            //remove handle AS data in localstorage
            localStorage.removeItem("users_user_edit_data");
            //loader
            $("#users-loader").jqxLoader({ autoOpen: true, width: 100, height: 60, imagePosition: 'top' });

            //control
            $("#users-search").jqxButton({});
            $("#users-save").jqxButton({});
            $("#users-reset").jqxButton({});
            $("#users-excel").jqxButton({});

            //filter
            $('#users-filter-station-name').val(station_name);
            $('#users-filter-name').val(name);
            $('#users-filter-login-id').val(login_id);
            $('#users-filter-level').val(level);

            //get users
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            $.ajax({
                url: `/api/users?station_name=${station_name}&name=${name}&login_id=${login_id}&level=${level}`,
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
                                        {name: 'STATION_NAME', type: 'string'},
                                        {name: 'EMAIL', type: 'string'},
                                        {name: 'TEL_NO', type: 'string'},
                                        {name: 'MOBL_NO', type: 'string'},
                                        {name: 'USE_FLAG', type: 'number'}
                                    ],
                            };
                        let dataAdapter = new $.jqx.dataAdapter(source);
                        // create jqxGrid.
                        $("#users-grid").jqxGrid(
                            {
                                width: '98.5%',
                                source: dataAdapter,
                                sortable: true,
                                filterable: true,
                                autoheight: true,
                                pageable: true,
                                pagerheight: ROW_HEIGHT + 7,
                                pagesizeoptions: PAGE_SIZE_OPTIONS,
                                pagesize: localStorage.getItem('users-pagesize') ?? PAGE_SIZE_DEFAULT,
                                columnsresize: true,
                                columnsreorder: true,
                                columnsheight: ROW_HEIGHT,
                                rowsheight: ROW_HEIGHT,
                                ready: function () {
                                    $("#users-grid").jqxGrid('selectrow', 0);
                                },
                                altrows: true,
                                columns: [
                                    { text: '이름', align: 'center', datafield: 'USER_NAME', width: '15%'},
                                    { text: '아이디', align: 'center', datafield: 'LOGIN_ID', width: '15%'},
                                    { text: '권한레벨', align: 'center', cellsalign: 'center', datafield: 'USER_LVL_NAME', width: '10%'},
                                    { text: '소속(그룹)', align: 'center', dataField: 'REQ_STATION_NM', width: '25%'},
                                    { text: '연락처', align: 'center', datafield: 'TEL_NO', width: '10%'},
                                    { text: '비상연락처', align: 'center', datafield: 'MOBL_NO', width: '10%'},
                                    { text: 'E-Mail', align: 'center', datafield: 'EMAIL', width: '15%'}
                                ]
                            });

                        setTimeout(function () {
                            $('#users').show();
                            $('#users-loader').jqxLoader('close');
                            if (screenHeight > 879) {
                                $('#users-splitter').jqxSplitter({ width: '100%', height: PAGE_CONTENT_HEIGHT, orientation: 'horizontal', panels: [{ size: 340, min: 150 }, { min: 100}]});
                            } else {
                                $('#users-splitter').jqxSplitter({ width: '100%', height: PAGE_CONTENT_HEIGHT, orientation: 'horizontal', panels: [{ size: '55%', min: 150 }, { size: '45%', min: 100}]});
                            }
                        }, SET_TIMEOUT_LOADER);
                    }
                },
                error: function (err, status, errorThrown) {
                    if (err.status === 401) {
                        window.location.reload();
                    } else {
                        onlyShowErrorMessage('Error!', 'Get users list error. Please try again!');
                        console.log('Get users list error ' + errorThrown);
                    }
                },
            });
            //save page size
            $("#users-grid").on("pagesizechanged", function (event) {
                // event arguments.
                let args = event.args;
                // new page size.
                let pagesize = args.pagesize;
                localStorage.setItem('users-pagesize', pagesize);
            });

            //edit user form
            $('#change-password-user-change-password').jqxButton({height: ROW_HEIGHT});

            // Create jqxValidator.
            $("#edit-user-form").jqxValidator({
                hintType: "label",
                rules: [
                    { input: "#edit-user-station-name", message: "소속 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    {
                        input: "#edit-user-level", message: "권한레벨 을(를) 입력하세요.", action: 'keyup, blur', rule: function (input, commit) {
                            let value = $("#edit-user-level").val();
                            return !!value;
                        }
                    },
                    { input: "#edit-user-email", message: "E-Mail 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    { input: "#edit-user-telephone", message: "연락처 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    { input: "#edit-user-mobile", message: "비상연락처 phone 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                ]
            });
            $("#change-password-user-form").jqxValidator({
                hintType: "label",
                rules: [
                    { input: "#change-password-user-password", message: "패스워드 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    {
                        input: "#change-password-user-password", message: "패스워드 is invalid!", action: 'keyup, blur', rule: function (input, commit) {
                            let password = $("#change-password-user-password").val();
                            return password.length >= 6;
                        }
                    },
                    { input: "#change-password-user-passwordConfirm", message: "패스워드 확인 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    {
                        input: "#change-password-user-passwordConfirm", message: "패스워드 should match!", action: 'keyup, blur', rule: function (input, commit) {
                            var password = $("#change-password-user-password").val();
                            var passwordConfirm = $("#change-password-user-passwordConfirm").val();
                            return password == passwordConfirm;
                        }
                    },
                ]
            });
            //select user
            $("#users-grid").on('rowselect', function (event) {
                let rowData = event.args.row;
                if (rowData) {
                    //save as handle data
                    localStorage.setItem("users_user_edit_data", JSON.stringify(rowData))

                    usersDumpDataIntoTheForm(rowData);

                    $('#change-password-user-form').jqxValidator('hide');
                    $('#edit-user-form').jqxValidator('hide');
                    $('#edit-user-area').show();
                }
            });

            $('#edit-user-form').on('validationError', function () {
                $('#users-save').jqxButton({disabled: false});
            });
            $('#edit-user-form').on('validationSuccess', function () {
                $("#edit-window").jqxWindow('open');
                $('#edit-window').on('close', function (event) {
                    if (event.type === 'close') {
                        if (event.args.dialogResult.OK) {
                            // click Ok
                            editUser();
                        } else if (event.args.dialogResult.Cancel) {
                            // click Cancel
                            $('#users-save').jqxButton({disabled: false});
                        } else {
                            // click Close
                            $('#users-save').jqxButton({disabled: false});
                        }
                    } else {
                        $('#users-save').jqxButton({disabled: false});
                    }
                    $('#edit-window').jqxWindow('destroy');
                    $('#edit-window-area').html(htmlConfirmEditModal())
                });
            });

            //stop submit
            $('form').submit(function (e) {
                e.preventDefault();
            });

            //change password
            $('#change-password-user-change-password').on('click', function () {
                $('#change-password-user-change-password').jqxButton({disabled: true});
                $('#change-password-user-form').jqxValidator('validate');
            })
            $('#change-password-user-form').on('validationError', function () {
                $('#change-password-user-change-password').jqxButton({disabled: false});
            });
            $('#change-password-user-form').on('validationSuccess', function () {
                $("#edit-window").jqxWindow('open');
                $('#edit-window').on('close', function (event) {
                    if (event.type === 'close') {
                        if (event.args.dialogResult.OK) {
                            // click Ok
                            changePassword();
                        } else if (event.args.dialogResult.Cancel) {
                            // click Cancel
                            $('#users-save').jqxButton({disabled: false});
                        } else {
                            // click Close
                            $('#users-save').jqxButton({disabled: false});
                        }
                    } else {
                        $('#users-save').jqxButton({disabled: false});
                    }
                    $('#edit-window').jqxWindow('destroy');
                    $('#edit-window-area').html(htmlConfirmEditModal())
                });
            });

            //search
            $('#users-search').on('click', function () {
                usersSearchUsers();
            });
            $('#users-filter-station-name').on('keypress', function (e) {
                if(e.which == 13) {
                    usersSearchUsers();
                }
            });
            $('#users-filter-name').on('keypress', function (e) {
                if(e.which == 13) {
                    usersSearchUsers();
                }
            });
            $('#users-filter-login-id').on('keypress', function (e) {
                if(e.which == 13) {
                    usersSearchUsers();
                }
            });

            //submit form
            $('#users-save').on('click', function () {
                $('#users-save').jqxButton({disabled: true});
                $('#edit-user-form').jqxValidator('validate');
            });

            //reset
            $('#users-reset').on('click', function () {
                //get as handle data
                let data = JSON.parse(localStorage.getItem("users_user_edit_data"));
                $('#change-password-user-form').trigger('reset');
                $('#change-password-user-form').jqxValidator('hide');
                $('#edit-user-form').jqxValidator('hide');
                usersDumpDataIntoTheForm(data);
            })

            //export excel
            $("#users-excel").click(function () {
                $("#users-grid").jqxGrid('exportdata', 'xlsx', 'users-list');
            });

            //function

        } catch (err) {
            console.log('Error: ', err);
        }

    });
}
