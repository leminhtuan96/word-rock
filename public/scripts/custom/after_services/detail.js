function getDetailAS(keyword = '', start = '', end = '', use_date = '', except_complete = 'Y', only_complete = '') {
    $(document).ready(function () {
        try {
            if (!$("#detail-as-loader").length) return;
            $('input').attr('autocomplete', 'off');
            let is_create_sub_notice = true;
            //stop submit
            $('form').submit(function (e) {
                e.preventDefault();
            });

            //loader
            $("#detail-as-loader").jqxLoader({autoOpen: true, width: 100, height: 60, imagePosition: 'top'});

            //control
            $("#detail-as-search").jqxButton({});
            $("#detail-as-excel").jqxButton({disabled: true});
            $("#detail-as-redirect-edit").jqxButton({});
            $("#detail-as-redirect-handle").jqxButton({});

            //filter
            $('#detail-as-filter-keyword').val(keyword);
            if (start) $('#detail-as-filter-date-receipt-start').val(start);
            if (end) $('#detail-as-filter-date-receipt-end').val(end);
            if (use_date) {
                $('#detail-as-filter-use-date').prop('checked', false);
            } else {
                $('#detail-as-filter-use-date').prop('checked', true);
                $('#detail-as-filter-date-receipt-start').prop('readonly', true);
                $('#detail-as-filter-date-receipt-end').prop('readonly', true);
            }
            if (except_complete) {
                $('#detail-as-filter-except-complete').prop('checked', true);
            } else {
                $('#detail-as-filter-except-complete').prop('checked', false);
            }
            if (only_complete) {
                $('#detail-as-filter-only-complete').prop('checked', true);
            } else {
                $('#detail-as-filter-only-complete').prop('checked', false);
            }

            $("#detail-as-filter-use-date").change(function () {
                if (this.checked) {
                    $('#detail-as-filter-date-receipt-start').prop('readonly', true);
                    $('#detail-as-filter-date-receipt-end').prop('readonly', true);
                } else {
                    $('#detail-as-filter-date-receipt-start').prop('readonly', false);
                    $('#detail-as-filter-date-receipt-end').prop('readonly', false);
                }
            });

            $('#detail-as-filter-except-complete').change(function () {
                if (this.checked) {
                    $('#detail-as-filter-only-complete').prop('checked', false);
                }
                detailASGetDetailASList();
            });
            $('#detail-as-filter-only-complete').change(function () {
                if (this.checked) {
                    $('#detail-as-filter-except-complete').prop('checked', false);
                }
                detailASGetDetailASList();
            });

            $('#detail-as-create-notice').jqxButton({width: 75});

            //create notice
            $('#detail-as-create-notice-submit').jqxButton({height: ROW_HEIGHT});
            $('#detail-as-create-notice-cancel').jqxButton({height: ROW_HEIGHT});

            // Create jqxValidator.
            $("#detail-as-create-notice-form").jqxValidator({
                hintType: "label",
                rules: [
                    {
                        input: "#detail-as-create-notice-dept",
                        message: "수신 부서 을(를) 입력하세요.",
                        action: 'keyup, blur',
                        rule: function (input, commit) {
                            let value = $('#detail-as-create-notice-dept').jqxComboBox('getCheckedItems');
                            return value.length > 0;
                        }
                    },
                    {
                        input: "#detail-as-create-notice-content",
                        message: "전달 내용 을(를) 입력하세요.",
                        action: 'keyup, blur',
                        rule: 'required'
                    },
                ]
            });
            $('#detail-as-create-notice-form').on('validationError', function () {
                $('#detail-as-create-notice-submit').jqxButton({disabled: false});
            });

            $('#detail-as-create-notice-form').on('validationSuccess', function () {
                let selectedRowIndex = $('#detail-as-grid').jqxGrid('getselectedrowindex');
                if (selectedRowIndex > -1) {
                    let rowData = $('#detail-as-grid').jqxGrid('getrowdata', selectedRowIndex);
                    if (rowData.ID) {
                        $('#detail-as-create-notice-submit').jqxButton({disabled: true});
                        $("#edit-window").jqxWindow('open');
                        $('#edit-window').on('close', function (event) {
                            if (event.type === 'close') {
                                if (event.args.dialogResult.OK) {
                                    // click Ok
                                    detailASCreateNoticeAS(rowData.ID);
                                } else if (event.args.dialogResult.Cancel) {
                                    // click Cancel
                                    $('#detail-as-create-notice-submit').jqxButton({disabled: false});
                                } else {
                                    // click Close
                                    $('#detail-as-create-notice-submit').jqxButton({disabled: false});
                                }
                            } else {
                                $('#detail-as-create-notice-submit').jqxButton({disabled: false});
                            }
                            $('#edit-window').jqxWindow('destroy');
                            $('#edit-window-area').html(htmlConfirmEditModal())
                        });
                    }
                }
            });

            //get new AS notices
            getNewASNotices();
            //select new AS notice
            $("#detail-as-new-as-notice-grid").on('rowselect', function (event) {
                let rowData = event.args.row;
                if (rowData) {
                    //find as receipt
                    const ASList = $('#detail-as-grid').jqxGrid('getrows');
                    const ASOfNewNoticeSelected = ASList.find(item => item.ID === rowData.AS_RECEIPT_ID);
                    if (ASOfNewNoticeSelected) {
                        //go to page contain AS
                        const paginginformation  =  $('#detail-as-grid').jqxGrid('getpaginginformation');
                        const pagesize = paginginformation.pagesize;
                        const pageASOfNewNoticeSelected = Math.floor(ASOfNewNoticeSelected.uid / pagesize);
                        $('#detail-as-grid').jqxGrid('gotopage', pageASOfNewNoticeSelected);

                        //select AS
                        $('#detail-as-grid').jqxGrid('selectrow', ASOfNewNoticeSelected.uid);
                    } else {
                        //clear AS selected
                        $('#detail-as-grid').jqxGrid('clearselection');
                    }
                }
            });

            //get new notices
            getNewNotices();
            //get maintain stations
            getMaintainStations();

            //get departments
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url: `/api/departments`,
                type: 'GET',
                dataType: 'JSON',
                success: function (response) {
                    if (response.code === 200) {
                        let sourceDept =
                            {
                                localdata: response.data,
                                datatype: "array"
                            };
                        var dataAdapter = new $.jqx.dataAdapter(sourceDept);
                        $('#detail-as-create-notice-dept').jqxComboBox({
                            source: dataAdapter,
                            theme: 'energyblue',
                            checkboxes: true,
                            displayMember: "DEPT_NAME",
                            valueMember: "ID",

                            placeHolder: "선택",
                            // renderer: function (index, label, value) {
                            //     let datarecord = response.data[index];
                            //     if (datarecord.UPPER_ID) {
                            //         return ' --- ' + datarecord.DEPT_NAME;
                            //     }
                            //     return datarecord.DEPT_NAME;
                            // },
                        });
                    } else {
                        onlyShowErrorMessage('Error!', response.message);
                    }
                },
                error: function (err, status, errorThrown) {
                    if (err.status === 401) {
                        window.location.reload();
                    } else {
                        onlyShowErrorMessage('Error!', 'Get departments list error. Please try again!');
                        console.log('Get departments list error ' + errorThrown);
                    }
                },
            });

            $('#detail-as-create-notice-submit').on('click', function () {
                $('#detail-as-create-notice-form').jqxValidator('validate');
            });

            $('#detail-as-create-notice-cancel').on('click', function () {
                $('#detail-as-create-notice-dept').jqxComboBox('clearSelection');
                $('#detail-as-create-notice-content').val('');
                let selectedRowIndex = $('#detail-as-grid').jqxGrid('getselectedrowindex');
                if (selectedRowIndex > -1) {
                    let rowData = $('#detail-as-grid').jqxGrid('getrowdata', selectedRowIndex);
                    if (rowData) {
                        detailASGetNoticesByAS(rowData.ID);
                    } else {
                        sourceNoticeAS.localdata = [];
                        $('#detail-as-notice-grid').jqxGrid('updatebounddata');
                        is_create_sub_notice = true;
                        $('#detail-as-create-notice-form').hide();
                        $('#detail-as-notice-grid').show();
                        $('#detail-as-create-notice').show();
                    }
                }
            });

            $('#detail-as-create-notice').on('click', function () {
                $(this).hide();
                $('#detail-as-notice-grid').hide();
                $('#detail-as-create-notice-form').show();
            });

            //as grid
            let sourceAS =
                {
                    localdata: [],
                    dataType: "array",
                    datafields:
                        [
                            {name: 'ID', type: 'number'},
                            {name: 'RECEIPT_YMD', type: 'string'},
                            {name: 'ASK_TYPE', type: 'number'},
                            {name: 'ASK_TYPE_NAME', type: 'string'},
                            {name: 'DEFECT_TYPE', type: 'number'},
                            {name: 'DEFECT_TYPE_NAME', type: 'string'},
                            {name: 'EMERGENCY_TYPE', type: 'number'},
                            {name: 'EMERGENCY_TYPE_NAME', type: 'string'},
                            {name: 'ASK_REMARK', type: 'string'},
                            {name: 'LOCKER_ID', type: 'number'},
                            {name: 'LOCKER_NAME', type: 'string'},
                            {name: 'STATION_MAINT_TYPE_NAME', type: 'string'},
                            {name: 'TEL_NO', type: 'string'},
                            {name: 'AREA1_DIV', type: 'number'},
                            {name: 'AREA2_NM', type: 'string'},
                            {name: 'LOCATION_NM', type: 'string'},
                            {name: 'E_MAIL', type: 'string'},
                            {name: 'USER_ID', type: 'number'},
                            {name: 'USER_NAME', type: 'string'},
                            {name: 'PROG_STATUS', type: 'number'},
                            {name: 'PROG_STATUS_NAME', type: 'string'},
                            {name: 'PROC_PLAN_YMD', type: 'string'},
                            {name: 'PROC_CMPL_YMD', type: 'string'},
                            {name: 'BLLING_YMD', type: 'string'},
                            {name: 'CMPL_REMARK', type: 'string'},
                            {name: 'ATTACH_FILE', type: 'string'},
                            {name: 'USE_FLAG', type: 'number'},
                            {name: 'CREATED_BY', type: 'number'}
                        ],
                };
            let dataAdapter = new $.jqx.dataAdapter(sourceAS);
            // create jqxGrid.
            $("#detail-as-grid").jqxGrid(
                {
                    width: '98.5%',
                    source: dataAdapter,
                    sortable: true,
                    filterable: true,
                    autoheight: true,
                    pageable: true,
                    pagerheight: ROW_HEIGHT + 7,
                    pagesizeoptions: PAGE_SIZE_OPTIONS,
                    pagesize: localStorage.getItem('detail-as-pagesize') ?? PAGE_SIZE_DEFAULT,
                    columnsresize: true,
                    columnsreorder: true,
                    columnsheight: ROW_HEIGHT,
                    rowsheight: ROW_HEIGHT,
                    ready: function () {
                        $("#detail-as-grid").jqxGrid('selectrow', 0);
                    },
                    altrows: true,
                    columns: [
                        {
                            text: '접수일시',
                            align: 'center',
                            cellsalign: 'center',
                            datafield: 'RECEIPT_YMD',
                            width: '10%'
                        },
                        {
                            text: '레벨', align: 'center', datafield: 'EMERGENCY_TYPE_NAME', width: '8%',
                            cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
                                let rowData = $("#detail-as-grid").jqxGrid('getrowdata', row);
                                let backgroundColor;
                                let color;
                                if (rowData.EMERGENCY_TYPE == DETAIL_CODES.EMERGENCY_TYPE.FAST) {
                                    backgroundColor = '#E7F8EE';
                                    color = 'rgba(0, 0, 0, .88)';
                                } else if (rowData.EMERGENCY_TYPE == DETAIL_CODES.EMERGENCY_TYPE.EMERGENCY) {
                                    backgroundColor = '#FEF3E2';
                                    color = 'rgba(0, 0, 0, .88)';
                                } else if (rowData.EMERGENCY_TYPE == DETAIL_CODES.EMERGENCY_TYPE.IMMEDIATELY) {
                                    backgroundColor = '#FDEAEE';
                                    color = 'rgba(0, 0, 0, .88)';
                                } else {
                                    backgroundColor = 'inherit';
                                    color = 'inherit';
                                }
                                return `<div class="h-100" style="color: ${color};padding: 3.5px; background-color: ${backgroundColor}">` +
                                    value +
                                    '</div>';
                            },
                        },
                        {text: '정기여부', align: 'center', datafield: 'STATION_MAINT_TYPE_NAME', width: '8%'},
                        {
                            text: '보관함명',
                            align: 'center',
                            dataField: 'LOCKER_NAME',
                            width: '10%',
                            cellclassname: 'd-flex align-items-center',
                            cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
                                return '<div data-id="' + row + '" class="grid-cell-redirect detail-as-redirect-locker">\n' +
                                    value +
                                    '</div>';
                            },
                        },
                        {
                            text: '하자유형',
                            align: 'center',
                            datafield: 'DEFECT_TYPE_NAME',
                            width: '10%',
                        },
                        {
                            text: '접수내용',
                            align: 'center',
                            datafield: 'ASK_REMARK',
                            width: '18%',
                            cellclassname: 'd-flex align-items-center',
                            cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
                                return '<div data-id="' + row + '" class="grid-cell-redirect">\n' +
                                    value +
                                    '</div>';
                            }
                        },
                        {text: '담당자', align: 'center', datafield: 'USER_NAME', width: '8%'},
                        {text: '진행상태', align: 'center', datafield: 'PROG_STATUS_NAME', width: '8%'},
                        {
                            text: '예정일',
                            align: 'center',
                            cellsalign: 'center',
                            datafield: 'PROC_PLAN_YMD',
                            width: '10%'
                        },
                        {
                            text: '완료일',
                            align: 'center',
                            cellsalign: 'center',
                            datafield: 'PROC_CMPL_YMD',
                            width: '10%'
                        },
                    ]
                });
            detailASGetDetailASList();

            //save page size
            $("#detail-as-grid").on("pagesizechanged", function (event) {
                // event arguments.
                let args = event.args;
                // new page size.
                let pagesize = args.pagesize;
                localStorage.setItem('detail-as-pagesize', pagesize);
            });

            //redirect detail locker
            $("#detail-as-grid").on("cellclick", function (event) {
                let args = event.args;
                let rowBoundIndex = args.rowindex;
                let dataField = args.datafield;
                if (dataField === 'LOCKER_NAME') {
                    let rowData = $('#detail-as-grid').jqxGrid('getrowdata', rowBoundIndex);
                    if (rowData.LOCKER_ID) detailASRedirectDetailLocker(rowData.LOCKER_ID);
                }
            });

            //redirect handle as
            $("#detail-as-grid").on("cellclick", function (event) {
                let args = event.args;
                let rowBoundIndex = args.rowindex;
                let dataField = args.datafield;
                if (dataField === 'ASK_REMARK') {
                    let rowData = $('#detail-as-grid').jqxGrid('getrowdata', rowBoundIndex);
                    if (rowData.ID) {
                        if (rowData.PROG_STATUS == DETAIL_CODES.PROG_STATUS.RECEIPT) {
                            detailASRedirectEditAS(rowData.ID);
                        } else {
                            detailASRedirectHandleAS(rowData.ID);
                        }
                    }
                }
            });

            //redirect edit as
            $('#detail-as-redirect-edit').on('click', function () {
                detailASRedirectEditAS('');
            });
            //redirect handle as
            $('#detail-as-redirect-handle').on('click', function () {
                detailASRedirectHandleAS('');
            });

            //select as
            let sourceNoticeAS =
                {
                    localdata: [],
                    dataType: "array",
                    datafields:
                        [
                            {name: 'ID', type: 'number'},
                            {name: 'DEPARTMENT_NAME', type: 'string'},
                            {name: 'AS_RECEIPT_ID', type: 'number'},
                            {name: 'UPPER_ID', type: 'number'},
                            {name: 'CONTENT', type: 'string'},
                            {name: 'USE_FLAG', type: 'number'},
                            {name: 'CREATED_BY', type: 'number'},
                            {name: 'CREATED_BY_NAME', type: 'string'},
                            {name: 'CREATED_AT', type: 'string'},
                            {name: 'AS_PROG_STATUS_NAME', type: 'string'},
                            {name: 'AS_USER_NAME', type: 'string'},
                        ],
                };
            let dataAdapterNoticeAS = new $.jqx.dataAdapter(sourceNoticeAS);
            // create jqxGrid.
            $("#detail-as-notice-grid").jqxGrid(
                {
                    width: '98.5%',
                    source: dataAdapterNoticeAS,
                    sortable: true,
                    filterable: true,
                    autoheight: true,
                    pageable: true,
                    pagerheight: ROW_HEIGHT + 7,
                    pagesizeoptions: PAGE_SIZE_OPTIONS,
                    pagesize: localStorage.getItem('detail-as-notice-pagesize') ?? PAGE_SIZE_DEFAULT,
                    columnsresize: true,
                    columnsreorder: true,
                    columnsheight: ROW_HEIGHT + 7,
                    rowsheight: ROW_HEIGHT + 7,
                    ready: function () {
                        // $("#detail-as-notice-grid").jqxGrid('selectrow', 0);
                    },
                    altrows: true,
                    columns: [
                        {
                            text: '작성일시',
                            align: 'center',
                            cellsalign: 'center',
                            datafield: 'CREATED_AT',
                            width: '10%',
                            cellclassname: 'd-flex align-items-center justify-content-center',
                            cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
                                let data = $('#detail-as-notice-grid').jqxGrid('getrowdata', row);
                                if (data) {
                                    if (data.UPPER_ID) {
                                        return '';
                                    }
                                    return `<div class="text-center">${value}</div>`;
                                } else {
                                    return '';
                                }
                            }
                        },
                        {text: '작성자', align: 'center', datafield: 'CREATED_BY_NAME', width: '10%'},
                        {text: '수신부서', align: 'center', datafield: 'DEPARTMENT_NAME', width: '15%'},
                        {
                            text: '전달내용',
                            align: 'center',
                            dataField: 'CONTENT',
                            width: '40%',
                            cellclassname: 'd-flex align-items-center',
                            cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
                                let data = $('#detail-as-notice-grid').jqxGrid('getrowdata', row);
                                if (data) {
                                    if (data.UPPER_ID) {
                                        return '<img style="margin-top: -5px" class="ms-1" src="icons/sub.svg">' + `<span style="line-height: 1.5">${value}</span>`;
                                    }
                                    return `<div class="grid-cell-rerender">${value}</div>`;
                                } else {
                                    return '';
                                }
                            }
                        },
                        {text: '진행상태', align: 'center', datafield: 'AS_PROG_STATUS_NAME', width: '10%'},
                        {text: '담당자', align: 'center', cellsalign: 'center', datafield: 'AS_USER_NAME', width: '10%'},
                        {
                            text: '비고',
                            align: 'center',
                            cellsalign: 'center',
                            datafield: 'CREATE_SUB_NOTICE',
                            width: '5%',
                            cellclassname: 'd-flex align-items-center justify-content-center',
                            cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
                                let data = $('#detail-as-notice-grid').jqxGrid('getrowdata', row);
                                if (data) {
                                    if (data.UPPER_ID) {
                                        return '<div class="grid-cell-rerender"></div>';
                                    }
                                    return '<div data-id="' + row + '" class="text-center grid-cell-redirect detail-as-show-sub-notice-form">\n' +
                                        '댓글' +
                                        '</div>';
                                } else {
                                    return '';
                                }
                            }
                        },
                    ]
                });
            //save page size
            $("#detail-as-notice-grid").on("pagesizechanged", function (event) {
                // event arguments.
                let args = event.args;
                // new page size.
                let pagesize = args.pagesize;
                localStorage.setItem('detail-as-notice-pagesize', pagesize);
            });

            $("#detail-as-grid").on('rowselect', function (event) {
                let rowData = event.args.row;
                if (rowData) {
                    detailASGetNoticesByAS(rowData.ID);
                } else {
                    sourceNoticeAS.localdata = [];
                    $('#detail-as-notice-grid').jqxGrid('updatebounddata');
                    is_create_sub_notice = true;
                }
            });

            //handle create sub notice
            $("#detail-as-notice-grid").on("cellclick", function (event) {
                let args = event.args;
                let rowBoundIndex = args.rowindex;
                let dataField = args.datafield;
                if (dataField === 'CREATE_SUB_NOTICE' && is_create_sub_notice) {
                    let rowData = $('#detail-as-notice-grid').jqxGrid('getrowdata', rowBoundIndex);
                    $('#detail-as-notice-grid').jqxGrid('addrow', null, {uid: rowData.uid + 1}, (rowData.uid + 1));
                    let html = '<form id="detail-as-create-sub-notice-form" class="d-flex">\n' +
                        '                                    <input type="hidden" id="detail-as-create-sub-notice-notice-id" value="' + rowData.ID + '" />' +
                        '                                    <div class="w-75-px text-end me-1">\n' +
                        '                                        <label for="detail-as-create-sub-notice-content">\n' +
                        '                                            <img src="icons/sub.svg">\n' +
                        '                                        </label>\n' +
                        '                                    </div>\n' +
                        '                                    <div style="width: calc(100% - 225px - .75rem); min-width: 400px; max-width: 750px">\n' +
                        '                                        <input placeholder="댓글 기입" class="form-control form-control-sm" type="text" id="detail-as-create-sub-notice-content">\n' +
                        '                                    </div>\n' +
                        '                                    <div class="w-75-px ms-1">\n' +
                        '                                        <button class="w-100" id="detail-as-create-sub-notice-submit">저장</button>\n' +
                        '                                    </div>\n' +
                        '                                    <div class="w-75-px ms-1">\n' +
                        '                                        <button class="w-100" id="detail-as-create-sub-notice-cancel">취소</button>\n' +
                        '                                    </div>\n' +
                        '                                </form>';
                    $(`#row${rowData.uid + 1}detail-as-notice-grid`).css({
                        'padding': 3,
                        'border-bottom': '1px solid #ced4da'
                    }).html(html);
                    detailASHandleCreateSubNoticeAS();
                }
            });

            //search
            $('#detail-as-search').on('click', function () {
                searchDetailAS();
            });
            $('#detail-as-filter-keyword').on('keypress', function (e) {
                if (e.which == 13) {
                    searchDetailAS();
                }
            });

            //export excel
            $('#detail-as-excel').on('click', function () {
                detailASExport();
            })

            //function
            function detailASHandleCreateSubNoticeAS() {
                is_create_sub_notice = false;
                $('.detail-as-show-sub-notice-form').css({'cursor': 'default', 'opacity': 0.6});
                //stop submit
                $('form').submit(function (e) {
                    e.preventDefault();
                });
                $("#detail-as-create-sub-notice-submit").jqxButton({height: ROW_HEIGHT});
                $("#detail-as-create-sub-notice-cancel").jqxButton({height: ROW_HEIGHT});

                $('#detail-as-create-sub-notice-form').jqxValidator({
                    hintType: "label",
                    rules: [
                        {
                            input: "#detail-as-create-sub-notice-content",
                            message: "",
                            action: 'keyup, blur',
                            rule: 'required'
                        },
                    ]
                });
                $('#detail-as-create-sub-notice-form').on('validationError', function () {
                    $('#detail-as-create-notice-submit').jqxButton({disabled: false});
                });

                $('#detail-as-create-sub-notice-form').on('validationSuccess', function () {
                    let selectedRowIndex = $('#detail-as-grid').jqxGrid('getselectedrowindex');
                    if (selectedRowIndex > -1) {
                        let rowData = $('#detail-as-grid').jqxGrid('getrowdata', selectedRowIndex);
                        if (rowData.ID) {
                            $("#edit-window").jqxWindow('open');
                            $('#edit-window').on('close', function (event) {
                                if (event.type === 'close') {
                                    if (event.args.dialogResult.OK) {
                                        // click Ok
                                        let formData = new FormData();
                                        formData.append('as_id', rowData.ID);
                                        formData.append('notice_id', $('#detail-as-create-sub-notice-notice-id').val());
                                        formData.append('content', $('#detail-as-create-sub-notice-content').val());
                                        $.ajaxSetup({
                                            headers: {
                                                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                                            }
                                        });
                                        $.ajax({
                                            url: `/api/notice-as/sub-store`,
                                            type: 'POST',
                                            data: formData,
                                            cache: false,
                                            contentType: false,
                                            processData: false,
                                            dataType: 'JSON',
                                            success: function (response) {
                                                if (response.code === 200) {
                                                    onlyShowSuccessMessage('Success!', response.message);
                                                    $('#detail-as-create-sub-notice-content').val('');
                                                    detailASGetNoticesByAS(rowData.ID);
                                                } else {
                                                    onlyShowErrorMessage('Error!', response.message);
                                                }
                                                $('#detail-as-create-sub-notice-submit').jqxButton({disabled: false});
                                            },
                                            error: function (err, status, errorThrown) {
                                                if (err.status === 401) {
                                                    window.location.reload();
                                                } else {
                                                    onlyShowErrorMessage('Error!', 'Create sub notice AS error. Please try again!');
                                                    console.log('Create sub notice AS error' + errorThrown);
                                                    $('#detail-as-create-sub-notice-submit').jqxButton({disabled: false});
                                                }
                                            },
                                        });
                                    } else if (event.args.dialogResult.Cancel) {
                                        // click Cancel
                                        $('#detail-as-create-sub-notice-submit').jqxButton({disabled: false});
                                    } else {
                                        // click Close
                                        $('#detail-as-create-sub-notice-submit').jqxButton({disabled: false});
                                    }
                                } else {
                                    $('#detail-as-create-sub-notice-submit').jqxButton({disabled: false});
                                }
                                $('#edit-window').jqxWindow('destroy');
                                $('#edit-window-area').html(htmlConfirmEditModal())
                            });
                        }
                    }
                });

                $('#detail-as-create-sub-notice-submit').on('click', function () {
                    $('#detail-as-create-sub-notice-submit').jqxButton({disabled: true});
                    $('#detail-as-create-sub-notice-form').jqxValidator('validate');
                });

                $('#detail-as-create-sub-notice-cancel').on('click', function () {
                    // $('#detail-as-notice-grid').jqxGrid('deleterow', rowAddId + 1);
                    $('.detail-as-show-sub-notice-form').css({'cursor': 'pointer', 'opacity': 1});
                    let selectedRowIndex = $('#detail-as-grid').jqxGrid('getselectedrowindex');
                    if (selectedRowIndex > -1) {
                        let rowData = $('#detail-as-grid').jqxGrid('getrowdata', selectedRowIndex);
                        if (rowData.ID) {
                            detailASGetNoticesByAS(rowData.ID);
                        }
                    }
                });

            }

            function detailASGetNoticesByAS(as_id) {
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
                $.ajax({
                    url: `/api/notice-as/get-by-as/${as_id}`,
                    type: 'GET',
                    dataType: 'JSON',
                    success: function (response) {
                        if (response.code === 200) {
                            sourceNoticeAS.localdata = response.data;
                            $('#detail-as-notice-grid').jqxGrid('updatebounddata');
                            is_create_sub_notice = true;
                            $('#detail-as-create-notice-form').hide();
                            $('#detail-as-notice-grid').show();
                            $('#detail-as-create-notice').show();
                        } else {
                            onlyShowErrorMessage('Error!', response.message);
                        }
                    },
                    error: function (err, status, errorThrown) {
                        if (err.status === 401) {
                            window.location.reload();
                        } else {
                            onlyShowErrorMessage('Error!', 'Get AS notice list error. Please try again!');
                            console.log('Get AS notice list error ' + errorThrown);
                        }
                    },
                });
            }

            function detailASCreateNoticeAS(as_id) {
                let formData = new FormData();
                formData.append('as_id', as_id);
                formData.append('content', $('#detail-as-create-notice-content').val());
                let departments = $('#detail-as-create-notice-dept').jqxComboBox('getCheckedItems');
                for (let i = 0; i < departments.length; i++) {
                    formData.append('departments[]', departments[i].value);
                }

                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
                $.ajax({
                    url: `/api/notice-as/store`,
                    type: 'POST',
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    dataType: 'JSON',
                    success: function (response) {
                        if (response.code === 200) {
                            onlyShowSuccessMessage('Success!', response.message);
                            $('#detail-as-create-notice-dept').jqxComboBox('clearSelection');
                            $('#detail-as-create-notice-content').val('');
                            detailASGetNoticesByAS(as_id);
                        } else {
                            onlyShowErrorMessage('Error!', response.message);
                        }
                        $('#detail-as-create-notice-submit').jqxButton({disabled: false});
                    },
                    error: function (err, status, errorThrown) {
                        if (err.status === 401) {
                            window.location.reload();
                        } else {
                            onlyShowErrorMessage('Error!', 'Create notice AS error. Please try again!');
                            console.log('Create notice AS error' + errorThrown);
                            $('#detail-as-create-notice-submit').jqxButton({disabled: false});
                        }
                    },
                });
            }

            function detailASGetDetailASList() {
                let new_keyword = $('#detail-as-filter-keyword').val() ? $('#detail-as-filter-keyword').val() : '';
                let new_start = $('#detail-as-filter-date-receipt-start').val() ? $('#detail-as-filter-date-receipt-start').val() : '';
                let new_end = $('#detail-as-filter-date-receipt-end').val() ? $('#detail-as-filter-date-receipt-end').val() : '';
                let new_use_date = $('#detail-as-filter-use-date').is(":checked") ? '' : 'Y';
                let new_except_complete = $('#detail-as-filter-except-complete').is(":checked") ? 'Y' : '';
                let new_only_complete = $('#detail-as-filter-only-complete').is(":checked") ? 'Y' : '';
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
                $.ajax({
                    url: `/api/as/detail?keyword=${new_keyword}&start=${new_start}&end=${new_end}&use_date=${new_use_date}&except_complete=${new_except_complete}&only_complete=${new_only_complete}`,
                    type: 'GET',
                    dataType: 'JSON',
                    success: function (response) {
                        if (response.code === 200) {
                            sourceAS.localdata = response.data;
                            $('#detail-as-grid').jqxGrid('updatebounddata');

                            setTimeout(function () {
                                $('#detail-as').show();
                                $('#detail-as-loader').jqxLoader('close');
                                if (response.data.length > 0) {
                                    // prepare the data
                                    $('#detail-as-excel').jqxButton({disabled: false});
                                } else {
                                    $('#detail-as-excel').jqxButton({disabled: true});
                                }
                                //splitter
                                $('#detail-as-splitter').jqxSplitter({
                                    width: '100%',
                                    height: PAGE_CONTENT_HEIGHT,
                                    panels: [{size: '70%', min: 150}, {size: '30%', min: 100}]
                                });
                                $('#detail-as-left-splitter').jqxSplitter({
                                    width: '100%',
                                    height: PAGE_CONTENT_HEIGHT,
                                    orientation: 'horizontal',
                                    panels: [{size: '50%', min: 150}, {size: '50%', min: 100}]
                                });
                            }, SET_TIMEOUT_LOADER);
                        } else {
                            onlyShowErrorMessage('Error!', response.message);
                        }
                    },
                    error: function (err, status, errorThrown) {
                        if (err.status === 401) {
                            window.location.reload();
                        } else {
                            onlyShowErrorMessage('Error!', 'Get AS list error. Please try again!');
                            console.log('Get AS list error ' + errorThrown);
                        }
                    },
                });
            }

        } catch (err) {
            console.log('Error: ', err)
        }

    });
}
