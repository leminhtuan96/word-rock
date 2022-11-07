function getEditAS(as_id = '') {
    $(document).ready(function () {
        try {
            if (!$("#edit-as-loader").length) return;
            $('input').attr('autocomplete','off');

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
            $("#edit-as-loader").jqxLoader({ autoOpen: true, width: 100, height: 60, imagePosition: 'top' });

            //control
            $("#edit-as-search").jqxButton({});
            $("#edit-as-create").jqxButton({});
            $("#edit-as-save").jqxButton({});
            $("#edit-as-delete").jqxButton({});
            $("#edit-as-redirect-handle").jqxButton({});
            $("#edit-as-free").jqxButton({});

            //filter
            $("#edit-as-filter-use-date").change(function() {
                if(this.checked) {
                    $('#edit-as-filter-date-receipt-start').prop('readonly', true);
                    $('#edit-as-filter-date-receipt-end').prop('readonly', true);
                } else {
                    $('#edit-as-filter-date-receipt-start').prop('readonly', false);
                    $('#edit-as-filter-date-receipt-end').prop('readonly', false);
                }
            });

            //choose locker popup
            $("#edit-as-form-choose-locker-window").jqxWindow({
                width: 800, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#edit-as-form-choose-locker-window-cancel"), modalOpacity: 0.01
            });
            $('#edit-as-form-choose-locker-window-ok').jqxButton({});
            $('#edit-as-form-choose-locker-window-cancel').jqxButton({});

            //form
            $('#edit-as-toggle').jqxButton({width: '100%'});
            $('#edit-as-choose-or-redirect-locker').jqxButton({height: ROW_HEIGHT, width: '100%'});
            $('#edit-as-send-sms').jqxButton({height: ROW_HEIGHT, width: 75});
            $('#edit-as-send-email').jqxButton({height: ROW_HEIGHT, width: 75});
            $('#edit-as-form-choose-attach-file').jqxButton({height: ROW_HEIGHT - 2, width: 'calc(100% - 2px)', disabled: true});

            //stop submit
            $('form').submit(function (e) {
                e.preventDefault();
            });

            //edit form
            // Create jqxValidator.
            $("#edit-as-form").jqxValidator({
                hintType: "label",
                rules: [
                    {
                        input: "#edit-as-form-ask-type", message: "문의유형 을(를) 입력하세요.", action: 'keyup, blur', rule: function (input, commit) {
                            let value = $("#edit-as-form-ask-type").val();
                            return !!value;
                        }
                    },
                    {
                        input: "#edit-as-form-defect-type", message: "하자유형 을(를) 입력하세요.", action: 'keyup, blur', rule: function (input, commit) {
                            let value = $("#edit-as-form-defect-type").val();
                            return !!value;
                        }
                    },
                    {
                        input: "#edit-as-form-emergency-type", message: "레벨 을(를) 입력하세요.", action: 'keyup, blur', rule: function (input, commit) {
                            let value = $("#edit-as-form-emergency-type").val();
                            return !!value;
                        }
                    },
                    { input: "#edit-as-form-ask-remark", message: "접수내용 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                ]
            });
            $('#edit-as-form').on('validationError', function () {
                $('#edit-as-save').jqxButton({disabled: false});
            });

            $('#edit-as-form').on('validationSuccess', function () {
                $("#edit-window").jqxWindow('open');
                $('#edit-window').on('close', function (event) {
                    if (event.type === 'close') {
                        if (event.args.dialogResult.OK) {
                            // click Ok
                            editAS();
                        } else if (event.args.dialogResult.Cancel) {
                            // click Cancel
                            $('#edit-as-save').jqxButton({disabled: false});
                        } else {
                            // click Close
                            $('#edit-as-save').jqxButton({disabled: false});
                        }
                    } else {
                        $('#edit-as-save').jqxButton({disabled: false});
                    }
                    $('#edit-window').jqxWindow('destroy');
                    $('#edit-window-area').html(htmlConfirmEditModal())
                });
            });

            //toggle
            $('#edit-as-toggle').on('click', function () {
                if ($('#edit-as-send-url-create-as-area').is(":visible")) {
                    $('#edit-as-send-url-create-as-area').hide();
                    $('#edit-as-handle-as-area').show();
                    $(this).text('처리내용 숨김');
                } else {
                    $('#edit-as-handle-as-area').hide();
                    $('#edit-as-send-url-create-as-area').show();
                    $(this).text('처리내용 표시');
                }
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
                };
            let dataAdapter = new $.jqx.dataAdapter(sourceAS);
            // create jqxGrid.
            $("#edit-as-grid").jqxGrid(
                {
                    width: '98.5%',
                    source: dataAdapter,
                    sortable: true,
                    filterable: true,
                    autoheight: true,
                    pageable: true,
                    pagerheight: ROW_HEIGHT + 7,
                    pagesizeoptions: PAGE_SIZE_OPTIONS,
                    pagesize: localStorage.getItem('edit-as-pagesize') ?? PAGE_SIZE_DEFAULT,
                    columnsresize: true,
                    columnsreorder: true,
                    columnsheight: ROW_HEIGHT,
                    rowsheight: ROW_HEIGHT,
                    ready: function () {
                        // $("#edit-as-grid").jqxGrid('selectrow', 0);
                    },
                    altrows: true,
                    columns: [
                        { text: '접수일시', align: 'center', cellsalign: 'center', datafield: 'RECEIPT_YMD', width: '10%'},
                        { text: '레벨', align: 'center', datafield: 'EMERGENCY_TYPE_NAME', width: '10%'},
                        { text: '정기여부', align: 'center', datafield: 'STATION_MAINT_TYPE_NAME', width: '10%'},
                        { text: '보관함명', align: 'center', dataField: 'LOCKER_NAME', width: '15%'},
                        { text: '접수내용', align: 'center', datafield: 'DEFECT_TYPE_NAME', width: '25%'},
                        { text: '담당자', align: 'center', datafield: 'USER_NAME', width: '10%'},
                        { text: '진행상태', align: 'center', datafield: 'PROG_STATUS_NAME', width: '10%'},
                        { text: '완료일', align: 'center', cellsalign: 'center', datafield: 'PROC_CMPL_YMD', width: '10%'},
                    ]
                });
            //save page size
            $("#edit-as-grid").on("pagesizechanged", function (event) {
                // event arguments.
                let args = event.args;
                // new page size.
                let pagesize = args.pagesize;
                localStorage.setItem('edit-as-pagesize', pagesize);
            });

            //select as
            $("#edit-as-grid").on('rowselect', function (event)
            {
                let rowData = event.args.row;
                if (rowData) {
                    $('#edit-as-form-id').val(rowData.ID);
                    $('#edit-as-form-ask-type').val(rowData.ASK_TYPE ? rowData.ASK_TYPE : '');
                    $('#edit-as-form-defect-type').val(rowData.DEFECT_TYPE ? rowData.DEFECT_TYPE : '');
                    $('#edit-as-form-emergency-type').val(rowData.EMERGENCY_TYPE ? rowData.EMERGENCY_TYPE : '');
                    $('#edit-as-form-plan-date').val(rowData.PROC_PLAN_YMD ? rowData.PROC_PLAN_YMD : '');
                    $('#edit-as-form-complete-date').val(rowData.PROC_CMPL_YMD ? rowData.PROC_CMPL_YMD : '');
                    if (rowData.USER_ID) {
                        let manager = $("#edit-as-form-manager").jqxComboBox('getItemByValue', rowData.USER_ID);
                        $("#edit-as-form-manager").jqxComboBox('val', manager);
                    } else {
                        $("#edit-as-form-manager").jqxComboBox('clearSelection');
                    }
                    $('#edit-as-form-ask-remark').val(rowData.ASK_REMARK ? rowData.ASK_REMARK : '');
                    $('#edit-as-form-locker-id').val(rowData.LOCKER_ID ? rowData.LOCKER_ID : '');
                    $('#edit-as-form-new-locker-id').val('');
                    $('#edit-as-form-locker-name').val(rowData.LOCKER_NAME ? rowData.LOCKER_NAME : '');
                    $('#edit-as-form-user-phone').val(rowData.TEL_NO ? rowData.TEL_NO : '');
                    $('#edit-as-form-user-area1').val(rowData.AREA1_DIV ? rowData.AREA1_DIV : '');
                    $('#edit-as-form-user-area2').val(rowData.AREA2_NM ? rowData.AREA2_NM : '');
                    $('#edit-as-form-user-email').val(rowData.E_MAIL ? rowData.E_MAIL : '');
                    $('#edit-as-form-user-location').val(rowData.LOCATION_NM ? rowData.LOCATION_NM : '');
                    $('#edit-as-form-station-name').val(rowData.STATION_NAME ? rowData.STATION_NAME : '');
                    $('#edit-as-form-station-type').val(rowData.STATION_TYPE ? rowData.STATION_TYPE : '');
                    $('#edit-as-form-station-code').val(rowData.STATION_REG_CODE ? rowData.STATION_REG_CODE : '');
                    $('#edit-as-form-station-maint-type').val(rowData.STATION_MAINT_TYPE ? rowData.STATION_MAINT_TYPE : '');
                    $('#edit-as-form-station-maint-end-ymd').val(rowData.STATION_MAINT_END_YMD ? rowData.STATION_MAINT_END_YMD : '');
                    $('#edit-as-form-station-repr-name').val(rowData.STATION_REPR_NM ? rowData.STATION_REPR_NM : '');
                    $('#edit-as-form-station-telephone').val( rowData.STATION_TEL_NO ? rowData.STATION_TEL_NO : '');
                    $('#edit-as-form-station-manager').val(rowData.STATION_MNGR_NM ? rowData.STATION_MNGR_NM : '');
                    $('#edit-as-form-station-mobile').val(rowData.STATION_MOBL_NO ? rowData.STATION_MOBL_NO : '');
                    $('#edit-as-form-complete-remark').val(rowData.CMPL_REMARK ? rowData.CMPL_REMARK : '');
                    $('#edit-as-form-attach-file-name').val(rowData.ATTACH_FILE ? rowData.ATTACH_FILE.split('/')[rowData.ATTACH_FILE.split('/').length - 1] : '');
                    if (rowData.LOCKER_ID) {
                        $('.no-member').hide();
                    } else {
                        $('.no-member').show();
                    }
                    $('#edit-as-create-as-form-area').hide();
                    $('#edit-as-form-area').show();
                } else {
                    $('#edit-as-form-area').find("input, textarea, select").val('');
                }
            });

            $('#edit-as-choose-or-redirect-locker').on('click', function () {
                let lockerId = $('#edit-as-form-locker-id').val();
                let newLockerId = $('#edit-as-form-new-locker-id').val();
                if (lockerId) {
                    editASShowChooseLockerPopup(lockerId);
                    // if (newLockerId) {
                    //     editASRedirectDetailLocker(newLockerId);
                    // } else {
                    //     editASRedirectDetailLocker(lockerId);
                    // }
                } else {
                    editASShowChooseLockerPopup(newLockerId);
                }
            })

            //redirect detail locker
            $('#edit-as-form-locker-name').on('click', function () {
                let lockerId = $('#edit-as-form-locker-id').val();
                let newLockerId = $('#edit-as-form-new-locker-id').val();
                if (lockerId) {
                    editASRedirectDetailLocker(lockerId);
                }
                if (newLockerId) {
                    editASRedirectDetailLocker(newLockerId);
                }
            })

            //select locker
            $('#edit-as-lockers-menu').on('itemclick', function (event)
            {
                $('#edit-as-lockers-menu ul li').each(function (item) {
                    $(this).removeAttr('id');
                });
                // get the clicked LI element.
                let element = event.target;
                $(element).attr('id', 'edit-as-item-locker-active');
                let lockerId = $(element).attr('data-id');
                editASChooseLocker(lockerId);
                getASByLocker(lockerId, sourceAS, as_id);
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
                        let sourceManagerEdit =
                            {
                                localdata: response.data,
                                datatype: "array"
                            };
                        let dataAdapterManagerEdit = new $.jqx.dataAdapter(sourceManagerEdit);
                        $('#edit-as-form-manager').jqxComboBox({
                            source: dataAdapterManagerEdit,
                            theme: 'energyblue',
                            searchMode:'containsignorecase',
                            displayMember: "USER_NAME",
                            valueMember: "ID",

                            placeHolder: "선택",
                        });

                        //create choose manager
                        // let sourceManagerCreate =
                        //     {
                        //         localdata: response.data,
                        //         datatype: "array"
                        //     };
                        // let dataAdapterManagerCreate = new $.jqx.dataAdapter(sourceManagerCreate);
                        // $('#edit-as-create-as-form-manager').jqxComboBox({
                        //     source: dataAdapterManagerCreate,
                        //     theme: 'energyblue',
                        //     searchMode:'containsignorecase',
                        //     displayMember: "USER_NAME",
                        //     valueMember: "ID",
                        //
                        //     placeHolder: "선택",
                        // });
                    } else {
                        onlyShowErrorMessage('Error!', response.message);
                    }
                    //get as by lockers
                    if (as_id) {
                        getASByLocker(locker_id, sourceAS, as_id);
                    } else {
                        editASShowPage();
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

        //show create form
            $('#edit-as-create').on('click', function () {
                if (as_id) resetEditASPage();
                $('#edit-as-grid').jqxGrid('clearselection');
                $('#edit-as-item-locker-active').removeAttr('id');
                $('#edit-as-form-area').hide();
                $('#edit-as-form-area').find("input, textarea, select").val('');
                $('#edit-as-create-as-form-area').find("input, textarea, select").val('');
                $('#edit-as-create-as-form-area').show();

                //clear as grid
                sourceAS.localdata = [];
                $('#edit-as-grid').jqxGrid('updatebounddata');
            });

            //form
            $('#edit-as-create-as-redirect-locker').jqxButton({height: ROW_HEIGHT, width: '100%'});
            $('#edit-as-create-as-send-sms').jqxButton({height: ROW_HEIGHT, width: 75});
            $('#edit-as-create-as-send-email').jqxButton({height: ROW_HEIGHT, width: 75});

            //handle popup choose user


            // Create jqxValidator.
            $("#edit-as-create-as-form").jqxValidator({
                hintType: "label",
                rules: [
                    {
                        input: "#edit-as-create-as-form-ask-type", message: "문의유형 을(를) 입력하세요.", action: 'keyup, blur', rule: function (input, commit) {
                            let value = $("#edit-as-create-as-form-ask-type").val();
                            return !!value;
                        }
                    },
                    {
                        input: "#edit-as-create-as-form-defect-type", message: "하자유형 을(를) 입력하세요.", action: 'keyup, blur', rule: function (input, commit) {
                            let value = $("#edit-as-create-as-form-defect-type").val();
                            return !!value;
                        }
                    },
                    {
                        input: "#edit-as-create-as-form-emergency-type", message: "레벨 을(를) 입력하세요.", action: 'keyup, blur', rule: function (input, commit) {
                            let value = $("#edit-as-create-as-form-emergency-type").val();
                            return !!value;
                        }
                    },
                    { input: "#edit-as-create-as-form-ask-remark", message: "접수내용 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    { input: "#edit-as-create-as-form-locker-name", message: "보관함명 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    { input: "#edit-as-create-as-form-user-email", message: "E-Mail is invalid!", action: 'keyup, blur', rule: 'email' },

                ]
            });

            $('#edit-as-create-as-form').on('validationError', function () {
                $('#edit-as-save').jqxButton({disabled: false});
            });
            $('#edit-as-create-as-form').on('validationSuccess', function () {
                $("#edit-window").jqxWindow('open');
                $('#edit-window').on('close', function (event) {
                    if (event.type === 'close') {
                        if (event.args.dialogResult.OK) {
                            // click Ok
                            editASCreateAS();
                        } else if (event.args.dialogResult.Cancel) {
                            // click Cancel
                            $('#edit-as-save').jqxButton({disabled: false});
                        } else {
                            // click Close
                            $('#edit-as-save').jqxButton({disabled: false});
                        }
                    } else {
                        $('#edit-as-save').jqxButton({disabled: false});
                    }
                    $('#edit-window').jqxWindow('destroy');
                    $('#edit-window-area').html(htmlConfirmEditModal())
                });
            });

            //handle click redirect
            $('#edit-as-create-as-redirect-locker').on('click', function () {
                let lockerId = $('#edit-as-create-as-form-locker-id').val();
                editASShowChooseLockerPopup(lockerId);
            });

            //redirect detail locker
            $('#edit-as-create-as-form-locker-name').on('click', function () {
                let lockerId = $('#edit-as-create-as-form-locker-id').val();
                if (lockerId) {
                    editASRedirectDetailLocker(lockerId);
                }
            })

            //send url create as to mail
            // Create jqxValidator.
            $("#edit-as-create-as-send-url-create-as-form").jqxValidator({
                hintType: "label",
                rules: [
                    { input: "#edit-as-create-as-send-url-create-as-email", message: "직접 등록 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    { input: "#edit-as-create-as-send-url-create-as-email", message: "직접 등록 invalid!", action: 'keyup, blur', rule: 'email' },
                ]
            });
            $('#edit-as-create-as-send-url-create-as-form').on('validationError', function () {
                $('#edit-as-create-as-send-email').jqxButton({disabled: false});
            });

            $('#edit-as-create-as-send-url-create-as-form').on('validationSuccess', function () {
                sendUrlCreateAS();
            });

            $('#edit-as-create-as-send-email').on('click', function () {
                $('#edit-as-create-as-send-email').jqxButton({disabled: true});
                $('#edit-as-create-as-send-url-create-as-form').jqxValidator('validate');
            })

            //send sms
            $('#edit-as-create-as-send-sms').on('click', function () {
                alert('이 기능은 아직 개발 중입니다.')
            })

        //search
            $('#edit-as-search').on('click', function () {
                searchEditAS();
            });
            $('#edit-as-filter-keyword').on('keypress', function (e) {
                if(e.which == 13) {
                    searchEditAS();
                }
            });

        //submit
            $('#edit-as-save').on('click', function () {
                $('#edit-as-save').jqxButton({disabled: true});
                if ($('#edit-as-create-as-form-area').is(":visible")) {
                    $('#edit-as-create-as-form').jqxValidator('validate');
                } else {
                    $('#edit-as-form').jqxValidator('validate');
                }
            });

        //delete
            $('#edit-as-delete').on('click', function () {
                let id = $('#edit-as-form-id').val()
                if (id) {
                    $('#edit-as-delete').jqxButton({disabled: true});
                    $("#delete-window").jqxWindow('open');
                    $('#delete-window').on('close', function (event) {
                        if (event.type === 'close') {
                            if (event.args.dialogResult.OK) {
                                // click Ok
                                editASDeleteAS(id);
                            } else if (event.args.dialogResult.Cancel) {
                                $('#edit-as-delete').jqxButton({disabled: false});
                                // click Cancel
                            } else {
                                // click Close
                                $('#edit-as-delete').jqxButton({disabled: false});
                            }
                        } else {
                            $('#edit-as-delete').jqxButton({disabled: false});
                        }
                        $('#delete-window').jqxWindow('destroy');
                        $('#delete-window-area').html(htmlConfirmDeleteModal())
                    });
                }
            });

        //redirect edit
            $('#edit-as-redirect-handle').on('click', function () {
                let as_id = $('#edit-as-form-id').val() ? $('#edit-as-form-id').val() : '';
                editASRedirectHandle(as_id);
            })

        //send url create as to mail
            // Create jqxValidator.
            $("#edit-as-send-url-create-as-form").jqxValidator({
                hintType: "label",
                rules: [
                    { input: "#edit-as-send-url-create-as-email", message: "직접 등록 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    { input: "#edit-as-send-url-create-as-email", message: "직접 등록 invalid!", action: 'keyup, blur', rule: 'email' },
                ]
            });
            $('#edit-as-send-url-create-as-form').on('validationError', function () {
                $('#edit-as-send-email').jqxButton({disabled: false});
            });

            $('#edit-as-send-url-create-as-form').on('validationSuccess', function () {
                sendUrlCreateAS();
            });

            $('#edit-as-send-email').on('click', function () {
                $('#edit-as-send-email').jqxButton({disabled: true});
                $('#edit-as-send-url-create-as-form').jqxValidator('validate');
            })

            //send sms
            $('#edit-as-send-sms').on('click', function () {
                alert('이 기능은 아직 개발 중입니다.')
            })

        //function

        } catch (err) {
            console.log('Error: ', err)
        }

    });
}
