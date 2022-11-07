function getStationsDetail(station_id = '') {
    $(document).ready(function () {
        try {
            if (!$("#stations-detail-loader").length) return;
            $('input').attr('autocomplete','off');
            //loader
            $("#stations-detail-loader").jqxLoader({ autoOpen: true, width: 100, height: 60, imagePosition: 'top' });

            //control
            $("#stations-detail-save").jqxButton({});
            $("#stations-detail-redirect-create-station").jqxButton({});
            $("#stations-detail-redirect-stations-lockers").jqxButton({});
            $("#stations-detail-redirect-fee").jqxButton({});

            $("#stations-detail-redirect-create-station").on('click', function () {
                redirectCreateStation();
            });
            $("#stations-detail-redirect-stations-lockers").on('click', function () {
                redirectStationsLockers();
            })

            //filter

            //choose station popup
            $("#stations-detail-choose-station-window").jqxWindow({
                width: 800, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#stations-detail-choose-station-window-cancel"), modalOpacity: 0.01
            });
            $('#stations-detail-choose-station-window-ok').jqxButton({});
            $('#stations-detail-choose-station-window-cancel').jqxButton({});

            //handle change fee form
            $("#stations-fee-form-default-time").on('change keyup', function () {
                $(this).val(formatNumber($(this).val()));
            });
            $("#stations-fee-form-one-additional-hour").on('change keyup', function () {
                $(this).val(formatNumber($(this).val()));
            });
            $("#stations-fee-form-two-additional-hour").on('change keyup', function () {
                $(this).val(formatNumber($(this).val()));
            });
            $("#stations-fee-form-repeat-time").on('change keyup', function () {
                $(this).val(formatNumber($(this).val()));
            });
            $("#stations-fee-form-base-rate").on('change keyup', function () {
                $(this).val(formatNumber($(this).val()));
            });
            $("#stations-fee-form-one-extra-charge").on('change keyup', function () {
                $(this).val(formatNumber($(this).val()));
            });
            $("#stations-fee-form-two-extra-charge").on('change keyup', function () {
                $(this).val(formatNumber($(this).val()));
            });
            $("#stations-fee-form-recurring-fee").on('change keyup', function () {
                $(this).val(formatNumber($(this).val()));
            });
            $("#stations-fee-form-weekly-basic-rate").on('change keyup', function () {
                $(this).val(formatNumber($(this).val()));
            });
            $("#stations-fee-form-weekly-recurring-rate").on('change keyup', function () {
                $(this).val(formatNumber($(this).val()));
            });
            $("#stations-fee-form-monthly-basic-fee").on('change keyup', function () {
                $(this).val(formatNumber($(this).val()));
            });
            $("#stations-fee-form-monthly-recurring-fee").on('change keyup', function () {
                $(this).val(formatNumber($(this).val()));
            });
            $("#stations-fee-form-deposit").on('change keyup', function () {
                $(this).val(formatNumber($(this).val()));
            });

            //select fee template
            $("#stations-fee-form-template").on('change', function () {
                const templateId = $(this).val();
                const stationId = $('#stations-detail-station-id').val();
                if (templateId) {
                    getFeeStationTemplate(templateId);
                } else {
                    if (stationId) {
                        getFeeStationTemplateByStation(stationId);
                    } else {
                        updateFeeStationForm(null);
                    }
                }
            });

            //save fee
            $("#stations-fee-form").jqxValidator({
                hintType: "label",
                rules: [
                    { input: "#stations-fee-form-default-time", message: "기본시간 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    { input: "#stations-fee-form-one-additional-hour", message: "추가1시간 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    { input: "#stations-fee-form-two-additional-hour", message: "추가2시간 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    { input: "#stations-fee-form-repeat-time", message: "반복시간 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    { input: "#stations-fee-form-base-rate", message: "기본요금 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    { input: "#stations-fee-form-one-extra-charge", message: "추가1요금 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    { input: "#stations-fee-form-two-extra-charge", message: "추가2요금 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    { input: "#stations-fee-form-recurring-fee", message: "반복요금 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    { input: "#stations-fee-form-weekly-basic-rate", message: "주간기본요금 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    { input: "#stations-fee-form-weekly-recurring-rate", message: "주간반복요금 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    { input: "#stations-fee-form-monthly-basic-fee", message: "월간기본요금 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    { input: "#stations-fee-form-monthly-recurring-fee", message: "월간반복요금 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    { input: "#stations-fee-form-deposit", message: "보증금 입력하세요.", action: 'keyup, blur', rule: 'required' },
                ]
            });
            $('#stations-fee-form').on('validationError', function () {
                $('#stations-detail-save').jqxButton({disabled: false});
            });

            $('#stations-fee-form').on('validationSuccess', function () {
                $("#edit-window").jqxWindow('open');
                $('#edit-window').on('close', function (event) {
                    if (event.type === 'close') {
                        if (event.args.dialogResult.OK) {
                            // click Ok
                            const stationId = $("#stations-detail-station-id").val();
                            updateFeeStation(stationId);
                        } else if (event.args.dialogResult.Cancel) {
                            // click Cancel
                            $('#stations-detail-save').jqxButton({disabled: false});
                        } else {
                            // click Close
                            $('#stations-detail-save').jqxButton({disabled: false});
                        }
                    } else {
                        $('#stations-detail-save').jqxButton({disabled: false});
                    }
                    $('#edit-window').jqxWindow('destroy');
                    $('#edit-window-area').html(htmlConfirmEditModal())
                });
            });
            $('#stations-detail-save').on('click', function () {
                const stationId = $("#stations-detail-station-id").val();
                if (stationId) {
                    $('#stations-detail-save').jqxButton({disabled: true});
                    $('#stations-fee-form').jqxValidator('validate');
                }
            });

            //get detail station
            // prepare the data
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
            $("#stations-detail-as-grid").jqxGrid(
                {
                    width: '98.5%',
                    source: dataAdapter,
                    sortable: true,
                    filterable: true,
                    autoheight: true,
                    pageable: true,
                    pagerheight: ROW_HEIGHT + 7,
                    pagesizeoptions: PAGE_SIZE_OPTIONS,
                    pagesize: localStorage.getItem('stations-detail-as-pagesize') ?? PAGE_SIZE_DEFAULT,
                    columnsresize: true,
                    columnsreorder: true,
                    columnsheight: ROW_HEIGHT,
                    rowsheight: ROW_HEIGHT,
                    ready: function () {
                        // $("#stations-detail-as-grid").jqxGrid('selectrow', 0);
                    },
                    altrows: true,
                    columns: [
                        { text: '접수일시', align: 'center', cellsalign: 'center', datafield: 'RECEIPT_YMD', width: '10%'},
                        { text: '레벨', align: 'center', datafield: 'EMERGENCY_TYPE_NAME', width: '10%'},
                        { text: '정기여부', align: 'center', datafield: 'STATION_MAINT_TYPE_NAME', width: '10%'},
                        { text: '보관함명', align: 'center', dataField: 'LOCKER_NAME', width: '10%'},
                        { text: '접수내용', align: 'center', datafield: 'DEFECT_TYPE_NAME', width: '30%'},
                        { text: '담당자', align: 'center', datafield: 'USER_NAME', width: '10%'},
                        { text: '진행상태', align: 'center', datafield: 'PROG_STATUS_NAME', width: '10%'},
                        { text: '완료일', align: 'center', cellsalign: 'center', datafield: 'PROC_CMPL_YMD', width: '10%'},
                    ]
                });
            //save page size
            $("#stations-detail-as-grid").on("pagesizechanged", function (event) {
                // event arguments.
                let args = event.args;
                // new page size.
                let pagesize = args.pagesize;
                localStorage.setItem('stations-detail-as-pagesize', pagesize);
            });

            getStationDetailAndAS(station_id, sourceAS);


            //handle popup choose station
            $('#stations-detail-keyword').on('keypress', function (e) {
                if(e.which == 13) {
                    let keyword = $('#stations-detail-keyword').val();
                    stationDetailShowChooseStationPopup(sourceAS, keyword);
                }
            });

            //redirect as handle
            $("#stations-detail-as-grid").on("cellclick", function (event) {
                let args = event.args;
                let rowBoundIndex = args.rowindex;
                let rowData = $('#stations-detail-as-grid').jqxGrid('getrowdata', rowBoundIndex);
                if (rowData.ID) editASRedirectHandle(rowData.ID);
            });

            //function

        } catch (err) {
            console.log('Error: ', err)
        }

    });
}
