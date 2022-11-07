function getLockersDetail(locker_id = '') {
    $(document).ready(function () {
        try {
            if (!$("#lockers-detail-loader").length) return;
            $('input').attr('autocomplete','off');
            //loader
            $("#lockers-detail-loader").jqxLoader({ autoOpen: true, width: 100, height: 60, imagePosition: 'top' });

            //control
            $("#lockers-detail-redirect-create-locker").jqxButton({});
            $("#lockers-detail-redirect-lockers-stations").jqxButton({});
            $("#lockers-detail-redirect-free").jqxButton({});

            $("#lockers-detail-redirect-create-locker").on('click', function () {
                redirectCreateLocker();
            });
            $("#lockers-detail-redirect-lockers-stations").on('click', function () {
                redirectLockersStations();
            })

            //filter

            //choose locker popup
            $("#lockers-detail-choose-locker-window").jqxWindow({
                width: 800, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#lockers-detail-choose-locker-window-cancel"), modalOpacity: 0.01
            });
            $('#lockers-detail-choose-locker-window-ok').jqxButton({});
            $('#lockers-detail-choose-locker-window-cancel').jqxButton({});

            //get detail locker
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
            $("#lockers-detail-as-grid").jqxGrid(
                {
                    width: '98.5%',
                    source: dataAdapter,
                    sortable: true,
                    filterable: true,
                    autoheight: true,
                    pageable: true,
                    pagerheight: ROW_HEIGHT + 7,
                    pagesizeoptions: PAGE_SIZE_OPTIONS,
                    pagesize: localStorage.getItem('lockers-detail-as-pagesize') ?? PAGE_SIZE_DEFAULT,
                    columnsresize: true,
                    columnsreorder: true,
                    columnsheight: ROW_HEIGHT,
                    rowsheight: ROW_HEIGHT,
                    ready: function () {
                        // $("#lockers-detail-as-grid").jqxGrid('selectrow', 0);
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
            $("#lockers-detail-as-grid").on("pagesizechanged", function (event) {
                // event arguments.
                let args = event.args;
                // new page size.
                let pagesize = args.pagesize;
                localStorage.setItem('lockers-detail-as-pagesize', pagesize);
            });

            getLockerDetailAndAS(locker_id, sourceAS);


            //handle popup choose locker
            $('#lockers-detail-keyword').on('keypress', function (e) {
                if(e.which == 13) {
                    let keyword = $('#lockers-detail-keyword').val();
                    lockerDetailShowChooseLockerPopup(sourceAS, keyword);
                }
            });

            //redirect as handle
            $("#lockers-detail-as-grid").on("cellclick", function (event) {
                let args = event.args;
                let rowBoundIndex = args.rowindex;
                let rowData = $('#lockers-detail-as-grid').jqxGrid('getrowdata', rowBoundIndex);
                if (rowData.ID) editASRedirectHandle(rowData.ID);
            });

            //redirect station detail
            $('#lockers-detail-form-station-name').on('click', function () {
                const stationId = $('#lockers-detail-form-station-id').val();
                if (stationId) {
                    console.log(stationId)
                    lockersStationsRedirectDetailStation(stationId);
                }
            })

            //function

        } catch (err) {
            console.log('Error: ', err);
        }
    });
}
