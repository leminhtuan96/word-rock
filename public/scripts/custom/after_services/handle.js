function getHandleAS(as_id = '') {
    $(document).ready(function () {
        try {
            if (!$("#handle-as-loader").length) return;
            $('input').attr('autocomplete', 'off');
            //remove handle AS data in localstorage
            localStorage.removeItem("as_handle_data");

            //get locker by as_id
            let locker_id = '';
            if (as_id) {
                $.ajax({
                    url: `/api/as/detail-as/${as_id}`,
                    type: 'GET',
                    dataType: 'JSON',
                    success: function (response) {
                        if (response.code === 200) {
                            locker_id = response.data.LOCKER_ID ? response.data.LOCKER_ID : '';
                        } else {
                            onlyShowErrorMessage('Error!', response.message);
                        }
                    },
                    error: function (err, status, errorThrown) {
                        if (err.status === 401) {
                            window.location.reload();
                        } else {
                            onlyShowErrorMessage('Error!', 'Get detail as error. Please try again!');
                            console.log('Get detail as error ' + errorThrown);
                        }
                    },
                });
            }

            //loader
            $("#handle-as-loader").jqxLoader({autoOpen: true, width: 100, height: 60, imagePosition: 'top'});

            //control
            $("#handle-as-search").jqxButton({});
            $("#handle-as-reset").jqxButton({});
            $("#handle-as-save").jqxButton({});
            $("#handle-as-delete").jqxButton({});
            $("#handle-as-redirect-edit").jqxButton({});
            $("#handle-as-free").jqxButton({});

            //filter
            $("#handle-as-filter-use-date").change(function () {
                if (this.checked) {
                    $('#handle-as-filter-date-receipt-start').prop('readonly', true);
                    $('#handle-as-filter-date-receipt-end').prop('readonly', true);
                } else {
                    $('#handle-as-filter-date-receipt-start').prop('readonly', false);
                    $('#handle-as-filter-date-receipt-end').prop('readonly', false);
                }
            });

            //handle textarea
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();
            today = yyyy + '.' + mm + '.' + dd + ' ';
            $('#handle-as-form-complete-remark').on('focus', function () {
                if (!$(this).val()) {
                    let $this = $(this);
                    setTimeout(function () {
                        $this.val(today);
                    }, 100);
                }
            });
            $('#handle-as-form-complete-remark').on('keypress', function (e) {
                let $this = $(this);
                if (e.keyCode == 13) {
                    if (e.shiftKey) {
                        // new line
                    } else {
                        setTimeout(function () {
                            $this.val($this.val() + today);
                        }, 100);
                    }
                }
            });

            //choose locker popup
            $("#handle-as-form-choose-locker-window").jqxWindow({
                width: 800,
                resizable: false,
                isModal: true,
                autoOpen: false,
                cancelButton: $("#handle-as-form-choose-locker-window-cancel"),
                modalOpacity: 0.01
            });
            $('#handle-as-form-choose-locker-window-ok').jqxButton({});
            $('#handle-as-form-choose-locker-window-cancel').jqxButton({});

            //form
            $('#handle-as-toggle').jqxButton({width: '100%', disabled: true});
            $('#handle-as-choose-or-redirect-locker').jqxButton({height: ROW_HEIGHT, width: '100%'});
            $('#handle-as-form-choose-attach-file').jqxButton({height: ROW_HEIGHT - 2, width: 'calc(100% - 2px)'});

            //stop submit
            $('form').submit(function (e) {
                e.preventDefault();
            });

            //handle file upload
            $('#handle-as-form-attach-file').one('change', function () {
                let attach_file = $(this)[0].files[0];
                if (attach_file) $('#handle-as-form-attach-file-name').val(attach_file.name);
            });

            //handle form
            // Create jqxValidator.
            $("#handle-as-form").jqxValidator({
                hintType: "label",
                rules: [
                    {
                        input: "#handle-as-form-defect-type", message: "하자유형 을(를) 입력하세요.", action: 'keyup, blur', rule: function (input, commit) {
                            let value = $("#handle-as-form-defect-type").val();
                            return !!value;
                        }
                    },
                    {
                        input: "#handle-as-form-emergency-type", message: "레벨 을(를) 입력하세요.", action: 'keyup, blur', rule: function (input, commit) {
                            let value = $("#handle-as-form-emergency-type").val();
                            return !!value;
                        }
                    },
                    {
                        input: "#handle-as-form-complete-date",
                        message: "처리완료일 을(를) 입력하세요.",
                        action: 'keyup, blur',
                        rule: function (input, commit) {
                            let value = $("#handle-as-form-complete-date").val();
                            return !!value;
                        }
                    },
                    { input: "#handle-as-form-ask-remark", message: "접수내용 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    {
                        input: "#handle-as-form-complete-remark",
                        message: "처리내용 을(를) 입력하세요.",
                        action: 'keyup, blur',
                        rule: 'required'
                    },
                ]
            });
            $('#handle-as-form').on('validationError', function () {
                $('#handle-as-save').jqxButton({disabled: false});
            });

            $('#handle-as-form').on('validationSuccess', function () {
                $("#edit-window").jqxWindow('open');
                $('#edit-window').on('close', function (event) {
                    if (event.type === 'close') {
                        if (event.args.dialogResult.OK) {
                            // click Ok
                            handleAS();
                        } else if (event.args.dialogResult.Cancel) {
                            // click Cancel
                            $('#handle-as-save').jqxButton({disabled: false});
                        } else {
                            // click Close
                            $('#handle-as-save').jqxButton({disabled: false});
                        }
                    } else {
                        $('#handle-as-save').jqxButton({disabled: false});
                    }
                    $('#edit-window').jqxWindow('destroy');
                    $('#edit-window-area').html(htmlConfirmEditModal())
                });
            });

            //toggle
            $('#handle-as-toggle').on('click', function () {

            });

            //as grid
            let sourceAS =
                {
                    localdata: [],
                    dataType: "array",
                    datafields:
                        [
                            {name: 'ID', type: 'number'},
                            {name: 'STATION_NAME', type: 'string'},
                            {name: 'STATION_TYPE', type: 'number'},
                            {name: 'STATION_REG_CODE', type: 'string'},
                            {name: 'STATION_REPR_NM', type: 'string'},
                            {name: 'STATION_TEL_NO', type: 'string'},
                            {name: 'STATION_MNGR_NM', type: 'string'},
                            {name: 'STATION_MOBL_NO', type: 'string'},
                            {name: 'STATION_MAINT_TYPE', type: 'number'},
                            {name: 'STATION_MAINT_TYPE_NAME', type: 'string'},
                            {name: 'STATION_MAINT_END_YMD', type: 'string'},
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
                    id: 'ID',

                };
            let dataAdapter = new $.jqx.dataAdapter(sourceAS);
            // create jqxGrid.
            $("#handle-as-grid").jqxGrid(
                {
                    width: '98.5%',
                    source: dataAdapter,
                    sortable: true,
                    filterable: true,
                    autoheight: true,
                    pageable: true,
                    pagerheight: ROW_HEIGHT + 7,
                    pagesizeoptions: PAGE_SIZE_OPTIONS,
                    pagesize: localStorage.getItem('handle-as-pagesize') ?? PAGE_SIZE_DEFAULT,
                    columnsresize: true,
                    columnsreorder: true,
                    columnsheight: ROW_HEIGHT,
                    rowsheight: ROW_HEIGHT,
                    ready: function () {
                        // $("#handle-as-grid").jqxGrid('selectrow', 0);
                    },
                    altrows: true,
                    columns: [
                        {text: '접수일시', align: 'center', cellsalign: 'center', datafield: 'RECEIPT_YMD', width: '10%'},
                        {text: '레벨', align: 'center', datafield: 'EMERGENCY_TYPE_NAME', width: '10%'},
                        {text: '정기여부', align: 'center', datafield: 'STATION_MAINT_TYPE_NAME', width: '10%'},
                        {text: '보관함명', align: 'center', dataField: 'LOCKER_NAME', width: '15%'},
                        {text: '접수내용', align: 'center', datafield: 'DEFECT_TYPE_NAME', width: '25%'},
                        {text: '담당자', align: 'center', datafield: 'USER_NAME', width: '10%'},
                        {text: '진행상태', align: 'center', datafield: 'PROG_STATUS_NAME', width: '10%'},
                        {text: '완료일', align: 'center', cellsalign: 'center', datafield: 'PROC_CMPL_YMD', width: '10%'},
                    ]
                });
            //save page size
            $("#handle-as-grid").on("pagesizechanged", function (event) {
                // event arguments.
                let args = event.args;
                // new page size.
                let pagesize = args.pagesize;
                localStorage.setItem('handle-as-pagesize', pagesize);
            });

            //select as
            $("#handle-as-grid").on('rowselect', function (event) {
                let rowData = event.args.row;
                if (rowData) {
                    //save as handle data
                    localStorage.setItem("as_handle_data", JSON.stringify(rowData))

                    handleASDumpDataIntoTheForm(rowData);
                    $('#handle-as-not-data').hide();
                    $('#handle-as-form-area').show();
                } else {
                    $('#handle-as-form-area').find("input, textarea, select").val('');
                    $('#handle-as-form-area').hide();
                    $('#handle-as-not-data').show();
                }
            });

            $('#handle-as-choose-or-redirect-locker').on('click', function () {
                let lockerId = $('#handle-as-form-locker-id').val();
                let newLockerId = $('#handle-as-form-new-locker-id').val();
                if (lockerId) {
                    handleASShowChooseLockerPopup(lockerId)
                    // if (newLockerId) {
                    //     handleASRedirectDetailLocker(newLockerId);
                    // } else {
                    //     handleASRedirectDetailLocker(lockerId);
                    // }
                } else {
                    handleASShowChooseLockerPopup(newLockerId)
                }
            })

            //redirect detail locker
            $('#handle-as-form-locker-name').on('click', function () {
                let lockerId = $('#handle-as-form-locker-id').val();
                let newLockerId = $('#handle-as-form-new-locker-id').val();
                if (lockerId) {
                    handleASRedirectDetailLocker(lockerId);
                }
                if (newLockerId) {
                    handleASRedirectDetailLocker(newLockerId);
                }
            })

            //select locker
            $('#handle-as-lockers-menu').on('itemclick', function (event) {
                $('#handle-as-lockers-menu ul li').each(function (item) {
                    $(this).removeAttr('id');
                });
                // get the clicked LI element.
                let element = event.target;
                $(element).attr('id', 'handle-as-item-locker-active');
                let lockerId = $(element).attr('data-id');
                // handleASChooseLocker(lockerId);
                handleASGetASByLocker(lockerId, sourceAS, as_id);
            });

            //get manager list
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url: `/api/users/get-staffs`,
                type: 'GET',
                dataType: 'JSON',
                success: function (response) {
                    if (response.code === 200) {
                        //edit choose manager
                        let sourceManagerHandle =
                            {
                                localdata: response.data,
                                datatype: "array"
                            };
                        let dataAdapterManagerHandle = new $.jqx.dataAdapter(sourceManagerHandle);
                        $('#handle-as-form-manager').jqxComboBox({
                            source: dataAdapterManagerHandle,
                            theme: 'energyblue',
                            searchMode: 'containsignorecase',
                            displayMember: "USER_NAME",
                            valueMember: "ID",
                            placeHolder: "선택",

                        });
                    } else {
                        onlyShowErrorMessage('Error!', response.message);
                    }
                    //get as by lockers
                    if (as_id) {
                        handleASGetASByLocker(locker_id, sourceAS, as_id);
                    } else {
                        handleASShowPage();
                    }
                },
                error: function (err, status, errorThrown) {
                    if (err.status === 401) {
                        window.location.reload();
                    } else {
                        onlyShowErrorMessage('Error!', 'Get staffs error. Please try again!');
                        console.log('Get staffs error ' + errorThrown);
                    }
                },
            });

            //reset
            $('#handle-as-reset').on('click', function () {
                //get as handle data
                let data = JSON.parse(localStorage.getItem("as_handle_data"));
                handleASDumpDataIntoTheForm(data);
            });

            //search
            $('#handle-as-search').on('click', function () {
                searchHandleAS();
            });
            $('#handle-as-filter-keyword').on('keypress', function (e) {
                if (e.which == 13) {
                    searchHandleAS();
                }
            });

            //submit
            $('#handle-as-save').on('click', function () {
                if ($('#handle-as-form-id').val()) {
                    $('#handle-as-save').jqxButton({disabled: true});
                    $('#handle-as-form').jqxValidator('validate');
                }
            });

            //delete
            $('#handle-as-delete').on('click', function () {
                let id = $('#handle-as-form-id').val()
                if (id) {
                    $('#handle-as-delete').jqxButton({disabled: true});
                    $("#delete-window").jqxWindow('open');
                    $('#delete-window').on('close', function (event) {
                        if (event.type === 'close') {
                            if (event.args.dialogResult.OK) {
                                // click Ok
                                handleASDeleteAS(id);
                            } else if (event.args.dialogResult.Cancel) {
                                $('#handle-as-delete').jqxButton({disabled: false});
                                // click Cancel
                            } else {
                                // click Close
                                $('#handle-as-delete').jqxButton({disabled: false});
                            }
                        } else {
                            $('#handle-as-delete').jqxButton({disabled: false});
                        }
                        $('#delete-window').jqxWindow('destroy');
                        $('#delete-window-area').html(htmlConfirmDeleteModal())
                    });
                }
            });

            //redirect edit
            $('#handle-as-redirect-edit').on('click', function () {
                let as_id = $('#handle-as-form-id').val() ? $('#handle-as-form-id').val() : '';
                handleASRedirectEdit(as_id);
            })

        } catch (err) {
            console.log('Error: ', err)
        }

    });
}
