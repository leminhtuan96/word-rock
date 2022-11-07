function resetDepartmentsPage(type = '') {
    $('#departments-create-parent-window').jqxWindow('destroy');
    $('#departments-edit-parent-window').jqxWindow('destroy');
    let currentTab = $('#jqxTabs').jqxTabs('selectedItem');
    $.ajax({
        url: 'departments/',
        type: 'GET',
        success: function (data) {
            $('#jqxTabs').jqxTabs('setContentAt', currentTab, data);
            getDepartments(type);
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Open tab error. Please try again!');
            }
        }
    });
}

function departmentsSearchDepartments() {
    let type = $('#departments-filter-type').val() ? $('#departments-filter-type').val() : '';
    resetDepartmentsPage(type);
}

function departmentsDeleteDepartment() {
    let id = $('#departments-edit-id').val();
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: `/api/departments/delete/${id}`,
        type: 'DELETE',
        success: function(response) {
            if (response.code === 200) {
                onlyShowSuccessMessage('Success!', response.message);
                departmentsSearchDepartments();
            } else {
                onlyShowErrorMessage('Error!', response.message);
                $('#departments-delete').jqxButton({disabled: false});
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Delete departments error. Please try again!');
                console.log('Delete departments error ' + errorThrown);
                $('#departments-delete').jqxButton({disabled: false});
            }
        },
    });
}

function departmentsCreateDepartment() {
    let formData = new FormData();
    formData.append('name', $('#departments-create-name').val());
    formData.append('type', $('#departments-create-type').val());
    formData.append('parent_id', $('#departments-create-parent-id').val());
    formData.append('use_flag', $('#departments-create-use-flag').val());

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: `/api/departments/store`,
        type: 'POST',
        data: formData,
        cache : false,
        contentType : false,
        processData: false,
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                onlyShowSuccessMessage('Success!', response.message);
                departmentsSearchDepartments();
            } else {
                onlyShowErrorMessage('Error!', response.message);
                $('#departments-save').jqxButton({disabled: false});
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Create department error. Please try again!');
                console.log('Create department error' + errorThrown);
                $('#departments-save').jqxButton({disabled: false});
            }
        },
    });
}

function departmentsEditDepartment() {
    let id = $('#departments-edit-id').val();
    let formData = new FormData();
    formData.append('name', $('#departments-edit-name').val());
    formData.append('type', $('#departments-edit-type').val());
    formData.append('parent_id', $('#departments-edit-parent-id').val());
    formData.append('use_flag', $('#departments-edit-use-flag').val());

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: `/api/departments/update/${id}`,
        type: 'POST',
        data: formData,
        cache : false,
        contentType : false,
        processData: false,
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                onlyShowSuccessMessage('Success!', response.message);
                departmentsSearchDepartments();
            } else {
                onlyShowErrorMessage('Error!', response.message);
                $('#departments-save').jqxButton({disabled: false});
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Update department error. Please try again!');
                console.log('Update department error' + errorThrown);
                $('#departments-save').jqxButton({disabled: false});
            }
        },
    });
}

function showCreateParentPopup(type) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: `/api/departments/get-parents/${type}`,
        type: 'GET',
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                let source =
                    {
                        datatype: "array",
                        datafields: [
                            { name: 'ID', type: 'number' },
                            { name: 'DEPT_NAME', type: 'string' },
                            { name: 'DEPT_TYPE', type: 'number' },
                            { name: 'DEPT_TYPE_NAME', type: 'string' },
                        ],
                        root: "entry",
                        record: "content",
                        id: 'id',
                        localdata: response.data
                    };
                let dataAdapter = new $.jqx.dataAdapter(source);
                // create grid.
                $("#departments-create-parent-window-content").jqxGrid(
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
                        pagesizeoptions: PAGE_SIZE_OPTIONS,
                        pagesize: localStorage.getItem('departments-create-parent-window-content-pagesize') ?? PAGE_SIZE_DEFAULT,
                        columnsresize: true,
                        columnsreorder: true,
                        columnsheight: ROW_HEIGHT,
                        rowsheight: ROW_HEIGHT,
                        ready: function ()
                        {
                            $("#departments-create-parent-window-content").jqxGrid('selectrow', 0);
                        },
                        altrows: true,
                        columns: [
                            { text: '조직코드', align: 'center', cellsalign: 'center', datafield: 'ID', width: '20%'},
                            { text: '조직명', align: 'center', datafield: 'DEPT_NAME', width: '50%' },
                            { text: '조직구분', align: 'center', cellsalign: 'center', datafield: 'DEPT_TYPE_NAME', width: '30%'},
                        ]
                    });

                $("#departments-create-parent-window").jqxWindow({height: (190 + (response.data.length > 0 ? (response.data.length > 10 ? 10 : response.data.length) * ROW_HEIGHT : ROW_HEIGHT))});
                $("#departments-create-parent-window").jqxWindow('open');

                //handle choose parent
                $('#departments-create-parent-window-ok').on('click', function () {
                    let selectedRowIndex = $('#departments-create-parent-window-content').jqxGrid('getselectedrowindex');
                    let dataRecord = $("#departments-create-parent-window-content").jqxGrid('getrowdata', selectedRowIndex);
                    $('#departments-create-parent').val(dataRecord.DEPT_NAME);
                    $('#departments-create-parent-id').val(dataRecord.ID);
                    $("#departments-create-parent-window").jqxWindow('close');
                    $('#departments-create-form').jqxValidator('hideHint', '#departments-create-parent');
                })
                $('#departments-create-parent-window-content').on('rowdoubleclick', function (event)
                {
                    let args = event.args;
                    let dataRecord = args.row.bounddata;
                    $('#departments-create-parent').val(dataRecord.DEPT_NAME);
                    $('#departments-create-parent-id').val(dataRecord.ID);
                    $("#departments-create-parent-window").jqxWindow('close');
                    $('#departments-create-form').jqxValidator('hideHint', '#departments-create-parent');
                });
            } else {
                onlyShowErrorMessage('Error!', response.message);
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Get departments parent error. Please try again!');
                console.log('Get departments parent error ' + errorThrown);
            }
        },
    })
    //save page size
    $("#departments-create-parent-window-content").on("pagesizechanged", function (event) {
        // event arguments.
        let args = event.args;
        // new page size.
        let pagesize = args.pagesize;
        localStorage.setItem('departments-create-parent-window-content-pagesize', pagesize);
    });
}

