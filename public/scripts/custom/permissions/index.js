function getPermissions(level = '', page_id = '') {
    $(document).ready(function () {
        try {
            if (!$("#permissions-loader").length) return;
            $('input').attr('autocomplete','off');
            //remove codes in localstorage
            localStorage.removeItem("edit_permissions");

            //loader
            $("#permissions-loader").jqxLoader({autoOpen: true, width: 100, height: 60, imagePosition: 'top'});

            //control
            $("#permissions-search").jqxButton({});
            $("#permissions-save").jqxButton({});
            $("#permissions-excel").jqxButton({});

            //filter
            $('#permissions-filter-user-level').val(level);
            $('#permissions-filter-page').val(page_id);
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url: `/api/permissions/get-pages`,
                type: 'GET',
                dataType: 'JSON',
                success: function (response) {
                    if (response.code === 200) {
                        let selected = (element) => element.ID == page_id;
                        let selectedIndex = response.data.findIndex(selected)
                        let sourcePage =
                            {
                                localdata: response.data,
                                datatype: "array"
                            };
                        var dataAdapterPage = new $.jqx.dataAdapter(sourcePage);
                        $('#permissions-filter-page').jqxComboBox({
                            source: dataAdapterPage,
                            theme: 'energyblue',
                            searchMode:'containsignorecase',
                            displayMember: "MENU_NAME",
                            valueMember: "ID",

                            placeHolder: "선택",
                        });
                        $("#permissions-filter-page").jqxComboBox('selectIndex', selectedIndex);
                    } else {
                        onlyShowErrorMessage('Error!', response.message);
                    }
                },
                error: function (err, status, errorThrown) {
                    if (err.status === 401) {
                        window.location.reload();
                    } else {
                        onlyShowErrorMessage('Error!', 'Get pages error. Please try again!');
                        console.log('Get pages error ' + errorThrown);
                    }
                },
            })

        //get permissions
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url: `/api/permissions?level=${level}&page_id=${page_id}`,
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
                                        {name: 'USER_LEVEL', type: 'number'},
                                        {name: 'USER_LEVEL_NAME', type: 'string'},
                                        {name: 'MENU_ID', type: 'number'},
                                        {name: 'MENU_NAME', type: 'string'},
                                        {name: 'PERMISSION_SEARCH', type: 'bool'},
                                        {name: 'PERMISSION_SAVE', type: 'bool'},
                                        {name: 'PERMISSION_DELETE', type: 'bool'},
                                        {name: 'PERMISSION_EXPORT', type: 'bool'},
                                        {name: 'USE_FLAG', type: 'number'},
                                        {name: 'USE_FLAG_NAME', type: 'string'},
                                    ],
                            };
                        let dataAdapter = new $.jqx.dataAdapter(source);
                        // create jqxGrid.
                        $("#permissions-grid").jqxGrid(
                            {
                                width: 'calc(100% - 2px)',
                                source: dataAdapter,
                                sortable: true,
                                autoheight: true,
                                pageable: true,
                                pagerheight: ROW_HEIGHT + 7,
                                pagesizeoptions: PAGE_SIZE_OPTIONS,
                                pagesize: localStorage.getItem('permissions-pagesize') ?? PAGE_SIZE_DEFAULT,
                                columnsresize: true,
                                columnsheight: ROW_HEIGHT,
                                rowsheight: ROW_HEIGHT,
                                editable: true,
                                ready: function () {
                                    // $("#permissions-grid").jqxGrid('selectrow', 0);
                                },
                                altrows: true,
                                columns: [
                                    { text: '권한레벨', cellsalign: 'center', editable:false, align: 'center', datafield: 'USER_LEVEL_NAME', width: '20%'},
                                    { text: '화면명', editable:false, align: 'center', datafield: 'MENU_NAME', width: '40%'},
                                    {
                                        text: '조회',
                                        datafield: 'PERMISSION_SEARCH',
                                        align: 'center',
                                        columntype: 'checkbox',
                                        width: '10%'
                                    },
                                    {
                                        text: '저장',
                                        datafield: 'PERMISSION_SAVE',
                                        align: 'center',
                                        columntype: 'checkbox',
                                        width: '10%'
                                    },
                                    {
                                        text: '삭제',
                                        datafield: 'PERMISSION_DELETE',
                                        align: 'center',
                                        columntype: 'checkbox',
                                        width: '10%'
                                    },
                                    {
                                        text: 'Excel 저장',
                                        datafield: 'PERMISSION_EXPORT',
                                        align: 'center',
                                        columntype: 'checkbox',
                                        width: '10%'
                                    },
                                ]
                            });
                        setTimeout(function () {
                            $('#permissions').show();
                            $('#permissions-loader').jqxLoader('close');
                        }, SET_TIMEOUT_LOADER);
                    } else {
                        onlyShowErrorMessage('Error!', response.message);
                    }
                },
                error: function (err, status, errorThrown) {
                    if (err.status === 401) {
                        window.location.reload();
                    } else {
                        onlyShowErrorMessage('Error!', 'Get permissions list error. Please try again!');
                        console.log('Get permissions list error ' + errorThrown);
                    }
                },
            });
            //save page size
            $("#permissions-grid").on("pagesizechanged", function (event) {
                // event arguments.
                let args = event.args;
                // new page size.
                let pagesize = args.pagesize;
                localStorage.setItem('permissions-pagesize', pagesize);
            });

            //checkbox
            $("#permissions-grid").on('cellendedit', function (event)
            {
                // event arguments.
                let args = event.args;
                let value = args.value;
                let dataField = args.datafield;
                // row's data.
                let rowData = args.row;
                if (rowData) {
                    let edit_permission = {
                        'ID': rowData.ID,
                    };
                    if (dataField === 'PERMISSION_SEARCH') edit_permission.PERMISSION_SEARCH = (value ? 'Y' : 'N');
                    if (dataField === 'PERMISSION_SAVE') edit_permission.PERMISSION_SAVE = (value ? 'Y' : 'N');
                    if (dataField === 'PERMISSION_DELETE') edit_permission.PERMISSION_DELETE = (value ? 'Y' : 'N');
                    if (dataField === 'PERMISSION_EXPORT') edit_permission.PERMISSION_EXPORT = (value ? 'Y' : 'N');

                    let edit_permissions = JSON.parse(localStorage.getItem('edit_permissions'));
                    if (!edit_permissions) {
                        edit_permissions = [];
                        edit_permissions.push(edit_permission)
                        localStorage.setItem("edit_permissions", JSON.stringify(edit_permissions))
                    } else {
                        let checkExist = false;
                        edit_permissions = edit_permissions.map(item => {
                            if (item.ID == rowData.ID) {
                                checkExist = true;
                                return {...item, ...edit_permission};
                            }
                            return item;
                        })
                        if (!checkExist) edit_permissions.push(edit_permission);
                        localStorage.setItem("edit_permissions", JSON.stringify(edit_permissions))
                    }
                }

            });

            //search
            $('#permissions-search').on('click', function () {
                permissionsSearch();
            });

            //submit
            $('#permissions-save').on('click', function () {
                let edit_permissions = localStorage.getItem('edit_permissions');
                if (edit_permissions) {
                    $('#permissions-save').jqxButton({ disabled: true });
                    $("#edit-window").jqxWindow('open');
                    $('#edit-window').on('close', function (event) {
                        if (event.type === 'close') {
                            if (event.args.dialogResult.OK) {
                                // click Ok
                                permissionsUpdatePermissions(edit_permissions);
                            } else if (event.args.dialogResult.Cancel) {
                                // click Cancel
                                $('#permissions-save').jqxButton({ disabled: false });
                            } else {
                                // click Close
                                $('#permissions-save').jqxButton({ disabled: false });
                            }
                        } else {
                            $('#permissions-save').jqxButton({ disabled: false });
                        }
                        $('#edit-window').jqxWindow('destroy');
                        $('#edit-window-area').html(htmlConfirmEditModal())
                    });
                }
            });

            //export
            $("#permissions-excel").click(function () {
                $("#permissions-grid").jqxGrid('exportdata', 'xlsx', 'permissions_data');
            });

            //function

        } catch (err) {
            console.log('Error: ', err);
        }

    });
}
