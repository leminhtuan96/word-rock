function getDepartments(type = '') {
    $(document).ready(function () {
        try {
            if (!$("#departments-loader").length) return;
            $('input').attr('autocomplete','off');
            //loader
            $("#departments-loader").jqxLoader({ autoOpen: true, width: 100, height: 60, imagePosition: 'top' });

            //control
            $("#departments-search").jqxButton({});
            $("#departments-save").jqxButton({});
            $("#departments-delete").jqxButton({});
            $("#departments-create").jqxButton({});
            $("#departments-excel").jqxButton({});

            //filter
            $('#departments-filter-type').val(type);

            //parents popup
            $("#departments-create-parent-window").jqxWindow({
                width: 500, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#departments-create-parent-window-cancel"), modalOpacity: 0.01
            });
            $('#departments-create-parent-window-ok').jqxButton({});
            $('#departments-create-parent-window-cancel').jqxButton({});

            $("#departments-edit-parent-window").jqxWindow({
                width: 500, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#departments-edit-parent-window-cancel"), modalOpacity: 0.01
            });
            $('#departments-edit-parent-window-ok').jqxButton({});
            $('#departments-edit-parent-window-cancel').jqxButton({});

            //stop submit
            $('form').submit(function (e) {
                e.preventDefault();
            });

            //create form
            // Create jqxValidator.
            $("#departments-create-form").jqxValidator({
                hintType: "label",
                rules: [
                    { input: "#departments-create-name", message: "조직명 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    {
                        input: "#departments-create-type", message: "조직구분 을(를) 입력하세요.", action: 'blur', rule: function (input, commit) {
                            var index = $("#departments-create-type").jqxDropDownList('getSelectedIndex');
                            return index != -1;
                        }
                    },
                    {
                        input: "#departments-create-parent", message: "상위조직명 을(를) 입력하세요.", action: 'keyup, blur', rule: function (input, commit) {
                            if ($('#departments-create-type').val() == DETAIL_CODES.DEPT_TYPE.DIVISION) {
                                return true;
                            }
                            let value = $("#departments-create-parent").val();
                            return !!value;
                        }
                    },
                    {
                        input: "#departments-create-use-flag", message: "사용여부 을(를) 입력하세요.", action: 'blur', rule: function (input, commit) {
                            var index = $("#departments-create-use-flag").jqxDropDownList('getSelectedIndex');
                            return index != -1;
                        }
                    }
                ]
            });

            $("#departments-create-type").on('change', function () {
                if ($(this).val() == DETAIL_CODES.DEPT_TYPE.DIVISION) {
                    $('#departments-create-parent-area').css('display', 'none')
                } else {
                    $('#departments-create-parent-area').css('display', 'flex')
                }
                $('#departments-create-parent').val('');
                $('#departments-create-parent-id').val('');
            })

            //submit
            $('#departments-create-form').on('validationError', function () {
                $('#departments-save').jqxButton({disabled: false});
            });
            $('#departments-create-form').on('validationSuccess', function () {
                $("#edit-window").jqxWindow('open');
                $('#edit-window').on('close', function (event) {
                    if (event.type === 'close') {
                        if (event.args.dialogResult.OK) {
                            // click Ok
                            departmentsCreateDepartment();
                        } else if (event.args.dialogResult.Cancel) {
                            // click Cancel
                            $('#departments-save').jqxButton({disabled: false});
                        } else {
                            // click Close
                            $('#departments-save').jqxButton({disabled: false});
                        }
                    } else {
                        $('#departments-save').jqxButton({disabled: false});
                    }
                    $('#edit-window').jqxWindow('destroy');
                    $('#edit-window-area').html(htmlConfirmEditModal())
                });
            });

            //edit form
            // Create jqxValidator.
            $("#departments-edit-form").jqxValidator({
                hintType: "label",
                rules: [
                    { input: "#departments-edit-name", message: "조직명 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    {
                        input: "#departments-edit-parent", message: "상위조직명 을(를) 입력하세요.", action: 'keyup, blur', rule: function (input, commit) {
                            if ($('#departments-edit-type').val() == DETAIL_CODES.DEPT_TYPE.DIVISION) {
                                return true;
                            }
                            let value = $("#departments-edit-parent").val();
                            return !!value;
                        }
                    },
                ]
            });

            //select user
            $("#departments-grid").on('rowselect', function (event) {
                let rowData = event.args.row;
                if (rowData) {
                    $("#departments-edit-id").val(rowData.ID);
                    $("#departments-edit-parent-id").val(rowData.UPPER_ID ? rowData.UPPER_ID : '');
                    $("#departments-edit-parent").val(rowData.PARENT_NAME ? rowData.PARENT_NAME : '');
                    $("#departments-edit-name").val(rowData.DEPT_NAME ? rowData.DEPT_NAME : '');
                    $("#departments-edit-type").val(rowData.DEPT_TYPE ? rowData.DEPT_TYPE : '');
                    $("#departments-edit-use-flag").val(rowData.USE_FLAG ? rowData.USE_FLAG : '');
                    if (rowData.DEPT_TYPE == DETAIL_CODES.DEPT_TYPE.DIVISION) {
                        $('#departments-edit-parent-area').css('display', 'none')
                    } else {
                        $('#departments-edit-parent-area').css('display', 'flex')
                    }

                    $('#departments-create-form').jqxValidator('hide');
                    $('#departments-create-form').hide();
                    $('#departments-edit-form').show();
                }
            });

            $("#departments-edit-type").on('change', function () {
                if ($(this).val() == DETAIL_CODES.DEPT_TYPE.DIVISION) {
                    $('#departments-edit-parent-area').css('display', 'none')
                } else {
                    $('#departments-edit-parent-area').css('display', 'flex')
                }
                $('#departments-edit-parent').val('');
                $('#departments-edit-parent-id').val('');
            })

            //submit
            $('#departments-edit-form').on('validationError', function () {
                $('#departments-save').jqxButton({disabled: false});
            });
            $('#departments-edit-form').on('validationSuccess', function () {
                $("#edit-window").jqxWindow('open');
                $('#edit-window').on('close', function (event) {
                    if (event.type === 'close') {
                        if (event.args.dialogResult.OK) {
                            // click Ok
                            departmentsEditDepartment();
                        } else if (event.args.dialogResult.Cancel) {
                            // click Cancel
                            $('#departments-save').jqxButton({disabled: false});
                        } else {
                            // click Close
                            $('#departments-save').jqxButton({disabled: false});
                        }
                    } else {
                        $('#departments-save').jqxButton({disabled: false});
                    }
                    $('#edit-window').jqxWindow('destroy');
                    $('#edit-window-area').html(htmlConfirmEditModal())
                });
            });

        //handle popup choose parent
            $('#departments-create-choose-parent').on('click', function () {
                let type = $('#departments-create-type').val();
                showCreateParentPopup(type);
            });
            $('#departments-create-parent').on('click', function () {
                let type = $('#departments-create-type').val();
                showCreateParentPopup(type);
            });
            $('#departments-edit-choose-parent').on('click', function () {
                let type = $('#departments-edit-type').val();
                let parentId = $('#departments-edit-parent-id').val();
                showEditParentPopup(type, parentId);
            })
            $('#departments-edit-parent').on('click', function () {
                let type = $('#departments-edit-type').val();
                let parentId = $('#departments-edit-parent-id').val();
                showEditParentPopup(type, parentId);
            })

        //get departments
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url: `/api/departments?type=${type}`,
                type: 'GET',
                dataType: 'JSON',
                success: function (response) {
                    if (response.code === 200) {
                        //form
                        $("#departments-create-type").val(DETAIL_CODES.DEPT_TYPE.DIVISION)

                        $("#departments-create-use-flag").val(DETAIL_CODES.USE_FLAG.YES)

                        let source =
                            {
                                datatype: "array",
                                datafields: [
                                    { name: 'ID', type: 'number' },
                                    { name: 'UPPER_ID', type: 'number' },
                                    { name: 'PARENT_NAME', type: 'string' },
                                    { name: 'DEPT_NAME', type: 'string' },
                                    { name: 'DEPT_TYPE', type: 'number' },
                                    { name: 'DEPT_TYPE_NAME', type: 'string' },
                                    { name: 'USE_FLAG', type: 'number' },
                                    { name: 'USE_FLAG_NAME', type: 'string' },
                                    { name: 'CREATED_BY', type: 'number' },
                                    { name: 'CREATED_BY_NAME', type: 'string' },
                                    { name: 'UPDATED_BY', type: 'number' },
                                    { name: 'UPDATED_BY_NAME', type: 'string' },
                                    { name: 'CREATED_AT', type: 'string' },
                                    { name: 'UPDATED_AT', type: 'string' },
                                ],
                                root: "entry",
                                record: "content",
                                id: 'id',
                                localdata: response.data
                            };
                        let dataAdapter = new $.jqx.dataAdapter(source);
                        // create grid.
                        $("#departments-grid").jqxGrid(
                            {
                                width: '98.5%',
                                source: dataAdapter,
                                sortable: true,
                                autoheight: true,
                                pageable: true,
                                pagerheight: ROW_HEIGHT + 7,
                                pagesizeoptions: PAGE_SIZE_OPTIONS,
                                pagesize: localStorage.getItem('departments-pagesize') ?? PAGE_SIZE_DEFAULT,
                                columnsresize: true,
                                columnsreorder: true,
                                columnsheight: ROW_HEIGHT,
                                rowsheight: ROW_HEIGHT,
                                ready: function ()
                                {
                                    // called when the Grid is loaded. Call methods or set properties here.
                                },
                                altrows: true,
                                columns: [
                                    { text: '조직코드', align: 'center', cellsalign: 'center', datafield: 'ID', width: '5%' },
                                    {
                                        text: '조직명',
                                        align: 'center',
                                        datafield: 'DEPT_NAME',
                                        width: '31%',
                                        cellclassname : 'd-flex align-items-center',
                                        cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
                                            let dataRecord = $("#departments-grid").jqxGrid('getrowdata', row);
                                            if (dataRecord.DEPT_TYPE === DETAIL_CODES.DEPT_TYPE.DEPARTMENT) {
                                                return '<img style="margin-top: -5px" class="ms-1" src="icons/sub.svg">' + `<span style="line-height: 1.5">${value}</span>`;
                                            } else if (dataRecord.DEPT_TYPE === DETAIL_CODES.DEPT_TYPE.TEAM) {
                                                return '<span class="ms-1" style="min-width: 24px"></span><img style="margin-top: -5px" src="icons/sub.svg">' + `<span style="line-height: 1.5">${value}</span>`;
                                            } else {
                                                return '<span class="ms-1"></span>' + `<span style="line-height: 1.5">${value}</span>`;
                                            }
                                        }
                                    },
                                    { text: '조직구분', align: 'center', cellsalign: 'center', datafield: 'DEPT_TYPE_NAME', width: '7%'},
                                    { text: '사용여부', align: 'center', cellsalign: 'center', datafield: 'USE_FLAG_NAME', width: '7%' },
                                    { text: '등록자', align: 'center', cellsalign: 'center', datafield: 'CREATED_BY_NAME', width: '10%' },
                                    { text: '등록일시', align: 'center', cellsalign: 'center', datafield: 'CREATED_AT', width: '15%' },
                                    { text: '수정자', align: 'center', cellsalign: 'center', datafield: 'UPDATED_BY_NAME', width: '10%' },
                                    { text: '수정일시', align: 'center', cellsalign: 'center', datafield: 'UPDATED_AT', width: '15%' },
                                ]
                            });
                        setTimeout(function () {
                            $('#departments').show();
                            $('#departments-loader').jqxLoader('close');
                            //splitter
                            if (screenHeight > 660) {
                                $('#departments-splitter').jqxSplitter({ width: '100%', height: PAGE_CONTENT_HEIGHT, orientation: 'horizontal', panels: [{ size: 160, min: 100 }, { min: 100}]});
                            } else {
                                $('#departments-splitter').jqxSplitter({ width: '100%', height: PAGE_CONTENT_HEIGHT, orientation: 'horizontal', panels: [{ size: '40%', min: 100 }, { size: '60%', min: 100}]});
                            }
                        }, SET_TIMEOUT_LOADER);
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
            //save page size
            $("#departments-grid").on("pagesizechanged", function (event) {
                // event arguments.
                let args = event.args;
                // new page size.
                let pagesize = args.pagesize;
                localStorage.setItem('departments-pagesize', pagesize);
            });

            //search
            $('#departments-search').on('click', function () {
                departmentsSearchDepartments();
            });

            //submit form
            $('#departments-save').on('click', function () {
                $('#departments-save').jqxButton({disabled: true});
                //check which form to submit
                if ($('#departments-create-form').is(":visible")) {
                    $('#departments-create-form').jqxValidator('validate');
                }
                if ($('#departments-edit-form').is(":visible")) {
                    $('#departments-edit-form').jqxValidator('validate');
                }
            });

            //delete
            $('#departments-delete').on('click', function () {
                $('#departments-delete').jqxButton({disabled: true});
                if ($('#departments-edit-form').is(":visible")) {
                    $("#delete-window").jqxWindow('open');
                    $('#delete-window').on('close', function (event) {
                        if (event.type === 'close') {
                            if (event.args.dialogResult.OK) {
                                // click Ok
                                departmentsDeleteDepartment();
                            } else if (event.args.dialogResult.Cancel) {
                                $('#departments-delete').jqxButton({disabled: false});
                                // click Cancel
                            } else {
                                // click Close
                                $('#departments-delete').jqxButton({disabled: false});
                            }
                        } else {
                            $('#departments-delete').jqxButton({disabled: false});
                        }
                        $('#delete-window').jqxWindow('destroy');
                        $('#delete-window-area').html(htmlConfirmDeleteModal())
                    });
                }
            })

            //create
            $('#departments-create').on('click', function () {
                $('#departments-edit-form').hide();
                $("#departments-create-form").trigger('reset');
                $('#departments-create-parent-area').css('display', 'none')
                $("#departments-create-parent").val();
                $("#departments-create-parent-id").val();
                $('#departments-create-form').show();
            })

            //export excel
            $("#departments-excel").click(function () {
                $("#departments-grid").jqxGrid('exportdata', 'xlsx', 'departments-list');
            });

            //function

        } catch (err) {
            console.log('Error: ', err)
        }

    });
}
