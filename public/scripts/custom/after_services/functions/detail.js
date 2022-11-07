//function
function resetDetailASPage(new_keyword = '', new_start = '', new_end = '', new_use_date = '', new_except_complete = 'Y', new_only_complete = '') {
    let currentTab = $('#jqxTabs').jqxTabs('selectedItem');
    $.ajax({
        url: 'as/detail',
        type: 'GET',
        success: function (data) {
            $('#jqxTabs').jqxTabs('setContentAt', currentTab, data);
            getDetailAS(new_keyword, new_start, new_end, new_use_date, new_except_complete, new_only_complete);
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

function searchDetailAS() {
    let new_keyword = $('#detail-as-filter-keyword').val() ? $('#detail-as-filter-keyword').val() : '';
    let new_start = $('#detail-as-filter-date-receipt-start').val() ? $('#detail-as-filter-date-receipt-start').val() : '';
    let new_end = $('#detail-as-filter-date-receipt-end').val() ? $('#detail-as-filter-date-receipt-end').val() : '';
    let new_use_date = $('#detail-as-filter-use-date').is(":checked") ? '' : 'Y';
    let new_except_complete = $('#detail-as-filter-except-complete').is(":checked") ? 'Y' : '';
    let new_only_complete = $('#detail-as-filter-only-complete').is(":checked") ? 'Y' : '';
    resetDetailASPage(new_keyword, new_start, new_end, new_use_date, new_except_complete, new_only_complete);
}

function detailASRedirectDetailLocker(locker_id) {
    let new_tab_title = '보관함 상세내역';
    let index_exist = null;
    //check tab exist
    $('#jqxTabs .jqx-tabs-headerWrapper ul li').each(function (index) {
        let title = $(this).find('.jqx-tabs-titleContentWrapper').text();
        if (title === new_tab_title) {
            index_exist = index;
            return false;
        }
    });
    if (index_exist === null) {
        $('#jqxTabs').jqxTabs('addLast', new_tab_title, '');
        $('#jqxTabs').jqxTabs('ensureVisible', -1);
        let index_selected = $("#jqxTabs").val();
        $.ajax({
            url: 'lockers/detail',
            type: 'GET',
            success: function (data) {
                $('#jqxTabs').jqxTabs('setContentAt', index_selected, data);
                getLockersDetail(locker_id);
            },
            error: function (err, status, errorThrown) {
                if (err.status === 401) {
                    window.location.reload();
                } else {
                    onlyShowErrorMessage('Error!', 'Open tab error. Please try again!');
                }
            }
        });
    } else {
        $('#jqxTabs').jqxTabs('select', index_exist);
        $.ajax({
            url: 'lockers/detail',
            type: 'GET',
            success: function (data) {
                $('#jqxTabs').jqxTabs('setContentAt', index_exist, data);
                getLockersDetail(locker_id);
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

}

function detailASRedirectEditAS(as_id) {
    let today = formatOnlyDate(new Date());
    let urlApi = `as/edit?start=${today}&end=${today}&except_complete=Y`;
    if (as_id) {
        urlApi = `as/edit?as_id=${as_id}&start=${today}&end=${today}&except_complete=Y`;
    }
    let new_tab_title = 'A/S 접수등록';
    let index_exist = null;
    //check tab exist
    $('#jqxTabs .jqx-tabs-headerWrapper ul li').each(function (index) {
        let title = $(this).find('.jqx-tabs-titleContentWrapper').text();
        if (title === new_tab_title) {
            index_exist = index;
            return false;
        }
    });
    if (index_exist === null) {
        $('#jqxTabs').jqxTabs('addLast', new_tab_title, '');
        $('#jqxTabs').jqxTabs('ensureVisible', -1);
        let index_selected = $("#jqxTabs").val();
        $.ajax({
            url: urlApi,
            type: 'GET',
            success: function (data) {
                $('#jqxTabs').jqxTabs('setContentAt', index_selected, data);
                getEditAS(as_id);
            },
            error: function (err, status, errorThrown) {
                if (err.status === 401) {
                    window.location.reload();
                } else {
                    onlyShowErrorMessage('Error!', 'Open tab error. Please try again!');
                }
            }
        });
    } else {
        $('#jqxTabs').jqxTabs('select', index_exist);
        $.ajax({
            url: urlApi,
            type: 'GET',
            success: function (data) {
                $('#jqxTabs').jqxTabs('setContentAt', index_exist, data);
                getEditAS(as_id);
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
}

function detailASRedirectHandleAS(as_id) {
    let today = formatOnlyDate(new Date());
    let urlApi = `as/handle?start=${today}&end=${today}&except_complete=Y`;
    if (as_id) {
        urlApi = `as/handle?as_id=${as_id}&start=${today}&end=${today}`;
    }
    let new_tab_title = 'A/S 처리등록';
    let index_exist = null;
    //check tab exist
    $('#jqxTabs .jqx-tabs-headerWrapper ul li').each(function (index) {
        let title = $(this).find('.jqx-tabs-titleContentWrapper').text();
        if (title === new_tab_title) {
            index_exist = index;
            return false;
        }
    });
    if (index_exist === null) {
        $('#jqxTabs').jqxTabs('addLast', new_tab_title, '');
        $('#jqxTabs').jqxTabs('ensureVisible', -1);
        let index_selected = $("#jqxTabs").val();
        $.ajax({
            url: urlApi,
            type: 'GET',
            success: function (data) {
                $('#jqxTabs').jqxTabs('setContentAt', index_selected, data);
                getHandleAS(as_id);
            },
            error: function (err, status, errorThrown) {
                if (err.status === 401) {
                    window.location.reload();
                } else {
                    onlyShowErrorMessage('Error!', 'Open tab error. Please try again!');
                }
            }
        });
    } else {
        $('#jqxTabs').jqxTabs('select', index_exist);
        $.ajax({
            url: urlApi,
            type: 'GET',
            success: function (data) {
                $('#jqxTabs').jqxTabs('setContentAt', index_exist, data);
                getHandleAS(as_id);
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
}

function detailASExport() {
    let new_keyword = $('#detail-as-filter-keyword').val() ? $('#detail-as-filter-keyword').val() : '';
    let new_start = $('#detail-as-filter-date-receipt-start').val() ? $('#detail-as-filter-date-receipt-start').val() : '';
    let new_end = $('#detail-as-filter-date-receipt-end').val() ? $('#detail-as-filter-date-receipt-end').val() : '';
    let new_use_date = $('#detail-as-filter-use-date').is(":checked") ? '' : 'Y';
    let new_except_complete = $('#detail-as-filter-except-complete').is(":checked") ? 'Y' : '';
    let new_only_complete = $('#detail-as-filter-only-complete').is(":checked") ? 'Y' : '';
    window.location.href = `/api/as/detail/export?keyword=${new_keyword}&start=${new_start}&end=${new_end}&use_date=${new_use_date}&except_complete=${new_except_complete}&only_complete=${new_only_complete}`;
}

function getNewASNotices() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: `/api/as/get-new-as-notices`,
        type: 'GET',
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                let sourceNewASNotice =
                    {
                        localdata: response.data,
                        dataType: "array",
                        datafields:
                            [
                                {name: 'ID', type: 'number'},
                                {name: 'AS_RECEIPT_ID', type: 'number'},
                                {name: 'UPPER_ID', type: 'number'},
                                {name: 'CONTENT', type: 'string'},
                                {name: 'DEPARTMENT_NAME', type: 'string'},
                                {name: 'CREATED_BY', type: 'number'},
                                {name: 'CREATED_BY_NAME', type: 'string'},
                                {name: 'CREATED_AT', type: 'string'},
                            ],
                    };
                let dataNewASNoticeAdapter = new $.jqx.dataAdapter(sourceNewASNotice);
                // create jqxGrid.
                $("#detail-as-new-as-notice-grid").jqxGrid(
                    {
                        width: '98.5%',
                        source: dataNewASNoticeAdapter,
                        sortable: true,
                        filterable: true,
                        autoheight: true,
                        columnsresize: true,
                        columnsreorder: true,
                        columnsheight: ROW_HEIGHT,
                        rowsheight: ROW_HEIGHT,
                        altrows: true,
                        columns: [
                            {
                                text: '작성일시',
                                align: 'center',
                                cellsalign: 'center',
                                datafield: 'CREATED_AT',
                                width: '20%',
                            },
                            {text: '작성자', align: 'center', datafield: 'CREATED_BY_NAME', width: '20%'},
                            {text: '수신부서', align: 'center', datafield: 'DEPARTMENT_NAME', width: '20%'},
                            {
                                text: '전달내용',
                                align: 'center',
                                dataField: 'CONTENT',
                                width: '40%',
                                cellclassname: 'd-flex align-items-center',
                            },
                        ]
                    });
            } else {
                onlyShowErrorMessage('Error!', response.message);
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Get new AS notices list error. Please try again!');
                console.log('Get new AS notices list error ' + errorThrown);
            }
        },
    });
}

function getNewNotices() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: `/api/as/get-new-notices`,
        type: 'GET',
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                let sourceNewNotice =
                    {
                        datatype: "array",
                        datafields: [
                            {name: 'ID', type: 'number'},
                            {name: 'SUBJECT', type: 'string'},
                            {name: 'DEPT_NAME', type: 'string'},
                            {name: 'CREATED_AT', type: 'string'},
                        ],
                        localdata: response.data
                    };
                let dataNewNoticeAdapter = new $.jqx.dataAdapter(sourceNewNotice);
                // create grid.
                $("#detail-as-new-notice-grid").jqxGrid(
                    {
                        width: '98.5%',
                        source: dataNewNoticeAdapter,
                        sortable: true,
                        filterable: true,
                        autoheight: true,
                        columnsresize: true,
                        columnsreorder: true,
                        columnsheight: ROW_HEIGHT,
                        rowsheight: ROW_HEIGHT,
                        altrows: true,
                        columns: [
                            {text: '제목', align: 'center', datafield: 'SUBJECT', width: '50%'},
                            {text: '공지부서', align: 'center', datafield: 'DEPT_NAME', width: '25%'},
                            {text: '작성일', align: 'center', cellsalign: 'center', datafield: 'CREATED_AT', width: '25%'},
                        ]
                    });
            } else {
                onlyShowErrorMessage('Error!', response.message);
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Get new notices list error. Please try again!');
                console.log('Get new notices list error ' + errorThrown);
            }
        },
    });
}

function getMaintainStations() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: `/api/as/get-maintain-stations`,
        type: 'GET',
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                let sourceMaintainStation =
                    {
                        datatype: "array",
                        datafields: [
                            {name: 'ID', type: 'number'},
                            {name: 'STATION_NAME', type: 'string'},
                            {name: 'MAINT_TYPE_NAME', type: 'string'},
                            {name: 'MAINT_END_YMD', type: 'string'},
                        ],
                        localdata: response.data
                    };
                let dataMaintainStationAdapter = new $.jqx.dataAdapter(sourceMaintainStation);
                // create grid.
                $("#detail-as-maintain-station-grid").jqxGrid(
                    {
                        width: '98.5%',
                        source: dataMaintainStationAdapter,
                        sortable: true,
                        filterable: true,
                        autoheight: true,
                        columnsresize: true,
                        columnsreorder: true,
                        columnsheight: ROW_HEIGHT,
                        rowsheight: ROW_HEIGHT,
                        altrows: true,
                        columns: [
                            {text: '유지보수종료일', align: 'center', cellsalign: 'center', datafield: 'MAINT_END_YMD', width: '30%'},
                            {text: 'Station 명', align: 'center', datafield: 'STATION_NAME', width: '50%'},
                            {text: '유지보수', align: 'center', cellsalign: 'center', datafield: 'MAINT_TYPE_NAME', width: '20%'},
                        ]
                    });
            } else {
                onlyShowErrorMessage('Error!', response.message);
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Get maintain stations list error. Please try again!');
                console.log('Get maintain stations list error ' + errorThrown);
            }
        },
    });
}