function showEditParentPopup(type, idSelect = null) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: `/api/departments/get-parents/${type}`,
        type: 'GET',
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                let source =
                    {
                        datatype: "array",
                        datafields: [
                            { name: 'ID', type: 'number' },
                            { name: 'DEPT_NAME', type: 'string' },
                            { name: 'DEPT_TYPE', type: 'number' },
                            { name: 'DEPT_TYPE_NAME', type: 'string' },
                        ],
                        root: "entry",
                        record: "content",
                        localdata: response.data
                    };
                let dataAdapter = new $.jqx.dataAdapter(source);
                // create grid.
                $("#departments-edit-parent-window-content").jqxGrid(
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
                        altrows: true,
                        columnsresize: true,
                        columnsreorder: true,
                        columnsheight: ROW_HEIGHT,
                        rowsheight: ROW_HEIGHT,
                        columns: [
                            { text: '조직코드', align: 'center', datafield: 'ID', width: '20%'},
                            { text: '조직명', align: 'center', datafield: 'DEPT_NAME', width: '50%' },
                            { text: '조직구분', align: 'center', datafield: 'DEPT_TYPE_NAME', width: '30%'},
                        ]
                    });

                let rowSelect = 0;
                let rows = $("#departments-edit-parent-window-content").jqxGrid('getrows');
                rows.forEach(function (row) {
                    if (row.ID == idSelect) {
                        rowSelect = row.uid;
                        return false;
                    }
                });
                $("#departments-edit-parent-window-content").jqxGrid('selectrow', rowSelect);

                $("#departments-edit-parent-window").jqxWindow({height: (190 + (response.data.length > 0 ? (response.data.length > 10 ? 10 : response.data.length) * ROW_HEIGHT : ROW_HEIGHT))});
                $("#departments-edit-parent-window").jqxWindow('open');

                //handle choose parent
                $('#departments-edit-parent-window-ok').on('click', function () {
                    let selectedRowIndex = $('#departments-edit-parent-window-content').jqxGrid('getselectedrowindex');
                    let dataRecord = $("#departments-edit-parent-window-content").jqxGrid('getrowdata', selectedRowIndex);
                    $('#departments-edit-parent').val(dataRecord.DEPT_NAME);
                    $('#departments-edit-parent-id').val(dataRecord.ID);
                    $("#departments-edit-parent-window").jqxWindow('close');
                    $('#departments-edit-form').jqxValidator('hideHint', '#departments-edit-parent');
                })
                $('#departments-edit-parent-window-content').on('rowdoubleclick', function (event)
                {
                    let args = event.args;
                    let dataRecord = args.row.bounddata;
                    $('#departments-edit-parent').val(dataRecord.DEPT_NAME);
                    $('#departments-edit-parent-id').val(dataRecord.ID);
                    $("#departments-edit-parent-window").jqxWindow('close');
                    $('#departments-edit-form').jqxValidator('hideHint', '#departments-edit-parent');
                });
            } else {
                onlyShowErrorMessage('Error!', response.message);
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Get departments parent error. Please try again!');
                console.log('Get departments parent error ' + errorThrown);
            }
        },
    })
}
