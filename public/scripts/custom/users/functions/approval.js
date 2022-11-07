function resetApprovalUsersPage(station_name = '', name = '', login_id = '') {
    $("#approval-users-choose-station-window").jqxWindow('destroy');
    let currentTab = $('#jqxTabs').jqxTabs('selectedItem');
    $.ajax({
        url: 'users/approval-users',
        type: 'GET',
        success: function (data) {
            $('#jqxTabs').jqxTabs('setContentAt', currentTab, data);
            getApprovalUsers(station_name, name, login_id);
        },
        error: function (err) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Open tab error. Please try again!');
            }
        }
    });
}

function approvalSearchApproval() {
    let station_name = $('#approval-users-filter-station-name').val() ? $('#approval-users-filter-station-name').val() : '';
    let name = $('#approval-users-filter-name').val() ? $('#approval-users-filter-name').val() : '';
    let login_id = $('#approval-users-filter-login-id').val() ? $('#approval-users-filter-login-id').val() : '';
    resetApprovalUsersPage(station_name, name, login_id);
}

function showChooseStationPopup(stationId) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: `/api/users/get-stations`,
        type: 'GET',
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                let source =
                    {
                        datatype: "array",
                        datafields: [
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
                        root: "entry",
                        record: "content",
                        id: 'id',
                        localdata: response.data
                    };
                let dataAdapter = new $.jqx.dataAdapter(source);
                // create grid.
                $("#approval-users-choose-station-window-content").jqxGrid(
                    {
                        width: 'calc(100% - 2px)',
                        source: dataAdapter,
                        sortable: true,
                        showfilterrow: true,
                        filterrowheight: ROW_HEIGHT + 7,
                        filterable: true,
                        autoheight: true,
                        pageable: true,
                        pagerheight: ROW_HEIGHT + 7,
                        pagesizeoptions: PAGE_SIZE_OPTIONS,
                        pagesize: localStorage.getItem('approval-users-choose-station-window-content-pagesize') ?? PAGE_SIZE_DEFAULT,
                        columnsresize: true,
                        columnsreorder: true,
                        columnsheight: ROW_HEIGHT,
                        rowsheight: ROW_HEIGHT,
                        ready: function ()
                        {
                            // $("#approval-users-choose-station-window-content").jqxGrid('selectrow', 0);
                        },
                        altrows: true,
                        columns: [
                            { text: '지역', align: 'center', datafield: 'AREA1_DIV_NAME', width: '10%'},
                            { text: '세부지역', align: 'center', datafield: 'AREA2_NM', width: '20%'},
                            { text: '구분', align: 'center', dataField: 'STATION_TYPE_NAME', width: '10%'},
                            { text: 'Station 명', align: 'center', datafield: 'STATION_NAME', width: '20%'},
                            { text: '담당자', align: 'center', datafield: 'MNGR_NM', width: '10%'},
                            { text: '대표연락처', align: 'center', datafield: 'TEL_NO', width: '15%'},
                            { text: 'Mobile', align: 'center', datafield: 'MOBL_NO', width: '15%'},
                        ]
                    });
                let rowSelect = 0;
                let rows = $("#approval-users-choose-station-window-content").jqxGrid('getrows');
                rows.forEach(function (row) {
                    if (row.ID == stationId) {
                        rowSelect = row.uid;
                        return false;
                    }
                });
                $("#approval-users-choose-station-window-content").jqxGrid('selectrow', rowSelect);

                $("#approval-users-choose-station-window").jqxWindow({height: (190 + (response.data.length > 0 ? (response.data.length > 10 ? 10 : response.data.length) * ROW_HEIGHT : ROW_HEIGHT))});
                $("#approval-users-choose-station-window").jqxWindow('open');

                //handle choose parent
                $('#approval-users-choose-station-window-ok').on('click', function () {
                    let selectedRowIndex = $('#approval-users-choose-station-window-content').jqxGrid('getselectedrowindex');
                    let dataRecord = $("#approval-users-choose-station-window-content").jqxGrid('getrowdata', selectedRowIndex);
                    $('#approval-users-approval-station-name').val(dataRecord.STATION_NAME);
                    $('#approval-users-approval-station-id').val(dataRecord.ID);
                    $("#approval-users-choose-station-window").jqxWindow('close');
                    $('#approval-users-form').jqxValidator('hideHint', '#approval-users-approval-station-name');
                })
                $('#approval-users-choose-station-window-content').on('rowdoubleclick', function (event)
                {
                    let args = event.args;
                    let dataRecord = args.row.bounddata;
                    $('#approval-users-approval-station-name').val(dataRecord.STATION_NAME);
                    $('#approval-users-approval-station-id').val(dataRecord.ID);
                    $("#approval-users-choose-station-window").jqxWindow('close');
                    $('#approval-users-form').jqxValidator('hideHint', '#approval-users-approval-station-name');
                });
            } else {
                onlyShowErrorMessage('Error!', response.message);
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Get stations error. Please try again!');
                console.log('Get stations error ' + errorThrown);
            }
        },
    })
    //save page size
    $("#approval-users-choose-station-window-content").on("pagesizechanged", function (event) {
        // event arguments.
        let args = event.args;
        // new page size.
        let pagesize = args.pagesize;
        localStorage.setItem('approval-users-choose-station-window-content-pagesize', pagesize);
    });
}

function approvalUser() {
    let id = $('#approval-users-id').val();
    let formData = new FormData();
    formData.append('station', $('#approval-users-approval-station-id').val());
    formData.append('level', $('#approval-users-level').val());
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: `/api/users/approval-user/${id}`,
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                onlyShowSuccessMessage('Success!', response.message);
                approvalSearchApproval();
            } else {
                onlyShowErrorMessage('Error!', response.message);
                $('#approval-users-save').jqxButton({disabled: false});
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Approval user error. Please try again!');
                console.log('Approval user error' + errorThrown);
                $('#approval-users-save').jqxButton({disabled: false});
            }
        },
    });
}

function approvalUsersDumpDataIntoTheForm(data) {
    $("#approval-users-id").val(data.ID);
    $("#approval-users-name").val(data.USER_NAME ? data.USER_NAME : '');
    $("#approval-users-loginId").val(data.LOGIN_ID ? data.LOGIN_ID : '');
    $("#approval-users-area1").val(data.REQ_AREA1_DIV ? data.REQ_AREA1_DIV : '');
    $("#approval-users-area2").val(data.REQ_AREA2_NM ? data.REQ_AREA2_NM : '');
    $("#approval-users-station-name").val(data.REQ_STATION_NM ? data.REQ_STATION_NM : '');
    $("#approval-users-approval-station-name").val(data.CFM_STATION_NAME ? data.CFM_STATION_NAME : '');
    $("#approval-users-approval-station-id").val(data.CFM_STATION_ID ? data.CFM_STATION_ID : '');
    $("#approval-users-level").val(data.USER_LVL ? data.USER_LVL : '');
    $("#approval-users-telephone").val(data.TEL_NO ? data.TEL_NO : '');
    $("#approval-users-mobile").val(data.MOBL_NO ? data.MOBL_NO : '');
    $("#approval-users-email").val(data.EMAIL ? data.EMAIL : '');
}
